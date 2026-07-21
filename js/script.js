
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
        return;
    }

    //Valida planos/serviços
    if (tipo === 'servico') {
        const servico = document.getElementById('servico').value
        if (!servico) {
            alert('Por favor, escolha um serviço!')
            return;
        }
    } else if (tipo === 'plano') {
        const plano = document.getElementById('plano').value
        if (!plano) {
            alert('Por favor, escolha um plano')
            return;
        }
    }

    //Mensagem do WhatsApp
    const opcaoServico = tipo === 'servico' ? servico : plano
    const mensagem = `Olá! Gostaria de agendar:%0A%0ANome: ${nome}%0AEmail: ${email}%0ATelefone: ${telefone}%0AData: ${data}%0AHora: ${hora}%0AServiço: ${opcaoServico}`

    window.open(`https://wa.me/55997254539?text=${mensagem}`, '_blank')

    //Mostra a mensagem, que deu certo o agendamento
    alert('Agendamento realizado com sucesso! ')

    //Clean Forms
    this.reset();
})