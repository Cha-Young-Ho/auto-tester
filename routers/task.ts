// routes/task.ts

import express from 'express';
import { TaskController } from '../src/task/TaskController';
import { handleRequest } from '../util/routerUtil';

const router = express.Router();
const taskController = new TaskController();

router.get('/', (req, res) => {
    handleRequest(req, res, taskController.get(req, res));
});

router.get('/list/current', (req, res) => {
    handleRequest(req, res, taskController.getAllCurrent(req, res));
});

router.get('/list', (req, res) => {
    handleRequest(req, res, taskController.getAll(req, res));
}); `              `

router.post('/', (req, res) => {
    const tasks = taskController.createTask(req, res);
    res.redirect('/task/list');
});

router.post('/', (req, res) => {
    handleRequest(req, res, taskController.updateTask(req, res));
});

export default router;
