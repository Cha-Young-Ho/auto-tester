import { Request, Response } from 'express';
import { MysqlError, PoolConnection } from 'mysql';
import { DBType } from '../db/db.type';
import { dbFunction } from '../db/db.fuction';


export class TaskController{

    async get(req: Request, res: Response) {
        const tasks = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
        const connection = await dbFunction.getConnection(DBType.MYSQL) as PoolConnection;
        const query = 'SELECT * FROM test';
        this.executeQuery(connection, query)
            .then((results: any) => {
                console.log('Query results:', results);
            })
            .catch((error: any) => {
                console.error('Error:', error);
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
    executeQuery(connection: PoolConnection, query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}
