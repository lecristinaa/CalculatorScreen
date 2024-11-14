import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { getAuth } from 'firebase/auth'
import { Picker } from '@react-native-picker/picker'
import * as Notifications from 'expo-notifications'
import styles from '../constants/styles/stylesHome'

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState({
    lazer: 0,
    alimentacao: 0,
    viagem: 0,
    transporte: 0,
  });

  const [newExpense, setNewExpense] = useState({
    category: '',
    value: '',
  });

  const auth = getAuth();  // Obter o auth atual
  const userId = auth.currentUser?.uid;  // Pegar o userId do usuário logado

  // Estado para o token de push notification
  const [expoPushToken, setPushToken] = useState('');

  // Solicitar permissão e configurar o token para notificações
  useEffect(() => {
    const getPushToken = async () => {
      try {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: 'ad2f7514-61c8-4645-aeeb-3563cdfc2eec'
        });
        setPushToken(token.data);
        console.log('Token de Push:', token.data);
      } catch (error) {
        console.error('Erro ao obter token de push:', error);
      }
    };

    getPushToken();
  }, []);

  // Função para enviar a notificação
  const sendNotification = async () => {
    if (!expoPushToken) return;

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: expoPushToken, // Seu token
        sound: 'default',
        title: 'Novo Gasto',
        body: 'Um novo gasto foi registrado em seu aplicativo.',
        data: { someData: 'goes here' },
      }),
    });
  }
    

  // Função para atualizar o gasto e enviar a notificação
  const handleUpdateExpense = () => {
    if (!newExpense.category || !newExpense.value) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Atualizar o gasto na categoria específica
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [newExpense.category]: prevExpenses[newExpense.category] + parseFloat(newExpense.value),
    }));

    // Enviar a notificação
    sendNotification();

    // Limpar os campos
    setNewExpense({ category: '', value: '' });

    Alert.alert('Sucesso', 'Gasto atualizado com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.expenseCalculatorContainer}>
        <Text style={styles.title}>Calculadora de Gastos</Text>

        <View style={styles.cardContainer}>
          <View style={[styles.card, { backgroundColor: '#3F2A77'}]}>
            <Text style={styles.cardTitle}>Lazer</Text>
            <Text style={styles.cardValue}>{expenses.lazer}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: '#7E57C2'}]}>
            <Text style={styles.cardTitle}>Alimentação</Text>
            <Text style={styles.cardValue}>{expenses.alimentacao}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: '#4A148C'}]}>
            <Text style={styles.cardTitle}>Viagem</Text>
            <Text style={styles.cardValue}>{expenses.viagem}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: '#5E35B1'}]}>
            <Text style={styles.cardTitle}>Transporte</Text>
            <Text style={styles.cardValue}>{expenses.transporte}</Text>
          </View>
        </View>

        <Picker
          selectedValue={newExpense.category}
          onValueChange={(itemValue) => setNewExpense({ ...newExpense, category: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Selecione a categoria" value="" />
          <Picker.Item label="Lazer" value="lazer" />
          <Picker.Item label="Alimentação" value="alimentacao" />
          <Picker.Item label="Viagem" value="viagem" />
          <Picker.Item label="Transporte" value="transporte" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="numeric"
          value={newExpense.value}
          onChangeText={(value) => setNewExpense({ ...newExpense, value })}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdateExpense}>
          <Text style={styles.buttonText}>Adicionar Gasto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.footerButtonText}>Calculadora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Graph', { expensesData: expenses })}>
          <Text style={styles.footerButtonText}>Gráficos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
