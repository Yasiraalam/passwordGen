

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import * as Yup from 'yup';
import { useState } from 'react';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be less than 16 characters')
    .required('Password is required')
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength:  number) => {

  }
  const createPassword = (characters: string,passwordLength: number) => {

  }

  const resetPasswordState = () => {}


  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NewAppScreen templateFileName="App.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
