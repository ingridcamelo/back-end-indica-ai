const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBD() {
   try{
    console.log('Conexão com banco de dados iniciou.')
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Conexão com banco de dados realizada com sucesso.')
} catch(erro) {
    console.log(erro)
}
}

module.exports = conectaBD
