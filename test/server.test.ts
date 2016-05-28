
import {Server} from '../server';
import {DB} from '../db';
import {Property,Entity,ServiceProvider} from '../lib/restful/decorators';
DB.ConnectDB('127.0.0.1','thinkr');

Server.Start(3000);

@Entity
export class User{
    @Property
    name:string;
    @Property
    password:string;
}

@Entity
export class Grade{
    @Property
    name:string;
}


@ServiceProvider({
    model:User
})
class UserService {}


@ServiceProvider({
    model:Grade
})
class GradeService {}

Server.Routing([UserService,GradeService]);
