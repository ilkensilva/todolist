const tasksmodel = require('../models/taksmodel');

const getAll = async (_request, response) => {
    const tasks = await tasksmodel.getAll();
    return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
    const createdTask = await tasksmodel.createTask(request.body);
    return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
const {id} = request.params;
await tasksmodel.deleteTask(id);
return response.status(204).json();
}

const updateTask = async (request, response) => {
    const {id} = request.params;
    await tasksmodel.updateTask(id,request.body);
    return response.status(204).json();

}



module.exports = {
    getAll, 
    createTask,deleteTask,updateTask,
};
