import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE8FF', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  expenseGraphContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5E17EB',
    marginBottom: 50,
    textAlign: 'center',
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#5E17EB',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0, 
  },
  footerButton: {
    paddingVertical: 12,
    borderRadius: 5,
    width: '40%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
