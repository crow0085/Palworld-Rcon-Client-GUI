
let ip
let port
let password
let rconClient1
let content = document.getElementById('content')

const { PalRCONClient } = require('palrconclient');

const sleep = ms => new Promise(r => setTimeout(r, ms));

window.addEventListener('load', () => {
    connectionPage()
})

function connectionPage() {
    content.innerHTML = ''

    // creating the ip label
    let ipLbl = document.createElement('label')
    ipLbl.innerHTML = 'Server IP: '

    // creating the ip text input
    let ip_text = document.createElement('input')
    ip_text.setAttribute("type", "text");
    ip_text.id = 'ip_text'

    //creating the row div to store the ip label and ip text input
    let row = document.createElement('div')
    row.setAttribute("class", "row align-content-center pt-3")
    content.append(row)

    // creating a col div to store the ip label
    let col = document.createElement('div')
    col.setAttribute("class", "col")
    col.append(ipLbl)
    row.append(col)

    // creating a col div to store the ip text input
    col = document.createElement('div')
    col.setAttribute("class", "col")
    col.append(ip_text)
    row.append(col)

    let portLbl = document.createElement('label')
    portLbl.innerHTML = 'Rcon Port: '

    let port_text = document.createElement('input')
    port_text.setAttribute("type", "text");
    port_text.id = 'port_text'
    port_text.value = '25575'

    //creating the row div to store the port label and port text input
    row = document.createElement('div')
    row.setAttribute("class", "row align-content-center pt-3")
    content.append(row)

    // creating a col div to store the port label
    col = document.createElement('div')
    col.setAttribute("class", "col")
    col.append(portLbl)
    row.append(col)

    // creating a col div to store the port text input
    col = document.createElement('div')
    col.setAttribute("class", "col")
    col.append(port_text)
    row.append(col)

    let passwordLbl = document.createElement('label')
    passwordLbl.innerHTML = 'Rcon Password: '

    let password_text = document.createElement('input')
    password_text.setAttribute("type", "text");
    password_text.id = 'password_text'

    //creating the row div to store the password label and password text input
    row = document.createElement('div')
    row.setAttribute("class", "row align-content-center pt-3")
    content.append(row)

    // creating a col div to store the password label
    col = document.createElement('div')
    col.setAttribute("class", "col")
    col.append(passwordLbl)
    row.append(col)

    // creating a col div to store the password text input
    col = document.createElement('div')
    col.setAttribute("class", "col")
    col.append(password_text)
    row.append(col)

    let connectBtn = document.createElement('button')
    connectBtn.setAttribute("class", "btn btn-primary")
    connectBtn.innerHTML = 'Connect'
    connectBtn.id = 'connect'
    connectBtn.onclick = connect

    //creating the row div to store the connect button
    row = document.createElement('div')
    row.setAttribute("class", "row align-content-center pt-3")
    content.append(row)

    // creating a col div to create space
    col = document.createElement('div')
    col.setAttribute("class", "col")
    row.append(col)

    // creating a col div to store the connect button
    col = document.createElement('div')
    col.setAttribute("class", "col")
    col.append(connectBtn)
    row.append(col)
}

const connect = async () => {
    let ip = document.getElementById('ip_text').value
    let port = document.getElementById('port_text').value
    let password = document.getElementById('password_text').value
    rconClient1 = new PalRCONClient(ip, port, password);
    PalRCONClient.checkConnection(rconClient1)
        .then((isValid) => {
            let div = document.getElementById('alert')
            if (document.body.contains(div)) {
                div.innerHTML = ''
            } else {
                div = document.createElement('div')
                content.append(div)
                div.id = 'alert'
            }
            if (isValid) {
                div.setAttribute("class", "alert alert-success")
                div.innerHTML = 'Connected to server!'
            } else {
                div.setAttribute("class", "alert alert-danger")
                div.innerHTML = `connection failed`
            }

        })
        .catch((error) => console.error('Error:', error.message));
}

document.getElementById('connect').onclick = async () => {
    connectionPage()
}

document.getElementById('send').onclick = async () => {
    content.innerHTML = ''

    let label = document.createElement("label");
    label.innerHTML = 'Broadcast message to server:'
    label.setAttribute("class", "col-form-label mt-3")

    let textarea = document.createElement("textarea");
    textarea.setAttribute("class", "form-control mt-3")
    textarea.setAttribute("rows", "5");
    textarea.id = 'send-txt'

    let sendBtn = document.createElement('button')
    sendBtn.setAttribute("class", "btn btn-primary mt-3")
    sendBtn.innerHTML = 'Send'
    sendBtn.id = 'send'
    sendBtn.onclick = send

    content.append(label)
    content.append(textarea)
    content.append(sendBtn)

}

const send = async () => {
    const msg = document.getElementById('send-txt').value
    PalRCONClient.Broadcast(rconClient1, msg)
        .then((response) => {
            let div = document.getElementById('alert')
            if (document.body.contains(div)) {
                div.innerHTML = ''
            } else {
                div = document.createElement('div')
                div.id = 'alert'
            }
            div.setAttribute("class", "alert alert-success")
            div.innerHTML = `response from server: ${response}`
            content.append(div)
        })
        .catch((error) => {
            let div = document.getElementById('alert')
            if (document.body.contains(div)) {
                div.innerHTML = ''
            } else {
                div = document.createElement('div')
                content.append(div)
                div.id = 'alert'
            }
            div.setAttribute("class", "alert alert-danger")
            div.innerHTML = 'There was an error sending a message to the server, please make sure you are successfully connected'

        })
}

document.getElementById('save').onclick = async () => {
    content.innerHTML = ''

    PalRCONClient.Save(rconClient1)
        .then((response) => {
            let div = document.createElement('div')
            div.setAttribute("class", "alert alert-success")
            div.innerHTML = 'Saved server!'

            content.append(div)
        })
        .catch((error) => {
            let div = document.createElement('div')
            div.setAttribute("class", "alert alert-danger")
            div.innerHTML = 'There was an error saving server, please make sure you are successfully connected'

            content.append(div)
        })
}

document.getElementById('shutdown').onclick = async () => {
    content.innerHTML = ''

    let label = document.createElement("label");
    label.innerHTML = 'Shutdown message to server:'
    label.setAttribute("class", "col-form-label mt-3")

    let textarea = document.createElement("textarea");
    textarea.setAttribute("class", "form-control mt-3")
    textarea.setAttribute("rows", "5");
    textarea.id = 'shutdown-txt'

    let label2 = document.createElement("label");
    label2.innerHTML = 'Time in seconds to shutdown:'
    label2.setAttribute("class", "col-form-label mt-3")

    let time = document.createElement("input");
    time.setAttribute("type", "number");
    time.setAttribute("class", "form-control")
    time.id = 'time-txt'

    let sendBtn = document.createElement('button')
    sendBtn.setAttribute("class", "btn btn-primary mt-3")
    sendBtn.innerHTML = 'Shutdown'
    sendBtn.id = 'shutdown'
    sendBtn.onclick = shutdown

    content.append(label)
    content.append(textarea)
    content.append(label2)
    content.append(time)
    content.append(sendBtn)
}

const shutdown = async () => {
    const msg = document.getElementById('shutdown-txt').value
    const time = document.getElementById('time-txt').value
    PalRCONClient.ShutDown(rconClient1, time, msg)
        .then((response) => {
            let div = document.getElementById('alert')
            if (document.body.contains(div)) {
                div.innerHTML = ''
            } else {
                div = document.createElement('div')
                div.id = 'alert'
            }
            div.setAttribute("class", "alert alert-success")
            div.innerHTML = response
            content.append(div)
        })
        .catch((error) => {
            let div = document.getElementById('alert')
            if (document.body.contains(div)) {
                div.innerHTML = ''
            } else {
                div = document.createElement('div')
                content.append(div)
                div.id = 'alert'
            }
            div.setAttribute("class", "alert alert-danger")
            div.innerHTML = 'There was an error shutting down the server, please make sure you are successfully connected'

        })
}

document.getElementById('ban').onclick = async () => {
    content.innerHTML = ''

    PalRCONClient.ShowPlayers(rconClient1).then((response) => {
        let players = response.split(/[,\n]/).map(item => item.trim()).filter(item => item !== '');
        players = chunkArray(players, 3)
        players = players.slice(1)

        let label = document.createElement("label");
        label.innerHTML = 'Ban Player: '
        label.setAttribute("class", "col-form-label")

        let dropdown = document.createElement('select')
        dropdown.setAttribute('class', 'form-control')
        dropdown.id = 'ban-txt'

        // Populate the dropdown with player names and IDs
        players.forEach(playerSet => {
            const playerName = playerSet[0];
            const playerID = playerSet[2];
            const option = document.createElement('option');
            option.value = playerID;
            option.textContent = playerName;
            dropdown.appendChild(option);
        });

        let button = document.createElement('button')
        button.setAttribute('class', 'btn btn-primary')
        button.id = 'ban-btn'
        button.onclick = banPlayer
        button.innerHTML = 'Ban'

        //creating the row div
        row = document.createElement('div')
        row.setAttribute("class", "row align-content-center pt-3")
        content.append(row)

        // creating a col div
        col = document.createElement('div')
        col.setAttribute("class", "col-auto")
        col.append(label)
        row.append(col)

        // creating a col div
        col = document.createElement('div')
        col.setAttribute("class", "col-3")
        col.append(dropdown)
        row.append(col)

        // creating a col div
        col = document.createElement('div')
        col.setAttribute("class", "col-auto")
        col.append(button)
        row.append(col)
    }).catch((err) => {
        let div = document.getElementById('alert')
        if (document.body.contains(div)) {
            div.innerHTML = ''
        } else {
            div = document.createElement('div')
            content.append(div)
            div.id = 'alert'
        }
        div.setAttribute("class", "alert alert-danger")
        div.innerHTML = 'There was an error, please make sure you are successfully connected'
    })
}

const banPlayer = async () => {
    const steamid = document.getElementById('ban-txt').value
    PalRCONClient.Ban(rconClient1, steamid).then((response) => {
        let div = document.getElementById('alert')
        if (document.body.contains(div)) {
            div.innerHTML = ''
        } else {
            div = document.createElement('div')
            div.id = 'alert'
        }
        div.setAttribute("class", "alert alert-success")
        div.innerHTML = `response from server: ${response}`
        content.append(div)
    })
        .catch((error) => {
            let div = document.getElementById('alert')
            if (document.body.contains(div)) {
                div.innerHTML = ''
            } else {
                div = document.createElement('div')
                content.append(div)
                div.id = 'alert'
            }
            div.setAttribute("class", "alert alert-danger")
            div.innerHTML = 'There was an error Banning player, please make sure you are successfully connected'

        })
}

document.getElementById('kick').onclick = async () => {
    content.innerHTML = ''

    PalRCONClient.ShowPlayers(rconClient1).then((response) => {
        let players = response.split(/[,\n]/).map(item => item.trim()).filter(item => item !== '');
        players = chunkArray(players, 3)
        players = players.slice(1)

        let label = document.createElement("label");
        label.innerHTML = 'Kick Player: '
        label.setAttribute("class", "col-form-label")

        let dropdown = document.createElement('select')
        dropdown.setAttribute('class', 'form-control')
        dropdown.id = 'kick-txt'

        // Populate the dropdown with player names and IDs
        players.forEach(playerSet => {
            const playerName = playerSet[0];
            const playerID = playerSet[2];
            const option = document.createElement('option');
            option.value = playerID;
            option.textContent = playerName;
            dropdown.appendChild(option);
        });

        let button = document.createElement('button')
        button.setAttribute('class', 'btn btn-primary')
        button.id = 'kick-btn'
        button.onclick = kickPlayer
        button.innerHTML = 'Kick'

        //creating the row div
        row = document.createElement('div')
        row.setAttribute("class", "row align-content-center pt-3")
        content.append(row)

        // creating a col div
        col = document.createElement('div')
        col.setAttribute("class", "col-auto")
        col.append(label)
        row.append(col)

        // creating a col div
        col = document.createElement('div')
        col.setAttribute("class", "col-3")
        col.append(dropdown)
        row.append(col)

        // creating a col div
        col = document.createElement('div')
        col.setAttribute("class", "col-auto")
        col.append(button)
        row.append(col)
    }).catch((err) => {
        let div = document.getElementById('alert')
        if (document.body.contains(div)) {
            div.innerHTML = ''
        } else {
            div = document.createElement('div')
            content.append(div)
            div.id = 'alert'
        }
        div.setAttribute("class", "alert alert-danger")
        div.innerHTML = 'There was an error, please make sure you are successfully connected'
    })
}

const kickPlayer = async () => {
    const steamid = document.getElementById('kick-txt').value
    PalRCONClient.Kick(rconClient1, steamid).then((response) => {
        let div = document.getElementById('alert')
        if (document.body.contains(div)) {
            div.innerHTML = ''
        } else {
            div = document.createElement('div')
            div.id = 'alert'
        }
        div.setAttribute("class", "alert alert-success")
        div.innerHTML = `response from server: ${response}`
        content.append(div)
    })
        .catch((error) => {
            let div = document.getElementById('alert')
            if (document.body.contains(div)) {
                div.innerHTML = ''
            } else {
                div = document.createElement('div')
                content.append(div)
                div.id = 'alert'
            }
            div.setAttribute("class", "alert alert-danger")
            div.innerHTML = 'There was an error kicking player, please make sure you are successfully connected'

        })
}

document.getElementById('players').onclick = async () => {
    content.innerHTML = ''
    PalRCONClient.ShowPlayers(rconClient1).then((response) => {
        let players = response.split(/[,\n]/).map(item => item.trim()).filter(item => item !== '');
        players = chunkArray(players, 3)
        let table = document.createElement("table");
        table.setAttribute('class', 'table')
        table.id = 'player-list'
        players.forEach(playerSet => {
            let row = table.insertRow(-1); // Create a new row for each player set
            playerSet.forEach((player, index) => {
                let cell = row.insertCell(index); // Insert cells for each player in the player set
                cell.innerText = player;
            });
        });
        content.append(table)
    }).catch((err) => {
        let div = document.getElementById('alert')
        if (document.body.contains(div)) {
            div.innerHTML = ''
        } else {
            div = document.createElement('div')
            content.append(div)
            div.id = 'alert'
        }
        div.setAttribute("class", "alert alert-danger")
        div.innerHTML = 'There was an error, please make sure you are successfully connected'
    })
}

function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
}