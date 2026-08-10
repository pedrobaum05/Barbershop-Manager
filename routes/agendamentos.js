//Rotas
const express = require("express")

const router = express.Router()

const {
    criarAgendamento,
    listarAgendamentos,
    atualizarAgendamento,
    excluirAgendamento
} = require("../controllers/agendamentoController")

router.post("/", criarAgendamento)

router.get("/", listarAgendamentos)

router.put("/:id", atualizarAgendamento)

router.delete("/:id", excluirAgendamento)

module.exports = router 