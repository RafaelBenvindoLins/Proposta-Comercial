const baseURL = "http://127.0.0.1:5500"

function loginFirebase(email, senha){
    firebase 
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then(result =>{
        alert(`Bem vindo, ${JSON.stringify(result.user.email)}`)
        window.location.href = `${baseURL}/home.html`
    })
    .catch (error => {
        alert(`Erro ao efetuar o login: ${error.message}`)
    })
/*https://firebase.google.com/docs/auth/admin/errors */
.catch (error => {
    let messagemErro = ''
    switch(error.code) {
        case 'auth/invalid-email':
            mensagemErro = 'O email informado é invalido!'
            break;
        case 'auth/email-already-exists':
            mensagemErro = 'O email informado ja esta sendo utilizado!'
            break;
        default:
            mensagemErro = error.message    
    }
    alert(`Erro ao efetuar login!`)
})
}

/**
 * novo usuário
 * cria novo usuário no firebase
 * @param {string} email - email usuario
 * @param {string} senha - senha usuario
 * @return {object} - o usuario criado
 */

function NovoUsuario(email, senha) {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((result) => {
            alert(`Cadastrado, ${JSON.stringify(result.user.email)}`)
            window.location.href = `${baseURL}/home.html`
        })
        .catch(error => {
            let mensagem = '';

            switch (error.code) {
                case 'auth/invalid-email':
                    mensagem = 'O E-mail informado é inválido!'
                    break;
                case 'auth/email-already-in-use':
                    mensagem = 'O e-mail informado já está sendo utilizado!'
                    break;
                case 'auth/weak-password':
                    mensagem = 'Senha Invalida, Por favor insira 6 digitos!'
                    break;
                default:
                    mensagem = 'tente novamente!'
            }
            alert(`Não foi possivel cadastrar o usuário: ${mensagem}`)
            console.log(error.message);
        })
}
/**
 * verificaLogado
 * verifica se o usuario esta logado no sistema
 * @return {null}
 */
function verificaLogado(){
    firebase.auth().onAuthStateChanged(user =>{
        if(!user){
            console.log('Acesso Invalido. Redirecionando...')
            window.location.href = baseURL
        }
    })
}

function logout() {
    firebase
        .auth()
        .signOut()
        .then(function () {
            alert(`Saindo!`)
            window.location.href = baseURL
        })
        .catch(function (error) {
            alert(`Não foi possível sair de sua sessão \n Erro: ${error.message}`)
        });
}
