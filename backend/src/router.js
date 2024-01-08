const express = require('express');
const taskscontroller = require('./controllers/taskscontroller');

const router = express.Router();

const tasksMiddleware = require ('./middlewares/tasksMiddlewares')


router.get('/tasks', taskscontroller.getAll);
router.post('/tasks',tasksMiddleware.validateBody,taskscontroller.createTask);
router.delete('/tasks/:id', taskscontroller.deleteTask);
router.put('/tasks/:id', tasksMiddleware.validateBody, tasksMiddleware.validaFildsStatus,taskscontroller.updateTask);


module.exports = router;
 