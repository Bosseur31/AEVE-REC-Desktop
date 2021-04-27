const electron = require('electron');
const { ipcRenderer } = require('electron')
const net = electron.remote.net;

function post_api() {
    var name = document.forms["formulaire"]["name"].value;
    var body = JSON.stringify({ name: name });
    const request = net.request({

        method: 'POST',

        protocol: 'http:',

        hostname: 'rec-api.aymeric-mai.fr',

        port: 8000,

        path: '/run_rec',

        redirect: 'follow'

    });

    request.on('response', (response) => {

        console.log(`STATUS: ${response.statusCode}`);

        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);



        response.on('data', (chunk) => {

            console.log(`BODY: ${chunk}`)

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

    request.write(body, 'utf-8');

    request.end();

    ipcRenderer.send('show-load')
    ipcRenderer.send('hide-main')

}