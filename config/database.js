const { Pool } = require("pg")

const pool = new Pool ({ //cria uma nova conexão usando essa clase new Pool
    user: "postgres",
    host: "localhost",
    database: "barbershop_manager",
    password: "2005pb",
    port: 5432
})

module.exports = pool