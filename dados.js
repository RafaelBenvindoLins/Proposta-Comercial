/**
 * Salvar
 * Salva os dados do formulario na collection do firebase
 * @param {object} event - Evento do Objeto que foi clicado
 * @param {string} collection - Nome da collection que será salva no firebase
 * @return {null} - Snapshot atualizando os dados
 */
function salvar(event, collection){
    event.preventDefault() //Evita que o formulario seja recarregado
    //Verificando os campos obrigatórios
    if(document.getElementById('selectbasic').value ==='') { alert('O campo Seguimentos é obrigatorio!!')}
    else if (document.getElementById('funcao').value === '') {alert('O campo Função é obrigatorio!!!')}
    else if (document.getElementById('Quantidade').value === '') {alert('O campo Quantidade é obrigatorio!!!')}
    else {incluir(event, collection)}
}
/*function incluir(event, collection){
    event.preventDefault() //Evita que o formulario seja recarregado
    //Obtendo os campos do Formulário
    const form = document.forms[0]
    const data = new FormData(form)
    //Obtendo os valores dos campos
    const values = Object.fromEntries(data.entries())
    // console.log(`Os dados são:`)
    // console.log(values)
    // O retornoé uma promisse (Promessa)
    return loginFirebase.database().ref(collection).push(values)
        .then(() => {
            alert('Registro Cadastrado com sucesso!!!')
            document.getElementById('formCadastro').reset() // Limpar formulário
        }) 
        .catch(error => {
            console.error(`Ocorreu um erro: ${Error.code}-${error.message}`)
            alert(`Falha ao Incluir: ${error.message}`)
        })
}
*/
function incluir(event, collection) {
    event.preventDefault()
    const form = document.forms[0]
    const data = new FormData(form)
    const values = Object.fromEntries(data.entries())
    return firebase.database().ref(collection).push(values)
        .then(() => {
            alert('✔ Produto cadastrado com sucesso!')
            document.getElementById('formCadastro').reset() 
        })
        .catch(error => {
            console.error(`Ocorreu um erro: ${error.code}-${error.message}`)
            alert(`❌ Falha ao incluir: ${error.message}`)
        })
}
/**
 * Obtem dados
 * Obtem os dados da collection a partir do firebase
 * @param {string} collection - Nome da collection no firebase
 * @param {object} - Uma tabela com os dados obtidos
 */
function obtemDados(collection){
    var tabela = document.getElementById('tabelaDados')
    firebase.database().ref(collection).on('value', (snapshot) => {
        tabela.innerHTML = ''
        let cabecalho = tabela.insertRow()
        cabecalho.className = 'table-info'
        cabecalho.insertCell().textContent = 'Seguimento'
        cabecalho.insertCell().textContent = 'Serviços'
        cabecalho.insertCell().textContent = 'Jornada de Trabalho'
        cabecalho.insertCell().textContent = 'função'
        cabecalho.insertCell().textContent = 'Quantidade'
        cabecalho.insertCell().textContent = 'Opções'

        snapshot.forEach(item => {
            //Dados Firebase
            let db = item.ref.path.pieces_[0] //Collection
            let id = item.ref.path.pieces_[1] //id
            let registro = JSON.parse(JSON.stringify(item.val()))
            //Criando as novas linahas na tabela
            let novalinha = tabela.insertRow()
            novalinha.insertCell().textContent = item.val().selectbasic
            novalinha.insertCell().textContent = item.val().Servicos
            novalinha.insertCell().textContent = item.val().JornadaTrabalho
            novalinha.insertCell().textContent = item.val().funcoes
            novalinha.insertCell().textContent = item.val().Quantidade
            novalinha.insertCell().innerHTML =
                `
            <button class ='btn btn-danger' title='Remove o registro' onclick=remover('${db}','${id}')>🗑 Excluir </button>
            <button class ='btn btn-primary' title='Edita o registro' onclick=carregaDadosAlteracao('${db}','${id}')>✏ Editar </button>
            `
        });

        let rodape = tabela.insertRow()
        rodape.className = 'table-success'
        rodape.insertCell().textContent = ''
        rodape.insertCell().textContent = ''
        rodape.insertCell().textContent = ''
        rodape.insertCell().innerHTML = totalRegistros(collection)
        rodape.insertCell().textContent = ''
        rodape.insertCell().textContent = ''
    })
}



function totalRegistros(collection) {
    var retorno = '...'
    firebase.database().ref(collection).on('value', (snapshot) => {
        if (snapshot.numChildren() === 0) {
            retorno = 'Nenhuma proposta cadastrada!'
        } else {
            retorno = `Total de Registros: ${snapshot.numChildren()}`
        }
    })
    return retorno
}

function remover(db, id) {
    if (window.confirm('Excluir Produto?')) {
        let dadoExclusao = firebase.database().ref().child(db + '/' + id)
        dadoExclusao.remove()
            .then(() => {
                alert('✅Produto removido com sucesso!')
            })
            .catch(error => {
                alert('❌Falha ao excluir: ' + error.message)
            })
    }
}

function carregaDadosAlteracao(db, id) {
    firebase.database().ref(db).on('value', (snapshot) => {
        snapshot.forEach(item => {
            if (item.ref.path.pieces_[1] === id) {
                document.getElementById('id').value = item.ref.path.pieces_[1]
                document.getElementById('selectbasic').value = item.val().selectbasic
                document.getElementById('Servicos').value = item.val().Servicos
                document.getElementById('JornadaTrabalho').value = item.val().JornadaTrabalho
                document.getElementById('funcoes').value = item.val().funcoes
                document.getElementById('JornadaTrabalho').value = item.val().Quantidade
            }
        })
    })
}



