import React, { memo } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HelperText, TextInput as Input } from 'react-native-paper';
import { paperTheme as theme } from '../core/theme';
import ErrorText from './ErrorText';

type Props = React.ComponentProps<typeof Input> & {
  errorText?: string;
  helperText?: string;
};

const TextInput = ({ errorText, helperText, ...props }: Props) => (
    <View style={styles.container}>
        <Input
          style={styles.input}
          activeUnderlineColor={'#5a433e'}
          mode="flat"
          {...props}
        />
        <ErrorText>{errorText}</ErrorText>
      </View>
      

  
  
);

const styles = StyleSheet.create({
  test: {
    //borderWidth: 3,
  },
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#E4DCCC',
  },
});

export default memo(TextInput);
