import { TextInput, StyleSheet, View } from 'react-native'

export default function InputField({
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  onChangeText,
  value
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#5E17EB"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5E17EB', // Borda roxa sutil
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#5E17EB', // Texto principal roxo
  },
})
