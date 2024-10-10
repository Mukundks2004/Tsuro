import { someStuff, huhCode } from "../config.js";

const homeButton = document.getElementById('goHomeButton');
const printDeetsButton = document.getElementById('printDeetsButton');
const playerHighscoresTable = document.getElementById('playerHighscoresTable');
let bob = "hi";

const _0x3d0b54=_0x507b;function _0x507b(_0x2100dd,_0x3c7248){const _0x5e0d3a=_0x5e0d();return _0x507b=function(_0x507b97,_0x18b409){_0x507b97=_0x507b97-0x14f;let _0xd42c0a=_0x5e0d3a[_0x507b97];return _0xd42c0a;},_0x507b(_0x2100dd,_0x3c7248);}(function(_0x434df4,_0x15079a){const _0x1ec1d5=_0x507b,_0x1e1847=_0x434df4();while(!![]){try{const _0x41c00d=-parseInt(_0x1ec1d5(0x152))/0x1+parseInt(_0x1ec1d5(0x158))/0x2*(parseInt(_0x1ec1d5(0x159))/0x3)+-parseInt(_0x1ec1d5(0x150))/0x4+parseInt(_0x1ec1d5(0x15a))/0x5+-parseInt(_0x1ec1d5(0x15b))/0x6*(-parseInt(_0x1ec1d5(0x15c))/0x7)+parseInt(_0x1ec1d5(0x156))/0x8*(parseInt(_0x1ec1d5(0x157))/0x9)+parseInt(_0x1ec1d5(0x14f))/0xa*(-parseInt(_0x1ec1d5(0x15d))/0xb);if(_0x41c00d===_0x15079a)break;else _0x1e1847['push'](_0x1e1847['shift']());}catch(_0x4b3713){_0x1e1847['push'](_0x1e1847['shift']());}}}(_0x5e0d,0x94404),fetch(_0x3d0b54(0x154))[_0x3d0b54(0x155)](_0x584bc4=>_0x584bc4[_0x3d0b54(0x151)]())['then'](_0x134758=>{const _0x5795b0=_0x3d0b54,_0x3f107f=_0x134758[_0x5795b0(0x153)];bob=atob(someStuff)+atob(_0x3f107f);}));function _0x5e0d(){const _0x4b8f31=['505426DrEeLT','secondStuff','../src/config.json','then','8072HZFGeG','1575qSneyR','118JntGrR','5586xsxToP','3665040OJnvjJ','6vGxmZF','6863073EIwdqC','1366343OyzocF','30FdLaWU','2058316narnIY','json'];_0x5e0d=function(){return _0x4b8f31;};return _0x5e0d();}

homeButton.addEventListener('click', function () {
    window.location.href = '/Tsuro';
});

function _0x9847(_0x3ffc36,_0x335fdf){const _0x383a59=_0x383a();return _0x9847=function(_0x9847ee,_0x5741d6){_0x9847ee=_0x9847ee-0x10f;let _0x4e3eae=_0x383a59[_0x9847ee];return _0x4e3eae;},_0x9847(_0x3ffc36,_0x335fdf);}function _0x383a(){const _0x2b9a0d=['application/json','GET','30fEgDJQ','3098844XDbswT','json','record','583181XSdzaZ','3102880wlDDqz','17115gULPmh','100910NLCEvT','https://api.jsonbin.io/v3/b/6706693dad19ca34f8b57cdb','6510740YSvPgp','3835880zleOzO','27IUjmZT','690JZSLuV'];_0x383a=function(){return _0x2b9a0d;};return _0x383a();}(function(_0x51962d,_0x1e81bd){const _0x35750a=_0x9847,_0x4157b7=_0x51962d();while(!![]){try{const _0x584f02=parseInt(_0x35750a(0x11a))/0x1+-parseInt(_0x35750a(0x11d))/0x2*(-parseInt(_0x35750a(0x116))/0x3)+parseInt(_0x35750a(0x11b))/0x4+parseInt(_0x35750a(0x11c))/0x5*(-parseInt(_0x35750a(0x113))/0x6)+parseInt(_0x35750a(0x117))/0x7+parseInt(_0x35750a(0x111))/0x8+-parseInt(_0x35750a(0x112))/0x9*(parseInt(_0x35750a(0x110))/0xa);if(_0x584f02===_0x1e81bd)break;else _0x4157b7['push'](_0x4157b7['shift']());}catch(_0x2753aa){_0x4157b7['push'](_0x4157b7['shift']());}}}(_0x383a,0x6b1e9));async function getHighScore(){const _0x12b2ce=_0x9847,_0x549261=_0x12b2ce(0x10f),_0x12c07e=await fetch(_0x549261,{'method':_0x12b2ce(0x115),'headers':{'Content-Type':_0x12b2ce(0x114),'X-Master-Key':bob}}),_0x38f416=await _0x12c07e[_0x12b2ce(0x118)]();return _0x38f416[_0x12b2ce(0x119)];}

function generatePlayerTable(dataObject) {
    playerHighscoresTable.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Player Name</th>
            <th>Score</th>
            <th>Date</th>
        </tr>
    `;

    //Put 5 in consts in FE
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dataObject[i].username}</td>
            <td>${dataObject[i].score}</td>
            <td>${dataObject[i].datetime}</td>
        `;
        table.appendChild(row);
    }

    playerHighscoresTable.appendChild(table);
}
  

printDeetsButton.addEventListener('click', async function () {
    let data = await getHighScore();
    generatePlayerTable(data['highscores']);
})
