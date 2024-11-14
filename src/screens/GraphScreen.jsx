import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import styles from '../constants/styles/stylesGraph'

const screenWidth = Dimensions.get('window').width;

export default function GraphScreen({ navigation, route }) {
  // Recebe os dados de gastos passados pela HomeScreen
  const { expensesData } = route.params;

  // Dados para o gráfico de barras
  const barData = {
    labels: ['Lazer', 'Alimentação', 'Viagem', 'Transporte'],
    datasets: [
      {
        data: [
          expensesData.lazer,
          expensesData.alimentacao,
          expensesData.viagem,
          expensesData.transporte,
        ],
      },
    ],
  }

  // Dados para o gráfico de pizza
  const pieData = [
    {
      name: 'Lazer',
      population: expensesData.lazer,
      color: '#3F2A77', 
      legendFontColor: '#5E17EB',
      legendFontSize: 12,
    },
    {
      name: 'Alimentação',
      population: expensesData.alimentacao,
      color: '#7E57C2', 
      legendFontColor: '#5E17EB',
      legendFontSize: 12,
    },
    {
      name: 'Viagem',
      population: expensesData.viagem,
      color: '#4A148C', 
      legendFontColor: '#5E17EB',
      legendFontSize: 12,
    },
    {
      name: 'Transporte',
      population: expensesData.transporte,
      color: '#5E35B1', 
      legendFontColor: '#5E17EB',
      legendFontSize: 12,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.expenseGraphContainer}>
            <Text style={styles.title}>Gráficos de Gastos</Text>

            {/* Gráfico de Barras */}
            <View style={styles.chartContainer}>
                <BarChart
                    data={barData}
                    width={screenWidth - 40}
                    height={220}
                    yAxisLabel="$"
                    chartConfig={{
                        backgroundColor: '#FFFFFF',
                        backgroundGradientFrom: '#EAE8FF',
                        backgroundGradientTo: '#EAE8FF',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(94, 23, 235, ${opacity})`, 
                        labelColor: (opacity = 1) => `rgba(94, 23, 235, ${opacity})`, 
                        style: {
                            borderRadius: 16,
                            
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#5E17EB', 
                        },
                    }}
                    style={{
                        marginVertical: 15,
                        borderRadius: 16,
                    }}
                />
            </View>

            {/* Gráfico de Pizza */}
            <View style={styles.chartContainer}>
                <PieChart
                    data={pieData}
                    width={screenWidth - 40}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#FFFFFF',
                        backgroundGradientFrom: '#F8F9FA',
                        backgroundGradientTo: '#F8F9FA',
                        color: (opacity = 1) => `rgba(94, 23, 235, ${opacity})`, // Roxo
                        labelColor: (opacity = 1) => `rgba(94, 23, 235, ${opacity})`, // Roxo nas labels
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
        </View>

        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.footerButtonText}>Calculadora</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Graph', { expensesData: expensesData })}>
                <Text style={styles.footerButtonText}>Gráficos</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
