//Lógica do Create
const pool = require("../config/database")

const criarAgendamento = async (req, res) => {
    const { nome, data, hora, servico } = req.body

    const resultado = await pool.query(
        `INSERT INTO agendamentos (nome, data, hora, servico)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [nome, data, hora, servico]
    )

    res.status(201).json(resultado.rows[0])
}

const listarAgendamentos = async (req, res) => {
    const resultado = await pool.query(
        "SELECT * FROM agendamentos ORDER BY id"
    )

    res.json(resultado.rows)
}

const atualizarAgendamento = async (req, res) => {
    const { id } = req.params
    const { nome, data, hora, servico } = req.body

    const resultado = await pool.query(
        `UPDATE agendamentos
        SET nome = $1, data = $2, hora = $3, servico = $4
        WHERE id = $5
        RETURNING *`,
        [nome, data, hora, servico, id]
    )

    if (resultado.rows.length === 0) {
        return res.status(404).json({
            mensagem: "Agendamento não encontrado"
        })
    }
    res.json(resultado.rows[0])
}

const excluirAgendamento = async (req, res) => {
    const { id } = req.params

    const resultado = await pool.query(
        "DELETE FROM agendamentos WHERE id = $1 RETURNING *",
        [id]
    )

    if (resultado.rows.length === 0) {
        return res.status(404).json({
            mensagem: "Agendamento não encontrado"
        })
    }

    res.json({
        mensagem: "Agendamento excluído com sucesso!",
        agendamento: resultado.rows[0]
    })
}

module.exports = {
    criarAgendamento,
    listarAgendamentos,
    atualizarAgendamento,
    excluirAgendamento
}