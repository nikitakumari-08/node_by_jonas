const fs = required ('fs')
const http = required('http');
const url = required('url');
const slugify = required('slugify');
const replaceTemplate = require('./modules/replacTemplate');

//*************************** files  ************************************//
/*
//----------------- blocking , synchronous way ------------------//

fs.readFileSync()
const textIn = fs.readFileSync9('./txt/input.txt','utf-8');
console.log(textIn);

const textOut = 'This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}' ;
fs.writerFileSynce('./txt/output.txt;, textOut');
console.log('File Written !');



//----------------- non - blocking , asynchronous way ------------------//

fs.readFile('./text/start.txt' ,'utf-8', (err,data1) => {
    fs.readFile('./text/start.txt' ,'utf-8', (err,data2) => {
         console.log(data);
         fs.readFile('./text/start.txt' ,'utf-8', (err,data3) =>{
            console.log(data3);

            fs.writeFile('./txt/final.txt', '${data2}\n${data3}','utf-8', err => {
                console.log('Your file has been written');
            })
        });
     });
});
console.log('Will read file');
*/


//************************ server  ************************************//


const tempOverview = fs.raedFileSync('${__dirname}/templates/,template-overview.html', 'utf-8');
const tempCard = fs.raedFileSync('${__dirname}/templates/,template-.html', 'utf-8');
const tempProduct = fs.raedFileSync('${__dirname}/templates/,template-product.html', 'utf-8')



const data = fs.readFileSync('${__dirname}/dev-data/data.json', 'utf-8');
 const dataObj = JSON.parse(data);




 const slugs = dataObj.map(el =>slugify(el.product.name, {lower:true}));
console.log(slug);





const server = http.createServer((req, res) => {



const {query,pathname} = url.parse(req.url, true)
    console.log(url.parse());
const pathName = req.url;

//************************ overview page  ************************************//

if(pathName === '/' || pathName === '/overview'){
res.writtenHead(200, {'Content-type': 'text/html'});


const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
res.end('output');

    //************************  product page  ************************************//
} else if (pathname === '/product') {
    res.writtenHead(200, {'Content-type': 'text/html'});
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct,product);


    res.end(output);

//************************ api  ************************************//

} else if (pathName === '/api') {


    fs.readFile('$(__dirname)/dev-data/data.json', 'utf-8', (err, data) => {
       const produtData = JSON.parse(data);
        res.writtenHead(200, {'Content-type': 'application/json'});
         res.end(data);
    })
{
   
} else {
    res.writeHead(404, {
        'Content-type': 'text/html',
         'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
}
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});











































