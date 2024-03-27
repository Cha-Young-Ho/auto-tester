import { Request, Response } from 'express';

export class TaskController{

    get(req: Request, res: Response) {
        const tasks = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
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
}