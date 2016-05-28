"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const server_1 = require('../server');
const db_1 = require('../db');
const decorators_1 = require('../lib/restful/decorators');
db_1.DB.ConnectDB('127.0.0.1', 'thinkr');
server_1.Server.Start(3000);
let User = class User {
};
__decorate([
    decorators_1.Property, 
    __metadata('design:type', String)
], User.prototype, "name", void 0);
__decorate([
    decorators_1.Property, 
    __metadata('design:type', String)
], User.prototype, "password", void 0);
User = __decorate([
    decorators_1.Entity, 
    __metadata('design:paramtypes', [])
], User);
exports.User = User;
let Grade = class Grade {
};
__decorate([
    decorators_1.Property, 
    __metadata('design:type', String)
], Grade.prototype, "name", void 0);
Grade = __decorate([
    decorators_1.Entity, 
    __metadata('design:paramtypes', [])
], Grade);
exports.Grade = Grade;
let UserService = class UserService {
};
UserService = __decorate([
    decorators_1.ServiceProvider({
        model: User
    }), 
    __metadata('design:paramtypes', [])
], UserService);
let GradeService = class GradeService {
};
GradeService = __decorate([
    decorators_1.ServiceProvider({
        model: Grade
    }), 
    __metadata('design:paramtypes', [])
], GradeService);
server_1.Server.Routing([UserService, GradeService]);
