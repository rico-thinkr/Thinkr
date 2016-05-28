"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const reflector_1 = require('./lib/di/reflector');
/**
 * 服务器类
 */
class Server {
    /**
     * 启动服务器
     */
    static Start(port) {
        Server.app.use(bodyParser());
        Server.app.listen(port, () => {
            console.log(`server start at ${port}!`);
        });
    }
    /**
     * 绑定路由器
     */
    static Routing(services) {
        services.forEach((s, i) => {
            var __find = reflector_1.Reflector.GetPropertyValue(s, '__findAll__');
            Server.app.route(__find.name).get(__find.func);
            var __create = reflector_1.Reflector.GetPropertyValue(s, '__create__');
            Server.app.route(__create.name).post(__create.func);
            var __delete = reflector_1.Reflector.GetPropertyValue(s, '__delete__');
            Server.app.route(__delete.name).post(__delete.func);
            var __update = reflector_1.Reflector.GetPropertyValue(s, '__update__');
            Server.app.route(__update.name).post(__update.func);
        });
    }
}
Server.app = express();
exports.Server = Server;
