
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
document.getElementById('formulario-agendamento').addEventListener('submit', async function (e) {
    e.preventDefault()

    //Pega os dados
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value
    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const tipo = document.getElementById('tipo').value

    const servico = document.getElementById('servico').value
    const servico2 = document.getElementById('servico2').value
    const servico3 = document.getElementById('servico3').value

    const plano = document.getElementById('plano').value

    //Tempos dos serviços
    const tempos = {
        "corte-social": 30,
        "corte-tesoura": 30,
        "corte-degrade": 40,
        "freestyle": 35,
        "corte-barba": 45,
        "corte-barba-sobrancelha": 60,
        "corte-barba-hidratacao": 55,
        "corte-barba-coloracao": 50,
        "barboterapia": 25,
        "sobrancelha": 10,
        "limpeza-facial": 25,
        "hidratacao-capilar": 25,
        "hidratacao-barba": 30,
        "pigmentacao": 45,
        "luzes-nevou": 60,
        "depilacao-ouvido": 30,
        "depilacao-nariz": 15,
        "selagem-capilar": 40
    }

    const nomeServicos = {
        "corte-social": "Corte Social",
        "corte-tesoura": "Corte na Tesoura",
        "corte-degrade": "Corte Degradê",
        "freestyle": "Freestyle",
        "corte-barba": "Corte + Barba",
        "corte-barba-sobrancelha": "Corte + Barba + Sobrancelha",
        "corte-barba-hidratacao": "Corte + Barba + Hidratação",
        "corte-barba-coloracao": "Corte + Barba + Coloração",
        "barboterapia": "Barboterapia",
        "sobrancelha": "Sobrancelha",
        "limpeza-facial": "Limpeza Facial",
        "hidratacao-capilar": "Hidratação Capilar",
        "hidratacao-barba": "Hidratação da Barba",
        "pigmentacao": "Pigmentação",
        "luzes-nevou": "Luzes + Nevou",
        "depilacao-ouvido": "Depilação de Ouvido",
        "depilacao-nariz": "Depilação de Nariz",
        "selagem-capilar": "Selagem Capilar"
    }

    const nomePlanos = {
        "corte-normal": "Corte Normal (Sem Plano) - Consulte Preço",
        "plano-corte-2": "Corte 2x ao Mês - R$ 60,00",
        "plano-corte-3": "Corte 3x ao Mês - R$ 90,00",
        "plano-corte-4": "Corte 4x ao Mês - R$ 110,00",
        "plano-corte-barba-2": "Corte e Barba 2x ao Mês - R$ 120,00",
        "plano-corte-barba-3": "Corte e Barba 3x ao Mês - R$ 160,00",
        "plano-corte-barba-4": "Corte e Barba 4x ao Mês - R$ 200,00"
    }

    let tempoTotal = 0

    tempoTotal += tempos[servico] || 0
    tempoTotal += tempos[servico2] || 0
    tempoTotal += tempos[servico3] || 0

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
        if (horaAgendamento < 8 || horaAgendamento > 21) {
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
    let mensagem = `Olá! Gostaria de agendar:

    %0A%0ANome: ${nome}
    %0AEmail: ${email}
    %0ATelefone: ${telefone}
    %0AData: ${data}
    %0AHora: ${hora}`

    if (tipo === 'plano') {
        mensagem += `
        %0APlano Escolhido: ${nomePlanos[plano]}`
    } else {
        mensagem += `
        %0AServiço 1: ${nomeServicos[servico]}
        %0AServiço 2: ${nomeServicos[servico2] || 'Nenhum'}
        %0AServiço 3: ${nomeServicos[servico3] || 'Nenhum'}
        %0ATempo estimado: ${tempoTotal} minutos`
    }

    

    try {
        const resposta = await fetch('http://localhost:3000/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                data,
                hora,
                servico: tipo === 'plano' ? nomePLanos[plano] : nomeServicos[servico],
                servico: tipo === 'plano' ? null : (nomeServicos[servico2] || null),
                servico: tipo === 'plano' ? null : (nomeServicos[servico3] || null)
            })
        })
        if (!resposta.ok) {
            throw new Error('Erro ao criar agendamento')
        }
        //Abre o Whats somente se o agendamento foi salvo com sucesso!
        window.open(`https://wa.me/55997254539?text=${mensagem}`, '_blank')

        alert('Agendamento realizado com sucesso!')

        this.reset()

    } catch (erro) {
        console.error(erro)
        alert('Erro ao realizar o agendamento. Tente novamente.')
    }
})