import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      // alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'rgb(252,251,247)',
      // borderWidth: 3,
      // borderColor: 'blue',
    },
    creamContainer: {
      height: Dimensions.get("window").height,
      backgroundColor: "rgba(245, 239, 224, 1)",
    },
    titleView: {
      width: '90%', 
      marginTop: 20,
      // borderWidth: 3, 
      // borderColor: 'green',
    },
    titleContainer: {
      marginTop: 120,
    },
    title: {
      width: Dimensions.get("window").width - 64,
      height: 101,
      left: 32,
      fontFamily: "braveold",
      fontWeight: "500",
      lineHeight: 50.400001525878906,
      fontSize: 40,
      color: "rgba(0, 0, 0, 1)",
      textAlign: "left",
      textAlignVertical: "center",
      letterSpacing: 0.1,
    },
    h3: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "left",
      fontFamily: "braveold",
      // borderWidth: 3,
      // borderColor: 'green'
    },
    bold: {
      fontFamily: "MontserratBold", 
      fontWeight: "900",
    },
    image: {
      // borderWidth: 1,
      // width: '100%',
      flex: 0.9,
    },
    separator: { //I've never used this in my life
      marginVertical: 30,
      height: 1,
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
      lineHeight: 14,
    },
    button: {
      width: Dimensions.get("window").width - 76,
      height: 56,
      borderRadius: 28,
      backgroundColor: "rgba(233, 185, 94, 1)",
      alignSelf: "center",
      marginVertical: 12,
    },
    buttonLabel: {
      left: 0,
      top: 5,
      fontFamily: "MontserratBold",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },
    inputField: {
      // position: "absolute",
      width: Dimensions.get("window").width - 64,
      height: 48,
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: "rgba(90, 67, 62, 1)",
      left: 32,
      backgroundColor: "rgba(255, 255, 255, 1)",
    }
});