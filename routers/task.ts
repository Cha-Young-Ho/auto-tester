// routes/task.ts

import express from 'express';
import { TaskController } from '../src/task/TaskController';
import { generateResponse } from '../util/routerUtil';

const router = express.Router();
const taskController = new TaskController();

function handleRequest(req: express.Request, res: express.Response, taskPromise: Promise<any>) {
    taskPromise
        .then(task => {
            generateResponse(task, req, res);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
}

router.get('/', (req, res) => {
    handleRequest(req, res, taskController.get(req, res));
});

router.get('/list/current', (req, res) => {
    handleRequest(req, res, taskController.getAllCurrent(req, res));
});

router.get('/list', (req, res) => {
    handleRequest(req, res, taskController.getAll(req, res));
});

router.post('/', (req, res) => {
    handleRequest(req, res, taskController.createTask(req, res));
});

router.post('/', (req, res) => {
    handleRequest(req, res, taskController.updateTask(req, res));
});

export default router;
