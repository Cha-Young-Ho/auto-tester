import { Request, Response } from 'express';
import { sql } from '../../database/sql/sql';

interface Task {
    id:number;
    name:string;
    age:number;
}
export class TaskController{
    private sql:sql;

    constructor(sql: sql) {
        this.sql = sql;
    }

    async get(req: Request, res: Response) {
        const tasks : Task | null = await this.sql.findTaskById(Number(req.query.id));
        const b : Task | null = await this.sql.findTaskById(Number(req.query.id)).then((result:Task) => {
            console.log(JSON.stringify(result));
            console.log('a : ' + JSON.stringify(result.age));
            return result;
        });
        
        
        
        return Promise.resolve(tasks);
    }

    getAll(req: Request, res: Response) {
        const tasks = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
        return Promise.resolve(JSON.stringify(tasks));
    }

    createTask(req: Request, res: Response) {
        const tasks = JSON.stringify(req.body);
        console.log('tasks : ' + JSON.stringify(tasks));
        return Promise.resolve(tasks);
    }

    updateTask(req: Request, res: Response) {
        const tasks = [{ id: 1, name: 'updateTask 1' }, { id: 2, name: 'Task 2' }];
        return Promise.resolve(tasks);
    }

    getAllCurrent(req: Request, res: Response) {
        const tasks = [{ id: 1, name: 'getAllCurrent 1' }, { id: 2, name: 'Task 2' }];
        return Promise.resolve(tasks);
    }
    // executeQuery(connection: PoolConnection, query: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         connection.query(query, (error, results, fields) => {
    //             if (error) {
    //                 reject(error);
    //             } else {
    //                 resolve(results);
    //             }
    //         });
    //     });
    // }
}
