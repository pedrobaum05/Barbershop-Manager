const express = require("express")
const cors =    require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const agendamentosRoutes = require("./routes/agendamentos")

const pool = require("./config/database")

pool.query("SELECT NOW()")
    .then(() => console.log("PostgreSQL conectado!"))
    .catch(err => console.error("Erro", err))

const PORT = 3000

app.get("/", (req, res) => {
    res.send("API Barbershop Manager funcionando!")
})

app.use("/agendamentos", agendamentosRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})