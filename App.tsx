

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { CheckBox, Input, Button } from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be less than 16 characters')
    .required('Password length is required'),
});

interface FormValues {
  passwordLength: string;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const generatePassword = (values: FormValues) => {
    const length = parseInt(values.passwordLength);
    
    // Build character set based on selected options
    let characterSet = '';
    if (values.includeLowercase) characterSet += 'abcdefghijklmnopqrstuvwxyz';
    if (values.includeUppercase) characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (values.includeNumbers) characterSet += '0123456789';
    if (values.includeSymbols) characterSet += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Ensure at least one character type is selected
    if (characterSet === '') {
      Alert.alert('Error', 'Please select at least one character type');
      return;
    }

    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      password += characterSet.charAt(randomIndex);
    }

    setGeneratedPassword(password);
    setIsPasswordGenerated(true);
  };

  const copyToClipboard = () => {
    // In a real app, you'd use Clipboard API
    Alert.alert('Copied!', 'Password copied to clipboard');
  };

  const initialValues: FormValues = {
    passwordLength: '12',
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: false,
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          Password Generator
        </Text>
        
        <Formik
          initialValues={initialValues}
          validationSchema={PasswordSchema}
          onSubmit={generatePassword}
        >
          {({ handleSubmit, values, setFieldValue, resetForm, errors, touched }) => (
            <View style={styles.formContainer}>
              {/* Password Length Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
                  Password Length
                </Text>
                <Input
                  value={values.passwordLength}
                  onChangeText={(text) => setFieldValue('passwordLength', text)}
                  keyboardType="numeric"
                  placeholder="Enter password length"
                  containerStyle={styles.input}
                  inputStyle={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                  placeholderTextColor={isDarkMode ? '#888888' : '#666666'}
                  errorMessage={touched.passwordLength && errors.passwordLength ? errors.passwordLength : ''}
                />
              </View>

              {/* Character Type Options */}
              <View style={styles.optionsContainer}>
                <Text style={[styles.sectionTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Character Types</Text>
                {/* Lowercase */}
                <View style={styles.bouncyRow}>
                  <Text style={[styles.bouncyLabel, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Lowercase (a-z)</Text>
                  <BouncyCheckbox
                    isChecked={values.includeLowercase}
                    fillColor="#007AFF"
                    unFillColor={isDarkMode ? "#333333" : "#f0f0f0"}
                    size={24}
                    useBuiltInState={false}
                    iconStyle={styles.checkboxIcon}
                    innerIconStyle={styles.innerIcon}
                    style={styles.bouncyCheckbox}
                    onPress={() => setFieldValue('includeLowercase', !values.includeLowercase)}
                  />
                </View>
                {/* Uppercase */}
                <View style={styles.bouncyRow}>
                  <Text style={[styles.bouncyLabel, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Uppercase (A-Z)</Text>
                  <BouncyCheckbox
                    isChecked={values.includeUppercase}
                    fillColor="#007AFF"
                    unFillColor={isDarkMode ? "#333333" : "#f0f0f0"}
                    size={24}
                    useBuiltInState={false}
                    iconStyle={styles.checkboxIcon}
                    innerIconStyle={styles.innerIcon}
                    style={styles.bouncyCheckbox}
                    onPress={() => setFieldValue('includeUppercase', !values.includeUppercase)}
                  />
                </View>
                {/* Numbers */}
                <View style={styles.bouncyRow}>
                  <Text style={[styles.bouncyLabel, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Numbers (0-9)</Text>
                  <BouncyCheckbox
                    isChecked={values.includeNumbers}
                    fillColor="#007AFF"
                    unFillColor={isDarkMode ? "#333333" : "#f0f0f0"}
                    size={24}
                    useBuiltInState={false}
                    iconStyle={styles.checkboxIcon}
                    innerIconStyle={styles.innerIcon}
                    style={styles.bouncyCheckbox}
                    onPress={() => setFieldValue('includeNumbers', !values.includeNumbers)}
                  />
                </View>
                {/* Symbols */}
                <View style={styles.bouncyRow}>
                  <Text style={[styles.bouncyLabel, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Symbols (!@#$%^&*)</Text>
                  <BouncyCheckbox
                    isChecked={values.includeSymbols}
                    fillColor="#007AFF"
                    unFillColor={isDarkMode ? "#333333" : "#f0f0f0"}
                    size={24}
                    useBuiltInState={false}
                    iconStyle={styles.checkboxIcon}
                    innerIconStyle={styles.innerIcon}
                    style={styles.bouncyCheckbox}
                    onPress={() => setFieldValue('includeSymbols', !values.includeSymbols)}
                  />
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <Button
                  title="Generate Password"
                  onPress={() => handleSubmit()}
                  buttonStyle={styles.generateButton}
                  titleStyle={styles.buttonText}
                />
                
                <Button
                  title="Reset"
                  onPress={() => {
                    setGeneratedPassword('');
                    setIsPasswordGenerated(false);
                    resetForm();
                  }}
                  buttonStyle={styles.resetButton}
                  titleStyle={styles.buttonText}
                />
              </View>

              {/* Generated Password Display */}
              {isPasswordGenerated && (
                <View style={styles.passwordContainer}>
                  <Text style={[styles.passwordLabel, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
                    Generated Password:
                  </Text>
                  <View style={[styles.passwordBox, { backgroundColor: isDarkMode ? '#333333' : '#ffffff' }]}>
                    <Text style={[styles.passwordText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
                      {generatedPassword}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={copyToClipboard}
                  >
                    <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    marginBottom: 10,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  generateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  passwordContainer: {
    alignItems: 'center',
  },
  passwordLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  passwordBox: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    marginBottom: 15,
  },
  passwordText: {
    fontSize: 16,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  copyButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bouncyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  bouncyCheckbox: {
    marginLeft: 8,
    flexShrink: 0,
  },
  checkboxIcon: {
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 4,
  },
  innerIcon: {
    borderWidth: 2,
    borderRadius: 2,
  },
  bouncyLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
