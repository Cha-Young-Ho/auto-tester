// // routes/task.ts

// import express from 'express';
// import { TaskController } from '../src/task/TaskController';
// import { handleViewFile } from '../util/routerUtil';

// const router = express.Router();
// const taskController = new TaskController();

// router.get('/task', (req, res) => {
//     handleViewFile(req, res, taskController.get(req, res));
// });

// router.get('/list/current', (req, res) => {
//     handleViewFile(req, res, taskController.getAllCurrent(req, res));
// });

// router.get('/list', (req, res) => {
//     handleViewFile(req, res, taskController.getAllCurrent(req, res));
// });

// router.post('/', (req, res) => {
//     handleViewFile(req, res, taskController.createTask(req, res));
// });

// router.post('/', (req, res) => {
//     handleViewFile(req, res, taskController.updateTask(req, res));
// });

// export default router;
