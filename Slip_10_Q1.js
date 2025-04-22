
const http=require('http');
http.createServer((req,resp)=>{
    var str="Hello World!";
    str=str.toUpperCase();
    resp.write("the Upper Case word is :"+str);
    resp.end();
}).listen(3000,()=>{
    console.log("server is running on the port 3000");
});