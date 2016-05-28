
import {DB} from '../../db';
import {Reflector} from '../di/reflector';
import {ServiceConfig,PropDefination,Container} from '../common/definations';
/**
 *  属性装饰器.
 *  @return 无.
 *  @remarks 在声明实体类与属性时，给属性添加上装饰器，填入到全局的属性数组中进行保存.解析属性名，以及对应的元数据类型.
 *  @example
 *
 *      public class User{
 *
 *          @Property
 *          name:string;
 *
 *          @Property
 *          passowrd:string;
 *      }
 *
 *  __props  输出结果为： [{name:"name",type:"string"},{name:"password",type:"string"}]
 */
export function Property(target:any,k:string){
    var t = typeof(k).toString();
    var prop = {
        name: k,
        type: t
    };
    if (Container.__props.indexOf({name :k,type:t})===-1)
        Container.__props.push(prop); //生产属性列表
}


/**
 *  实体类装饰器.
 *  @remarks 将全局容器中的属性列表作为属性注入到当前的实体类的中.
 *           在注入完成后, 清除容器中的内容.
 *  @example
 *
 *  @Entity
 *  export class User{
 *
 *      @Property
 *      name:string;
 *      @Property
 *      password:string;
 *  }
 *  console.log(Object.getOwnPropertyNames(User));
 *
 *  @output:
 *  [ 'length', 'name', 'prototype', '__props', '__model' ]
 */
export function Entity(target){
    // 定义属性列表集合.
    Reflector.SetPropertyOrMethod(target,'__props',Container.__props);
    // 定义实体类与数据库文档的映射.
    var schema = new DB.Schema;
    // 循环遍历容器中的全部属性，并映射为数据库文档属性.
    Container.__props.forEach((p,i)=>{
        schema.path(p.name,p.type);
    });
    console.log(target.name);
    // 注册文档对象.
    var model= DB.Mongo.model(target.name,schema);
    // 定义文档对象属性.
    Reflector.SetPropertyOrMethod(target,'__model',model);

    // 清除容器的内容.
    Container.__props= [];

}


/**
 * 服务装饰器
 */
export function ServiceProvider(config:ServiceConfig){
    var entity = config.model;   // 实体类
    //设置controller的名称
    var _ctrlname = config.name===undefined?entity.name:config.name;
    //获取实体类所对应的数据模型
    var model = Reflector.GetPropertyValue(entity,"__model") ;
    //创建对应模型的操作对象

    var _findAll=(req,res)=>{
        var query=model.find(null);
        var promise = query.exec();
        __addback(req,res,promise);
    };

    var __update = (req,res)=>{
        var query = model.update({_id:req.body._id},req.body);
        var promise = query.exec();
        __addback(req,res,promise);

    }
    var __create =(req,res)=>{
        var promise =model.create(req.body);
        __addback(req,res,promise);
    }

    var __delete= (req,res)=>{
        var query = model.remove({_id:req.body._id});
        var promise = query.exec();
        __addback(req,res,promise);
    }

    var __addback=(req,res,promise)=>{
        promise.addBack((err,docs)=>{
            if (err){
                console.log(err);
                return res.json(err);
            }if (!docs)
            {
                console.log("not found");
                return res.json('not found!');
            }
            return res.json(docs);
        });
    }
    return (service)=>{
        // 给服务类添加默认的 CRUD 操作
        Reflector.SetPropertyOrMethod(service,'__findAll__',{
            name:`/${entity.name}/list`,func:_findAll
        });
        Reflector.SetPropertyOrMethod(service,'__create__',{
            name:`/${entity.name}/create`,func:__create
        });
        Reflector.SetPropertyOrMethod(service,'__update__',{
            name:`/${entity.name}/update`,func:__update
        });
        Reflector.SetPropertyOrMethod(service,'__delete__',{
            name:`/${entity.name}/delete`,func:__delete
        });
    }
}
