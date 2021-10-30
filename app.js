
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
    if (H === 9){
        if (M >= 30) P = 1;
    };
    if (H === 10){
        if (M < 30) P = 1;
        if (M >= 30) P = 2;
    };
    if (H === 11){
        if (M < 30) P = 2;
        if (M >= 30) P = 3;
    };
    if (H === 12){
        if (M < 30) P = 3;
    };
    if (H === 13){
        if (M >= 30) P = 4;
    };
    if (H === 14){
        if (M < 30) P = 4;
        if (M >= 30) P = 5;
    };
    if (H === 15){
        if (M < 30) P = 5;
        if (M >= 30) P = 6;
    };
    if (H === 16){
        if (M < 30) P = 6;
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
    TTD.innerHTML = '<h3>TODAY</h3>';
    for (let i = 1; i <= 6; i ++){
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
// this weeks time table
const twtt = document.getElementById('twtt');
const TWTT = (TT) => {
    let days = Object.keys(TT);
    let table = document.createElement('table');
    let content = `<thead>
                        <tr>
                            <th></th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                        </tr>
                    </thead>`;
    days.forEach(day => {
        let tdtt = TT[day];
        content += `<tr>
                        <th>${day}</th>
                        <td>${tdtt[1]}</td>
                        <td>${tdtt[2]}</td>
                        <td>${tdtt[3]}</td>
                        <td>${tdtt[4]}</td>
                        <td>${tdtt[5]}</td>
                        <td>${tdtt[6]}</td>
                    </tr>`;
        table.innerHTML = content;
    })
    twtt.appendChild(table);
};
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const fetchTT = () => {
    fetch('time_table.json')
        .then(r => {
            r.json().then(j => {
                TWTT(j);
                DJTT(j);
                setInterval(() => {
                    DJTT(j)
                }, (10 * 1000));
            }).catch(e => {
                console.log(e);
                TTD.innerHTML += `<div style="padding: 20px; text-align: center; border: 0;">
                                  <p>🥴${e}</p>------<p>💃 It's probably Saturday or Sunday.</p></div>`;
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
