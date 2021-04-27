const electron = require('electron');
const { ipcRenderer } = require('electron')
const net = electron.remote.net;


addEventListener('load', () => {

    const request = net.request({

        method: 'GET',

        protocol: 'http:',

        hostname: 'rec-api.aymeric-mai.fr',

        port: 8000,

        path: '/status_rec',

        redirect: 'follow'
    });

    request.on('response', (response) => {

        console.log(`STATUS: ${response.statusCode}`);

        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        let data_temp = '';

        response.on('end', () => {
            console.log(data_temp);
            let data = JSON.parse(data_temp);

            if (data.status === 'true') {
                console.log('Direction extinction vidéo')
                setTimeout(
                    function()
                    {
                        ipcRenderer.send('show-stop')
                        ipcRenderer.send('hide-load')
                    }, 4500);

            }else{
                console.log('Direction démarrage de vidéo')
                setTimeout(
                    function()
                    {
                        ipcRenderer.send('show-main')
                        ipcRenderer.send('hide-load')
                    }, 4500);
            }

        });
        response.on("data", chunk => {
            data_temp += chunk;
        });

    });

    request.on('finish', () => {

        console.log('Request is Finished')

    });

    request.on('abort', () => {

        console.log('Request is Aborted')

    });

    request.on('error', (error) => {

        console.log(`ERROR: ${JSON.stringify(error)}`)

    });

    request.on('close', (error) => {

        console.log('Last Transaction has occured')

    });

    request.setHeader('Content-Type', 'application/json');

    request.end();



});






