import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { paperTheme as theme } from '../../core/theme';

type Props = { children?: string };

const ErrorText = ({ children }: Props) => (
  <>{children ? <Text style={styles.error}>{children}</Text> : null}</>
);

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 40,
    paddingTop: 4,
  },
});

export default memo(ErrorText);
