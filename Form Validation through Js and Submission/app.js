const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const { main, client } = require('./db');

const hostname = '127.0.0.1';
const port = 1100;
const server = http.createServer((req, res) => {

    async function initializeDB(req, res, data) {
        try {
            await main(data);
        } catch (error) {
            console.log(error);
        } finally {
            () => client.close();
        }
    }

    if (req.url === '/') {
        if (req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.readFile('./public/index.html', 'utf8', (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    res.end(data);
                    // console.log(data);
                }
            })
        }
        else if (req.method === "POST") {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            })
            req.on('end', () => {
                body = JSON.stringify(body);
                const parsedBody = querystring.parse(body);
                // console.log(body);
                // console.log(parsedBody);

                let string = '';
                for (const key in parsedBody) {
                    const value = parsedBody[key];
                    string += `\n${key}: ${value},`;
                }

                // Saving data to local files 
                fs.readFile('FormData.txt', 'utf-8', (error, txtFileData) => {
                    if (error) {
                        fs.writeFileSync('FormData.txt', `Form Data: \n${decodeURIComponent(body)}`);
                    }
                    else {
                        const textDataToWrite = `${txtFileData}\n${decodeURIComponent(body)}`;
                        fs.writeFileSync('FormData.txt', `${textDataToWrite}`);
                    }
                })

                fs.readFile('FormData.json', 'utf-8', (error, jsonFileData) => {
                    if (error) {
                        fs.writeFileSync(`[${JSON.stringify(parsedBody)}]`);
                    }
                    else {
                        let jsonDataToWrite = JSON.parse(jsonFileData);
                        jsonDataToWrite.push(parsedBody)
                        jsonDataToWrite = JSON.stringify(jsonDataToWrite);
                        console.log(jsonFileData);
                        fs.writeFileSync('FormData.json', jsonDataToWrite);
                    }
                })
                initializeDB(req, res, parsedBody);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(`<h1> Form Submitted Successfully </h1> <p> ${string} </p>`);
            })
        }
    }
    else if (req.url === '/style.css') {
        res.setHeader('Content-type', 'text/css');
        res.write(fs.readFileSync('./public/style.css'));
        res.end();
    }
    else if (req.url === '/script.js') {
        res.setHeader('Content-type', 'text/css');
        res.write(fs.readFileSync('./public/script.js'));
        res.end();
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1> Page Not Found <h1/>');
    }


});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});