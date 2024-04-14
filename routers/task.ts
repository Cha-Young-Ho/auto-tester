// routes/task.ts

import express from 'express';
import { TaskController } from '../src/task/TaskController';
import { handleRequest } from '../util/routerUtil';
import { mysqlImpl } from '../database/sql/mysql';
import { terraform } from '../iac/terraform';

const router = express.Router();
const taskController = new TaskController(mysqlImpl, terraform);

router.get('/', (req, res) => {
    handleRequest(req, res, taskController.get(req, res));
});

router.get('/list/current', (req, res) => {
    handleRequest(req, res, taskController.getAllCurrent(req, res));
});

router.get('/list', async (req, res) => {
    const result = await taskController.getAll(req, res);
    handleRequest(req, res, Promise.resolve(result));
});

router.post('/', (req, res) => {
    const tasks = taskController.createTask(req, res);
    res.redirect('/task/list');
});

router.post('/', (req, res) => {
    handleRequest(req, res, taskController.updateTask(req, res));
});

export default router;
