"use strict";
const mongoose = require('mongoose');
class DB {
    /**
     * 指定参数，连接数据库
     * @param server 服务器地址
     * @param dbname 数据库名称
     * @param port 端口
     * @param uid 帐号
     * @param pwd 密码
     */
    static ConnectDB(server, dbname, port, uid, pwd) {
        var _conStr = `mongodb://${server}` + (!(port === undefined) ? `:${port}` : ``) + `/${dbname}`;
        mongoose.connect(_conStr, (err, rs) => {
            if (err)
                console.error('ERROR:' + err.message);
            else
                console.log('db conected!');
        });
    }
    /**
     * 通过配置，连接数据库
     */
    static SetDB(config) {
        DB.ConnectDB(config.server, config.dbname, config.port, config.uid, config.password);
    }
    static Close() {
        mongoose.disconnect();
    }
}
DB.Schema = mongoose.Schema;
DB.Mongo = mongoose;
exports.DB = DB;
