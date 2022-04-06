import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'rgb(252,251,247)',
      // borderWidth: 3,
      // borderColor: 'blue',
    },
    titleView: {
      flex: 1,
      width: '90%', 
      // borderWidth: 3, 
      // borderColor: 'green'
    },
    title: {
      flex: 1,
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "left",
      fontFamily: "braveold",
    },
    image: {
      flex: 1,
      // borderWidth: 1,
      // width: '100%',
      height: '30%',
      // marginBottom: 20,
    },
    separator: { //I've never used this in my life
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    header: {
      height: 30,
      backgroundColor: 'rgb(252,251,247)',
      width: '100%',
      flex: 0.3,
    },
    list : {
      flex: 1,
      width:'100%', 
      // borderWidth: 3, 
      // borderColor: 'red'
    },
    row: {
      flex: 1, 
      flexDirection: 'row', 
      alignSelf: 'center',
      width: '95%',
      // borderWidth: 1, 
      // borderColor: 'orange',
    },
    cell: {
      width: '50%', 
      padding: 5,
      // borderWidth: 1, 
      backgroundColor: 'rgb(252,251,247)',
      // borderColor: 'purple', //testing
    },
    h1: {
      fontSize: 24,
      fontFamily: 'Montserrat',
      fontWeight: "bold", //not doing anything
      color: "rgba(90, 67, 62, 1)",
      letterSpacing: 0.1,
      padding: 14,
    },
    p: {
      fontSize: 14,
      fontFamily: 'Montserrat',
      color: "rgba(90, 67, 62, 1)",
      letterSpacing: 0.1,
    },
    button: {
      alignSelf: 'center',
      backgroundColor: 'rgb(226,186,108)',
      color: 'black',
      borderRadius: 28,
      width: 200,
    },
    buttonLabel: {
      fontFamily: "MontserratBold",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      color: "rgba(90, 67, 62, 1)",
      letterSpacing: 0.1,
    },
});