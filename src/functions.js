let players
let dataHandled = false

export const PalRCONClient = require('palrconclient');
export let rconClient1

export const createRconClient = async (ip, port, password) => {
    rconClient1 = new PalRCONClient(ip, Number(port), password, {
        onData: (data) => {
            //console.log(data.response)
            handleData(data.response).then(() => {
                
            })
        },
        onEnd: () => {
            console.log('Connection 1 closed.');
        },
        onError: (err) => {
            console.error('Connection 1 error:', err)
        },
    });
}

export const assignPlayers = async (data) => {
    const result = data.replace('name,playeruid,steamid', '');
    players = result.split(',');
    
    // Set sessionStorage here
    sessionStorage.setItem('players', JSON.stringify(players));
    dataHandled = true; // Set the flag to true after data is handled

    // Return a resolved promise
    return Promise.resolve();
}

export const handleData = async (data) => {
    const split = data.split(',');
    if (split.length <= 0) {
        return;
    }
    if (split[0] === 'name') {
        await assignPlayers(data); // Wait for assignPlayers to finish
    }
}

export const isDataHandled = () => {
    return dataHandled;
}


export function populatePlayers(players) {
    let table = document.getElementById("player-list");
    players.forEach(playerSet => {
        let row = table.insertRow(-1); // Create a new row for each player set
        playerSet.forEach((player, index) => {
            let cell = row.insertCell(index); // Insert cells for each player in the player set
            cell.innerText = player;
        });
    });
}

export function processArray(array) {
    let newArray = [];
    array.forEach(element => {
        let firstDigits = element.match(/^\d{17}/); // Match the first 17 digits
        if (firstDigits) {
            let splitIndex = firstDigits[0].length;
            let firstPart = element.slice(0, splitIndex);
            let secondPart = element.slice(splitIndex);
            if (secondPart !== '') { // Check if second part is not empty
                newArray.push(firstPart, secondPart);
            } else {
                newArray.push(element); // If second part is empty, push the whole element
            }
        } else {
            newArray.push(element);
        }
    });
    return newArray
}


export function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
}