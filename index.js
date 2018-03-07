let app = require('express')();

let file2 = 'E:/Github/EE_repos/ExpressServer/public/user2.bin';
let file1 = 'E:/Github/EE_repos/ExpressServer/public/user1.bin';

function resHead(res, file) 
{
    console.log('resHead');
    res.setHeader('Content-Type','application/octet-stream');
    res.setHeader('Content-Length','331892'); // file size
    res.setHeader('Accept-Ranges','bytes');
    res.setHeader('Connection','close');
    res.status(200);
    res.end(file, 'binary');             
}

function resGet(res, file) 
{
    console.log('resGet');
    var options = 
    {
headers: {
            'Content-Type':'application/octet-stream',
            'Content-Length':'331892',
            'Accept-Ranges':'bytes',
            'Connection':'close'
        }
    };

    res.status(200);
    res.sendFile(file,options);            
}

app.head('/user2.bin', (req, res) => 
{
    console.log('Head user2.bin');
    resHead(res, file2);
});

app.get('/user2.bin', (req, res) => 
{    
    console.log('Get user2.bin');
    resGet(res, file2);
});

app.head('/user1.bin', (req, res) => 
{
    console.log('Head user1.bin');
    resHead(res, file1);
});

app.get('/user1.bin user1.bin', (req, res) => 
{   
    console.log('Get');
    resGet(res, file1);
});


app.listen(3322, () => console.log('Listening on 3322'));