import { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native'
import InputField from '../components/Input'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import styles from '../constants/styles/styles'

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    try {
      // Exibir os dados que estão sendo usados para fazer login
      console.log('Tentando fazer login com:', user.email, user.password);
      
      const response = await signInWithEmailAndPassword(auth, user.email, user.password);
      console.log('Login bem-sucedido:', response.user);
      navigation.navigate('Home');
    } catch (error) {
      // Exibindo a mensagem de erro
      console.error('Erro no login:', error.message);
      Alert.alert('Erro', error.message);
      
      // Caso o erro seja "senha incorreta", exibir mensagem específica
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Erro', 'Senha incorreta. Tente novamente.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Erro', 'E-mail não encontrado.');
      } else {
        Alert.alert('Erro', 'Erro desconhecido. Tente novamente mais tarde.');
      }
    }
  };

  const handleInputChange = (field, value) => {
    setUser(prevState => ({ ...prevState, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signUpContainer}>
        <Text style={styles.title}>Login</Text>

        <InputField
          value={user.email}
          onChangeText={value => handleInputChange('email', value)}
          keyboardType="email-address"
          placeholder="Email"
        />
        <InputField
          value={user.password}
          onChangeText={value => handleInputChange('password', value)}
          secureTextEntry
          placeholder="Senha"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.text}>Não possui uma conta? Faça seu cadastro!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
