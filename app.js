
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// register sw
const regSW = () => {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js')
                    .then(reg => {
                        console.log('⚙ Service worker registered');
                        // console.log(reg);
                    }).catch(err => console.log('⚙ Service worker not registered', err));
        };
};
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// grant notisication permission
// const grandNotiPermission = () => {
//     if (!("Notification" in window)) {
//         console.log('💬 Notification Not Supported.');
//         return false;
//     } else if (Notification.permission === "granted") {
//         console.log('💬 Notification Allowed.');
//         return true;
//     } else if (Notification.permission !== "denied") {
//         Notification.requestPermission().then(function (permission) {
//             if (permission === "granted") {
//                 console.log('💬 Notification Allowed.');
//                 return true;
//             } else {
//                 console.log('💬 Notification Denied.');
//                 return false;
//             };
//         });
//     };
// };

// show notif
// const showNoti = () => {
//     navigator.serviceWorker.ready.then(reg => {
//         if (grandNotiPermission()){
//             reg.showNotification('TEST NOTI', {
//                 body: 'Simple piece of body text.\nSecond line of body text',
//                 icon: '192.png',
//                 vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]
//             });
//         };
//     }).catch(e => console.log('⚙ Service worker not registered', e));
// };

// check bg scync permission
// const checkPermission = () => {
//     navigator.permissions.query({ name: 'periodic-background-sync', })
//     .then(status => {
//         // console.log(status);
//         if (status.state === 'granted') {
//             console.log('OK')
//         } else {
//             console.log('OOMBI')
//         };
//     });
// };

// setup periodic sync
// navigator.serviceWorker.ready.then(reg => {
//     if ('periodicSync' in reg) {
//         reg.periodicSync.register('content-sync', {
//             minInterval: 24 * 60 * 60 * 1000,
//         }).then(r => console.log(r))
//         .catch(e => console.log(e));
//     };
// });

////////////////////////////////////////////////////////////////////
// now time display
const TD = document.getElementById('time');
const TTD = document.getElementById('ttd');
let P = 0;
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// update time
const UT = () => {
    let T = new Date();
    let TSA = T.toDateString().split(' ');
    let H = T.getHours();
    let M = T.getMinutes();
    let S = T.getSeconds();
    // H = 9; M = 40;
    if (H === 8){
        if (M >= 30) P = 1;
    };
    if (H === 9){
        if (M <= 10) P = 1;
        if (M >= 30) P = 2;
    };
    if (H === 10){
        if (M <= 10) P = 2;
        if (M >= 30) P = 3;
    };
    if (H === 11){
        if (M <= 10) P = 3;
        if (M >= 40) P = 4;
    };
    if (H === 12){
        if (M <= 20) P = 4;
        if (M >= 40) P = 5;
    };
    if (H === 13){
        if (M <= 20) P = 5;
    };
    // console.log(P);
    P === 0 ? (PT = 'FREE TIME') : (PT = `PERIOD: ${P}`);
    TD.innerHTML = `<h4>${TSA[0]} ${TSA[1]} ${TSA[2]} ${TSA[3]}</h4>
    <h3>${H} : ${M} : ${S}</h3><h5>${PT}</h5>`;
};
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const DJTT = (TT) => {
    UT();
    setInterval(UT, 1000);
    let D = (((new Date()).toDateString().split(' ')[0]).toString());
    let TTT = TT[D];
    TTD.innerText = '';
    for (let i = 1; i <= 5; i ++){
        let h4 = document.createElement('h4');
        if (P > 0){
            if (P > i) h4.classList.add('over');
            if (P === i) h4.classList.add('now');
            if (P < i) h4.classList.add('next');
        } else {
            h4.classList.add('free');
        };
        h4.innerText = TTT[(i.toString())];
        TTD.appendChild(h4);
    };
};
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
// tt trigger
const SFTT = (trigger) => {
    if (trigger.parentElement.querySelector('img').style.display == 'block'){
        trigger.parentElement.querySelector('img').style.display = 'none';
    } else {
        trigger.parentElement.querySelector('img').style.display = 'block';
    };
};
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const fetchTT = () => {
    fetch('time_table.json')
        .then(r => {
            r.json().then(j => {
                DJTT(j);
                setInterval(() => {
                    DJTT(j)
                }, (10 * 1000));
            }).catch(e => {
                console.log(e);
            });
        }).catch(e => {
            console.log(e);
        });
};
////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
// onload
window.onload = () => {
    regSW();
    fetchTT();
};
