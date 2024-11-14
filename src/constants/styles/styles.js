import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#5E17EB',
  },
  signUpContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: -20,
  },
  button: {
    backgroundColor: '#5E17EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  text: {
    color: '#5E17EB',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#5E17EB',
    marginBottom: 30,
  },
})
