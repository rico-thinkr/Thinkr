"use strict";
/**
 * 依赖注入类
 */
class Reflector {
    /**
     *  通过反射机制，将属性指定给对应的对象
     *  @param  object 需要注入属性的对象.
     *  @param  propertyKey 注入的属性的名称.
     *  @param  value   注入的属性的值.
     */
    static SetPropertyOrMethod(object, propertyKey, value) {
        if (Reflect.getOwnPropertyDescriptor(object, propertyKey) === undefined) {
            // 定义属性列表集合.
            Reflect.defineProperty(object, propertyKey, {
                value: value, enumerable: true, writable: true
            });
        }
        else {
            throw new Error(typeof (value) === "Function" ? `Function` : `Property` + `"${propertyKey} has been set to "${object.name}" already`);
        }
    }
    /**
     *  获得指定对象的全部属性名称
     */
    static GetPropertyNames(object) {
        return Object.getOwnPropertyNames(object);
    }
    /**
     *  获取指定对象的制定属性的值
     */
    static GetPropertyValue(object, propertyKey) {
        if (Reflect.getOwnPropertyDescriptor(object, propertyKey) === undefined) {
            throw new Error(`Can not get property "${propertyKey}" of target "${object.name}"`);
        }
        return Object.getOwnPropertyDescriptor(object, propertyKey).value;
    }
    /**
     *  传递方法，和参数，执行此方法
     */
    static Execute(func, thisArgs, argList) {
        if (thisArgs === undefined)
            thisArgs = null;
        if (argList === undefined)
            argList = [];
        Reflect.apply(func, thisArgs, argList);
    }
}
exports.Reflector = Reflector;
