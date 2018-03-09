let app = require('express')();
const fs = require("fs"); 
var appRoot = require('app-root-path');

let file1 = '/public/user1.bin';
let file2 = '/public/user2.bin';
let reqUser1 = '/simpaltek-iot/nxg-100-firmware/nxg100-2.0.5.user1.bin';
let reqUser2 = '/simpaltek-iot/nxg-100-firmware/nxg100-2.0.5.user2.bin';

function getFilesizeInBytes(filename) 
{
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

function resHead(res, file) 
{
    console.log('resHead');
    var filePath = appRoot + file;
    res.setHeader('Content-Type','application/octet-stream');
    res.setHeader('Content-Length', getFilesizeInBytes(filePath)); // file size
    res.setHeader('Accept-Ranges','bytes');
    res.setHeader('Connection','close');
    res.status(200);
    res.end(filePath, 'binary');             
}

function resGet(res, file) 
{
    console.log('resGet');  
    var filePath = appRoot + file;
    var options = 
    {
headers: {
            'Content-Type':'application/octet-stream',
            'Content-Length':getFilesizeInBytes(filePath),
            'Accept-Ranges':'bytes',
            'Connection':'close'
        }
    };

    res.status(200);
    res.sendFile(filePath,options);            
}

app.head(reqUser2, (req, res) => 
{
    console.log('Head '+reqUser2);
    resHead(res, file2);
});

app.get(reqUser2, (req, res) => 
{    
    console.log('Get '+reqUser2);
    resGet(res, file2);
});

app.head(reqUser1, (req, res) => 
{
    console.log('Head '+reqUser1);
    resHead(res, file1);
});

app.get(reqUser1, (req, res) => 
{   
    console.log('Get '+reqUser1);
    resGet(res, file1);
});

app.listen(3322, () => console.log('Listening on 3322'));