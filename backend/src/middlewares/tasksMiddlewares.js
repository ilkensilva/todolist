const validateBody = (request, response, next) => {
    const { body } = request;
    if (body.title == undefined) {
        return response.status(400).json({message: 'O Títtulo é obrigatório'});
    }
    if (body.title == '') {
       return response.status(400).json({message: 'O Títtulo não pode ser vázio'});
    }
    next();

};

const validaFildsStatus = (request, response, next) => {
    const { body } = request;
    if (body.status == undefined) {
        return response.status(400).json({message: 'O Títtulo é obrigatório'});
    }
    if (body.status == '') {
       return response.status(400).json({message: 'O Títtulo não pode ser vázio'});
    }
    next();

};





module.exports = {
    validateBody,
    validaFildsStatus,
};