const express = require('express')
const router = express.Router()
const cors = require('cors')
const conectaBD = require('./bancoDeDados')
conectaBD()

const Livros = require('./livrosModel')

const app = express()
app.use(express.json())
app.use(cors())
const porta = 3003

async function mostraLivro(request, response) {
    try {
        const livrosSalvos = await Livros.find()
        response.json(livrosSalvos)
    } catch (erro) {
        console.log(erro)
    }
}

async function criaLivro(request, response) {
    const novoLivro = new Livros({
        nome: request.body.nome,
        autor: request.body.autor,
        ano: request.body.ano,
        imagem: request.body.imagem,
        motivo: request.body.motivo,
    })
    try {
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)
    } catch (erro) {
        console.log(erro)
    }

}

async function corrigeLivro(request, response) {
    try {
        const livroEncontrado = await Livros.requestbyId(request.params.id)
        if (request.body.nome) {
            livroEncontrado.nome = request.body.nome
        }
        if (request.body.autor) {
            livroEncontrado.autor = request.body.autor
        }
        if (request.body.ano) {
            livroEncontrado.ano = request.body.ano
        }
        if (request.body.imagem) {
            livroEncontrado.imagem = request.body.imagem
        }
        if (request.body.motivo) {
            livroEncontrado.motivo = request.body.motivo
        }

        const livroAtualizado = await livroEncontrado.save()
        response.json(livroAtualizado)

    } catch (erro) {
    console.log(erro)
    }
}

async function deletaLivro(request, response) {
    try { await Livros.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Livro deletado com sucesso.' })
    } catch (erro) {
        console.log(erro)
    }
}

function mostraPorta() {
    console.log("Servidor rodando na porta", porta)
}

app.use(router.get('/livros', mostraLivro))
app.use(router.post('/livros', criaLivro))
app.use(router.patch('/livros/:id', corrigeLivro))
app.use(router.delete('/livros/:id', deletaLivro))
app.listen(porta, mostraPorta())