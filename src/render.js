const PalRCONClient = require('palrconclient');

let rconClient1 = null

document.getElementById('submit').onclick = async () => {
    var valid = true
    const ipRegex = new RegExp('^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$')
    const ip = document.getElementById('ip').value
    if (!ipRegex.test(ip) && ip !== '127.0.0.1') {
        document.getElementById('ip-err').innerHTML = 'Please Enter Valid IP'
        valid = false
    } else {
        document.getElementById('ip-err').innerHTML = ''
    }
    const port = document.getElementById('port').value
    if (isNaN(port)) {
        document.getElementById('port-err').innerHTML = 'Please Enter Valid Port'
        valid = false
    } else {
        document.getElementById('port-err').innerHTML = ''
    }
    const password = document.getElementById('password').value
    if (password.length <= 0) {
        valid = false
        document.getElementById('pass-err').innerHTML = 'Password Field Cannot be Empty'
    } else {
        document.getElementById('pass-err').innerHTML = ''
    }

    if (valid) {
        await createRconClient(ip, port, password)
        //rShowData()
        document.getElementById("rcon-commands").style.display = "block"
        document.getElementById("get-rcon-info").style.display = "none"
        document.getElementById("show-data").style.display = "none"
    }
}

async function createRconClient(ip, port, password) {
    rconClient1 = new PalRCONClient(ip, Number(port), password, {
        onData: (data) => {
            console.log('Connection 1 data:\n', data.response)
            try {
                const split = data.response.split(',')
                if (split[0] === 'name') {
                    ShowPlayers(data.response)
                }
            } catch {

            }

        },
        onEnd: () => {
            console.log('Connection 1 closed.');
        },
        onError: (err) => {
            console.error('Connection 1 error:', err)
        },
    });
}

document.getElementById('reconnect').onclick = function () {
    document.getElementById("rcon-commands").style.display = "none"
    document.getElementById("show-data").style.display = "none"
    document.getElementById("get-rcon-info").style.display = "block"
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

document.getElementById('kick').onclick = async () => {
    const msg = `Kicking Player with steamid: ${document.getElementById('kick-txt').value}`
    await PalRCONClient.Broadcast(rconClient1, `${msg}`)
    const steamid = document.getElementById('kick-txt').value
    await PalRCONClient.Kick(rconClient1, `${steamid}`)
}

document.getElementById('ban').onclick = async () => {
    const msg = `Banning Player with steamid: ${document.getElementById('ban-txt').value}`
    await PalRCONClient.Broadcast(rconClient1, `${msg}`)
    const steamid = document.getElementById('ban-txt').value
    await PalRCONClient.Kick(rconClient1, `${steamid}`)
}

document.getElementById('show-players-btn').onclick = async () => {
    await PalRCONClient.ShowPlayers(rconClient1)
}

document.getElementById('refresh').onclick = async () => {
    await PalRCONClient.ShowPlayers(rconClient1)
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const ShowPlayers = async (data) => {
    result = data.replace('name,playeruid,steamid', '')
    document.getElementById("rcon-commands").style.display = "none"
    document.getElementById("get-rcon-info").style.display = "none"
    document.getElementById("show-data").style.display = "block"
    document.getElementById('player-list').innerHTML = result
}

document.getElementById('return').onclick = async () => {
    document.getElementById("rcon-commands").style.display = "block"
    document.getElementById("get-rcon-info").style.display = "none"
    document.getElementById("show-data").style.display = "none"
    document.getElementById('player-list').innerHTMLL = ''
}