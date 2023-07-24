const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

// 缓存指代的是静态文件的缓存
// 缓存：强制缓存 （不会再次向服务器发起请求）， 对比缓存、协商缓存
const server = http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url,true);

    // 如果返回的是一个html ，html引用了其他的资源，会在像服务器发送请求
    // 强制缓存 针对浏览器直接访问时不走强制缓存的
    // 缓存类型 disk cache  memory cache 代码无法控制
    let filePath = path.join(__dirname,'public',pathname); 

    // 服务器要和客户端说，下次别找了
    // 强制缓存，不对首次访问的路径做处理，后续的资源10s内不会在请求服务器

    // Cache-Control no-cache 每次都像服务器发送请求,会存到浏览器的缓存中
    // Cache-Control no-store 每次都像服务器要，但是不会缓存到浏览器里
    // 如果服务器每次都返回最新的那么 还是会用最新的内容

    // 强制缓存 需要根据不同的类型设置缓存时间
    res.setHeader('Cache-Control','max-age=10'); // 设置缓存的时长 相对时间
    res.setHeader('Expires',new Date(Date.now() + 10 * 1000).toGMTString()) // 绝对时间
    fs.stat(filePath,function (err,statObj) {
        if(err){
            res.statusCode = 404;
            res.end('NOT FOUND')
        }else{
            if(statObj.isFile()){
                res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf-8')
                fs.createReadStream(filePath).pipe(res);
            }else{
                // 如果是目录 需要找目录下的index.html
                let htmlPath = path.join( filePath,'index.html');
                fs.access(htmlPath,function (err) {
                    if(err){
                        res.statusCode = 404;
                        res.end('NOT FOUND')
                    }else{
                        res.setHeader('Content-Type','text/html;charset=utf-8')
                        fs.createReadStream(htmlPath).pipe(res);
                    }
                })
            }
        }
    })
});

server.listen(3000,()=>{
    console.log(`server start 3000`)
})


const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

// 缓存指代的是静态文件的缓存
// 缓存：强制缓存 （不会再次向服务器发起请求）， 对比缓存、协商缓存
const server = http.createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true);

    let filePath = path.join(__dirname, 'public', pathname);

    res.setHeader('Cache-Control', 'max-age=10');
    // 强制缓存不会发请求，所以没有服务器返回状态码

    // no-cache 表示会访问服务器，但是浏览器中有缓存
    // 第一次访问服务器，服务器会把文件修改时间返还给你
    // 下次你在访问的时候，浏览器会携带上次设置的时间，去服务端和当前文件的修改时间做对比，如果不一样，就直接返回最新内容，如果时间一致，则返回304状态码，浏览器会去缓存中查找
    // 强制缓存和协商缓存可用配合使用 ： 例如10s 内不再访问服务器，过了10s后，会进行对比，并且在10s别来找我，不停的循环

    // 可用有匹配规则设置不同的缓存方式 
    // 最后修改时间，可能修改时间变化了，但是内容没有变化。Etag指纹
    fs.stat(filePath, function(err, statObj) {
        if (err) {
            res.statusCode = 404;
            res.end('NOT FOUND')
        } else {
            if (statObj.isFile()) {
                const ctime = statObj.ctime.toGMTString();
                if (req.headers['if-modified-since'] === ctime) {
                    res.statusCode = 304; // 去浏览器缓存中找吧
                    res.end(); // 表示此时服务器没有响应结果
                } else {
                    res.setHeader('Last-Modified', ctime)
                    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
                    fs.createReadStream(filePath).pipe(res);
                }
            } else {
                // 如果是目录 需要找目录下的index.html
                let htmlPath = path.join(filePath, 'index.html');
                fs.access(htmlPath, function(err) {
                    if (err) {
                        res.statusCode = 404;
                        res.end('NOT FOUND')
                    } else {
                        res.setHeader('Content-Type', 'text/html;charset=utf-8')
                        fs.createReadStream(htmlPath).pipe(res);
                    }
                })
            }
        }
    })
});

server.listen(3000, () => {
    console.log(`server start 3000`)
})

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const crpto = require('crypto');

// 只要协商缓存 有一点不一样都要重新的对比 
const server = http.createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true);
    let filePath = path.join(__dirname, 'public', pathname);
    res.setHeader('Cache-Control', 'no-cache');
    // 可用采用指纹的方式： 但是对于大文件，我们不会直接全量比对
    // 用文件的大小生成一个指纹，文件的开头等  koa 的时候 
    // 此案例我们就采取全量比对
    fs.stat(filePath, function(err, statObj) {
        if (err) {
            res.statusCode = 404;
            res.end('NOT FOUND')
        } else {
            if (statObj.isFile()) {
                let content = fs.readFileSync(filePath)
                let etag = crpto.createHash('md5').update(content).digest('base64')
                if(req.headers['if-none-match'] === etag) {
                    res.statusCode = 304;
                    res.end();
                }else{
                    res.setHeader('Etag', etag)
                    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
                    fs.createReadStream(filePath).pipe(res);
                }
            } else {
                let htmlPath = path.join(filePath, 'index.html');
                fs.access(htmlPath, function(err) {
                    if (err) {
                        res.statusCode = 404;
                        res.end('NOT FOUND')
                    } else {
                        res.setHeader('Content-Type', 'text/html;charset=utf-8')
                        fs.createReadStream(htmlPath).pipe(res);
                    }
                })
            }
        }
    })
});

server.listen(3000, () => {
    console.log(`server start 3000`)
})