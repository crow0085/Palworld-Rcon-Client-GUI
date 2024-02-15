import {populatePlayers, processArray, chunkArray} from './functions.js'

let testPlayers = [
    'Test1',
    '0650654335',
    '49508540806737002Test2',
    '9865130789',
    '18478554708532809Testsast23374',
    '9865130789',
    '05554340315566750'
]

window.addEventListener('load', () => {

    const playerListReal = JSON.parse(sessionStorage.getItem('players'))
    // console.log(playerListReal)
    let playerList = processArray(playerListReal)
    playerList = chunkArray(playerList, 3);
    console.log(playerList)
    populatePlayers(playerList)

})

document.getElementById('return').onclick = function () {
    window.location.replace('./rcon-commands.html');
}

