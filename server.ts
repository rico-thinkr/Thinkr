import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Reflector} from './lib/di/reflector';

/**
 * 服务器类
 */
export class Server {
    static  app = express();

    /**
     * 启动服务器
     */
    static Start(port:number){
        Server.app.use(bodyParser());
        Server.app.listen(port,()=>{
            console.log(`server start at ${port}!`);
        });
    }

    /**
     * 绑定路由器
     */
    static Routing(services:Array<any>){
        services.forEach((s,i)=>{
            var __find = Reflector.GetPropertyValue(s,'__findAll__');
            Server.app.route(__find.name).get(__find.func);
            var __create = Reflector.GetPropertyValue(s,'__create__');
            Server.app.route(__create.name).post(__create.func);
            var __delete = Reflector.GetPropertyValue(s,'__delete__');
            Server.app.route(__delete.name).post(__delete.func);
            var __update = Reflector.GetPropertyValue(s,'__update__');
            Server.app.route(__update.name).post(__update.func);
        })
    }
}
