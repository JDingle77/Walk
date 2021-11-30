import * as React from 'react';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import TextInput from '../components/TextInput';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const Login = ({ navigation }: RootTabScreenProps<'Login'>) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
            label="Your email"
            enablesReturnKeyAutomatically
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
        />
        <TextInput
            label="Your password"
            enablesReturnKeyAutomatically
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            autoCapitalize="none"
            autoComplete="none"
            textContentType="password"
        />
        <Button color={'white'} onPress={() => email.value != '' && password.value != '' ? navigation.navigate('Home') : Alert.alert('Please fill out both fields.')}>
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default Login;