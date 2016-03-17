'use strict';

console.log('WebPushApp2 servicewoker load');


self.importScripts(eval('2 + 3'));


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
