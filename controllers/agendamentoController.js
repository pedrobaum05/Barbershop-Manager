//Lógica do Create
const pool = require("../config/database")

const criarAgendamento = async (req, res) => {
    try {
        const { nome, data, hora, servico, servico2, servico3 } = req.body

        const verificar = await pool.query(
            'SELECT * FROM agendamentos WHERE data = $1 AND hora = $2',
            [data, hora]
        )

        if (verificar.rows.length > 0) {
            return res.status(409).json({
                erro: 'Esse horário já está agendado!'
            })
        }

        const resultado = await pool.query(
            `INSERT INTO agendamentos
            (nome, data, hora, servico, servico2, servico3)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [nome, data, hora, servico, servico2, servico3]
        )

        res.status(201).json(resultado.rows[0])

    } catch (erro) {
        console.error(erro)
        res.status(500).json({ erro: 'Erro ao criar agendamento' })
    }

}

const listarAgendamentos = async (req, res) => {
    const resultado = await pool.query(`
        SELECT
        id,
        nome,
        TO_CHAR(data, 'YYYY-MM-DD') AS data,
        TO_CHAR(hora, 'HH24:MI') AS hora,
        servico,
        servico2,
        servico3
        FROM agendamentos
        ORDER BY id
        `

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