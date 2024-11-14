import { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native'
import InputField from '../components/Input'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import styles from '../constants/styles/styles'

export default function SignUpScreen({ navigation }) {
  // Estado para armazenar os dados do usuário
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  // Função de cadastro do usuário
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
      console.log('Cadastro bem-sucedido:', userCredential.user)

      Alert.alert('Sucesso', 'Conta criada com sucesso!')
      navigation.navigate('Login') // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro no cadastro:', error.message)
      Alert.alert('Erro', error.message)
    }
  }

  // Função para atualizar os campos de entrada
  const handleInputChange = (field, value) => {
    setUser((prevState) => ({ ...prevState, [field]: value }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signUpContainer}>
        <Text style={styles.title}>Cadastro</Text>
        
        <InputField
          value={user.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Nome Completo"
        />
        <InputField
          value={user.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          placeholder="Email"
        />
        <InputField
          value={user.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          keyboardType="phone-pad"
          placeholder="Telefone"
        />
        <InputField
          value={user.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
          placeholder="Senha"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>Já tem uma conta? Faça login!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
