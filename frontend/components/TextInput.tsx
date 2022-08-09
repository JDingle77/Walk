import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
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
  container: {
    width: '100%',
    marginVertical: 12,
    //borderWidth: 3,
  },
  input: {
    backgroundColor: '#E4DCCC',
  },
});

export default memo(TextInput);
