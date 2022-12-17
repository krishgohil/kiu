importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAblq67MwpJGiy_Xo91lDKxV_z6BMKLyoc",
    authDomain: "keepitupp.firebaseapp.com",
    projectId: "keepitupp",
    storageBucket: "keepitupp.appspot.com",
    messagingSenderId: "730517188418",
    appId: "1:730517188418:web:b23b8b5f5c6f35d68ee2db",
    measurementId: "G-HH4R9VG07L"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        link: payload.data.link,
        icon: '/mylogo (1).png',
        data : payload.data
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});


self.addEventListener('notificationclick', (event) => {
    console.log('On notification click1: ', event.notification);
    event.notification.close();
  
    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
      if(event.notification.data.link){
        return clients.openWindow(event.notification.data.link);
      }else{
        return clients.openWindow('/');

      }
    }));
  });
 
  
  // self.onnotificationclick = (event) => {
  //   console.log('On notification click:2 ', event.notification.tag);
  //   event.notification.close();
  
  //   // This looks to see if the current is already open and
  //   // focuses if it is
  //   event.waitUntil(clients.matchAll({
  //     type: "window"
  //   }).then((clientList) => {
  //     for (const client of clientList) {
  //       if (client.url === '/' && 'focus' in client)
  //         return client.focus();
  //     }
  //     if (clients.openWindow)
  //       return clients.openWindow('/');
  //   }));
  // };
  