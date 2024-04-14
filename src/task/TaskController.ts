import { Request, Response } from 'express';
import { sql } from '../../database/sql/sql';
import { iac } from '../../iac/iac';

    export interface Task {
    id:number;
    tag:string;
    instanceType:string;
    status:number;
    created:Date;
    updated:Date;
}
export class TaskController{
    private sql:sql;
    private iac:iac;

    constructor(sql: sql, iac: iac) {
        this.sql = sql;
        this.iac = iac;
    }

    async get(req: Request, res: Response) {
        const tasks : Task | null = await this.sql.findTaskById(Number(req.query.id));
        await this.sql.findTaskById(Number(req.query.id)).then((result:Task) => {
            return result;
        });
        return Promise.resolve(tasks);
    }

    async getAll(req: Request, res: Response) {
        return await Promise.resolve(this.sql.getAllTasks());
    }

    createTask(req: Request, res: Response) {
        const tasks = JSON.stringify(req.body);
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
