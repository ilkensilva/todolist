const app = require('./app');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3333;
dotenv.config();

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
