
//testes de console f12
console.log(document.getElementById('tipo'))
console.log(document.getElementById('servicos-avulsos'))
console.log(document.getElementById('planos-mensais'))


// ===== MOSTRA/ESCONDE SELECTS =====
document.getElementById('tipo').addEventListener('change', function () {

    const tipo = this.value
    const servicosAvulsos = document.getElementById('servicos-avulsos')
    const planosMensais = document.getElementById('planos-mensais')

    if (tipo === 'servico') {
        servicosAvulsos.style.display = 'block'
        planosMensais.style.display = 'none'

    } else if (tipo === 'plano') {
        servicosAvulsos.style.display = 'none'
        planosMensais.style.display = 'block'

    } else {
        servicosAvulsos.style.display = 'none'
        planosMensais.style.display = 'none'
    }

})

// ===== SUBMETER FORMULÁRIO =====
document.getElementById('formulario-agendamento').addEventListener('submit', function (e) {
    e.preventDefault()

    //Pega os dados
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value
    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const tipo = document.getElementById('tipo').value

    //Valida os campos obrigatórios
    if (!nome || !email || !telefone || !data || !hora || !tipo) {
        alert('Por favor, preencha todos os campos obrigatórios')
        return
    }

    // ===== VALIDAÇÃO DOS HORÁRIOS DE ATENDIMENTO =====
    const dataObj = new Date(data + 'T00:00:00')
    const diaSemana = dataObj.getDay()

    if (!hora) {
        alert('Por favor, selecione um horário!')
        return
    }

    const horaAgendamento = parseInt(hora.split(':')[0])

    // Domingo - Fechado
    if (diaSemana === 0) {
        alert('Barbearia fechada no domingo!')
        return
    }

    //Segunda a sexta 8h-21h
    if (diaSemana >= 1 && diaSemana <= 5) {
        if (horaAgendamento < 8 || horaAgendamento >= 21) {
            alert('Atendimento seg-sexta: 8h ás 21h')
            return
        }
    }

    //Sábado 08h-17h
    if (diaSemana === 6) {
        if (horaAgendamento < 8 || horaAgendamento >= 17) {
            alert('Atendimento sábado: 8h ás 17h')
            return
        }
    }

    //Valida planos/serviços
    let opcaoServico = 'Não especificado'

    if (tipo === 'servico') {
        opcaoServico = document.getElementById('servico').value
        if (!opcaoServico) {
            alert('Por favor, escolha um serviço!')
            return
        }

    } else if (tipo === 'plano') {
        opcaoServico = document.getElementById('plano').value
        if (!opcaoServico) {
            alert('Por favor, escolha um plano')
            return
        }

    }

    //Mensagem do WhatsApp
    const mensagem = `Olá! Gostaria de agendar:%0A%0ANome: ${nome}%0AEmail: ${email}%0ATelefone: ${telefone}%0AData: ${data}%0AHora: ${hora}%0AServiço: ${opcaoServico}`

    window.open(`https://wa.me/55997254539?text=${mensagem}`, '_blank')

    //Mostra a mensagem, que deu certo o agendamento
    alert('Agendamento realizado com sucesso! ')

    //Clean Forms
    this.reset()
})