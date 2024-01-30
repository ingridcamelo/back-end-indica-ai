const express = require("express")

const app = express()
const porta = 3003

function mostraPorta(){
    console.log("Servidor rodando na porta", porta)
}

app.listen(porta, mostraPorta)