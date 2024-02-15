const { PalRCONClient } = require('palrconclient');


document.getElementById('connect').onclick = async () => {

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
    if (isNaN(port) || port === '') {
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
        const rconClient1 = new PalRCONClient(ip, port, password);
        PalRCONClient.checkConnection(rconClient1)
            .then((isValid) => {
                if (isValid) {
                    sessionStorage.setItem('ip', ip)
                    sessionStorage.setItem('port', port)
                    sessionStorage.setItem('password', password)
                    window.location.replace('./rcon-commands.html');
                } else {
                    console.log(`connection failed`)
                }
            })
            .catch((error) => console.error('Error:', error.message));
    }

}