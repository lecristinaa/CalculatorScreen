import { auth } from '../firebase' 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth' 

// Função para criar uma nova conta de usuário
async function createNewAccount(userCredentials) {
    try {
        // Tenta criar uma nova conta com o email e a senha fornecidos
        const response = await createUserWithEmailAndPassword(
            auth,
            userCredentials.email,
            userCredentials.password
        )
        console.log('Conta criada com sucesso:', response.user) // Loga o usuário criado
        return response.user // Retorna o usuário criado
    } catch (error) {
        console.error('Erro ao criar conta:', error.message) // Loga o erro em caso de falha
    }
}

// Função para fazer login com email e senha
async function loginWithEmailAndPassword(userCredentials) {
    try {
        // Tenta autenticar o usuário com o email e a senha fornecidos
        const response = await signInWithEmailAndPassword(
            auth,
            userCredentials.email,
            userCredentials.password
        )
        console.log('Login bem-sucedido:', response.user) // Loga o usuário autenticado
        return response.user // Retorna o usuário autenticado
    } catch (error) {
        console.error('Erro no login:', error.message) // Loga o erro em caso de falha
    }
}


export { createNewAccount, loginWithEmailAndPassword }
