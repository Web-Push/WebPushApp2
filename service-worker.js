'use strict';

console.log('WebPushApp2 servicewoker load');

    
//self.importScripts('https://web-push.github.io/postmessageTest/service-worker.js');

//eval("self.addEventListener('push', function(event) {console.log('Received a push message', event);});");
self.addEventListener('install', function(event) {
  console.log('install');
  //var myHeaders = new Headers();
  //myHeaders.set("Access-Control-Allow-Origin", "https://web-push.github.io");
  //var myInit = { method: 'GET',
    //           headers: myHeaders,
    //           mode: 'cors',
    //           cache: 'default' };
    fetch('https://web-push.github.io/postmessageTest/service-worker.js').then(function(response){
    //fetch('https://html5experts.jp/wp-content/uploads/2014/05/20140523_sw.001.png', myInit).
    //then(function(response){
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
      }
      return response.text().then(function(textdata) {
        console.log('jsdata:' + textdata);
        //eval(textdata);
      })
    });
});

self.addEventListener('notificationclick', function(event) {
  console.log('WebPushApp2 On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/WebPushApp2');
    }
  }));
});
