import {
    DefaultTheme as DefaultPaperTheme,
    DarkTheme as DarkPaperTheme,
  } from 'react-native-paper';
  import {
    DefaultTheme as DefaultNavigationTheme,
    DarkTheme as DarkNavigationTheme,
    Theme,
  } from '@react-navigation/native';
  
  export const paperTheme = {
    ...DefaultPaperTheme,
    colors: {
      ...DefaultPaperTheme.colors,
      primary: '#E4DCCC',
      accent: '#01CBFF',
    },
  } as ReactNativePaper.Theme;
  
  export const paperDarkTheme = {
    ...DarkPaperTheme,
    colors: {
      ...DarkPaperTheme.colors,
      primary: '#E4DCCC',
      accent: '#01CBFF',
    },
  } as ReactNativePaper.Theme;
  
  export const navigationTheme = {
    ...DefaultNavigationTheme,
    colors: {
      ...DefaultNavigationTheme.colors,
      primary: '#E4DCCC',
    },
  } as Theme;
  
  export const navigationDarkTheme = {
    ...DarkNavigationTheme,
    colors: {
      ...DarkNavigationTheme.colors,
      primary: '#E4DCCC',
    },
  } as Theme;
  