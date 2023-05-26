// { ipcRenderer } = require('electron');



// function createSessionStorage(session) {
//     console.log(session);
  
//     ipcRenderer.send('store-set', { key: 'sessions', value: { session } });
  
//     ipcRenderer.once('store-get', (event, response) => {
//       const sessionData = response.value;
//       console.log(sessionData);
//       // Use the sessionData as needed
//     });
//   }

//   export default createSessionStorage;


// // let session = {
// //     timeStart: tStart.toString(),
// //     timeEnd: tEnd.toString(),
// //     timeDuration: duration,
// //   };








// //=> '🦄'

// // Use dot-notation to access nested properties
// // store.set('foo.bar', true);
// // console.log(store.get('foo'));
// // //=> {bar: true}

// // store.delete('unicorn');
// // console.log(store.get('unicorn'));