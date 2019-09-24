let http = require("http");

class User{
    constructor(id,name){
        this.id = id;
        this.name = name;
    }
}

let users = new Map();
users.set(1,new User(1,"tom"));
users.set(2,new User(2,"sam"));
users.set(3,new User(3,"niko"));
users.set(4,new User(4,"rain"));


class Result{
    constructor(flag,data){
        this.flag = flag;
        this.data = data;
    }
}
//创建一个服务器
let server = http.createServer(function(request,response){
           let result = null;
           let url = request.url;
        //    console.log(url);
           try{
                let param = url.split(/\?/)[1];
                let key = param.split(/=/)[0];
                let value = param.split(/=/)[1];

             if (!key || !value || key!="id")
               result = new Result(false, "Parameter must be id=???");
                    else {
                        if (Number.isInteger(+value)) {
                            if (users.has(+value))
                                result = new Result(true, users.get(+value));
                            else
                                result = new Result(false, "Not Found :(");
                        } else {
                            result = new Result(false, "ID must be integer!");
                        }
                    }
                } catch(e) {
                    result = new Result(false, "Invalid Parameter!");
                }

           //设置相应格式和中文
           response.writeHead(200,{"content-type":"text/plain;charset = utf-8"});
           //以JSON格式，往浏览器响应结果result
           response.write(JSON.stringify(result));

           //结束响应
           response.end();
});

//蒋婷请求端口
server.listen(8000,function(){
    console.log("Running ...")
});