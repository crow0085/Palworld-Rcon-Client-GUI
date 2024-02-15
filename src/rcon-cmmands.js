import { createRconClient, PalRCONClient, rconClient1, processArray, chunkArray, isDataHandled} from './functions.js'

let ip
let port
let password

const sleep = ms => new Promise(r => setTimeout(r, ms));

window.addEventListener('load', () => {
    ip = sessionStorage.getItem('ip')
    port = sessionStorage.getItem('port')
    password = sessionStorage.getItem('password')

    createRconClient(ip, Number(port), password)
})

document.getElementById('reconnect').onclick = function () {
    window.location.replace('./index.html');
}

document.getElementById('send').onclick = async () => {
    const msg = document.getElementById('send-txt').value
    await PalRCONClient.Broadcast(rconClient1, `${msg}`)
}

document.getElementById('save').onclick = async () => {
    const msg = 'Manually Saving Server'
    await PalRCONClient.Broadcast(rconClient1, `${msg}`)
    await PalRCONClient.Save(rconClient1)
}

document.getElementById('shutdown').onclick = async () => {
    const shutdownMsg = document.getElementById('shutdown-txt').value
    const shutdownTime = Number(document.getElementById('shutdown-time').value)
    await PalRCONClient.Shutdown(rconClient1, `${shutdownTime}`, `${shutdownMsg}`)
}

document.getElementById('kick-txt').onfocus = async () => {
    await PalRCONClient.ShowPlayers(rconClient1).then(() => {
        let players;
        const intervalId = setInterval(() => {
            players = JSON.parse(sessionStorage.getItem('players'));
            if (players !== null) {
                clearInterval(intervalId); // Stop the interval
                console.log(`${players}`);
                // players = [
                //     'Test1',
                //     '0650654335',
                //     '49508540806737002Test2',
                //     '9865130789',
                //     '18478554708532809Testsast23374',
                //     '9865130789',
                //     '05554340315566750'
                // ]
                let playerList = processArray(players);
                playerList = chunkArray(playerList, 3);
                console.log(playerList);

                // Populate the dropdown menu
                const dropdown = document.getElementById('kick-txt');
                dropdown.innerHTML = ''; // Clear existing options
                // Create and append the default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select a player';
                dropdown.appendChild(defaultOption);
                // Populate the dropdown with player names and IDs
                playerList.forEach(playerSet => {
                    const playerName = playerSet[0];
                    const playerID = playerSet[2];
                    const option = document.createElement('option');
                    option.value = playerID;
                    option.textContent = playerName;
                    dropdown.appendChild(option);
                });
            }
        }, 100); // Check every 100 milliseconds
    });
}

document.getElementById('kick').onclick = async () => {
    const steamid = document.getElementById('kick-txt').value;
    await PalRCONClient.Kick(rconClient1, steamid)
    console.log(steamid)
}

document.getElementById('ban').onclick = async () => {
    const msg = `Banning Player with steamid: ${document.getElementById('ban-txt').value}`
    await PalRCONClient.Broadcast(rconClient1, `${msg}`)
    const steamid = document.getElementById('ban-txt').value
    await PalRCONClient.Kick(rconClient1, `${steamid}`)
}

document.getElementById('show-players-btn').onclick = async () => {
    await PalRCONClient.ShowPlayers(rconClient1).then(() => {
        let players;
        const intervalId = setInterval(() => {
            players = JSON.parse(sessionStorage.getItem('players'));
            if (players !== null) {
                clearInterval(intervalId); // Stop the interval
                console.log(`${players}`);
                window.location.replace('./players.html');
            }
        }, 100); // Check every 100 milliseconds
    });
    
}

const ShowPlayers = async (data) => {
    result = data.replace('name,playeruid,steamid', '')
}