import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1
    },

    notifierContainer: {
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1
    },

    notifier: {
      top: 75,
      position: "absolute",
      backgroundColor: "black",
      width: 175,
      height: 50,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },

    notifierText: {
      color: "white",
      fontWeight: "bold",
      fontFamily: "Helvetica Neue",
      fontSize: 15
    },
  
    guessRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    box: {
      width: 65,
      height: 65,
      borderWidth: 2,
      margin: 2.5,
      justifyContent: "center",
      alignItems: "center",
    },
    
    footer: {
      flexDirection: "column",
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center"
    },
  
    keyboard: {
      flexDirection: "column",
      margin: 5,
    },
  
    keyboardRow: {
      flexDirection: "row",
      justifyContent: "center"
    },
  
    key: {
      width: 32,
      height: 55,
      borderRadius: 5,
      shadowOpacity: 0.5,
      shadowOffset: {width: 1, height: 1},
      justifyContent: "center",
      alignItems: "center",
      margin: 3
    },
  
    fatKey: {
      width: 52,
      height: 55,
      borderRadius: 5,
      shadowOpacity: 0.5,
      shadowOffset: {width: 1, height: 1},
      justifyContent: "center",
      alignItems: "center",
      margin: 3,
    },
  
    keyboardLetter: {
      fontFamily: "Helvetica Neue",
      fontSize: 12,
      fontWeight: "bold"
    },
  
    header: {
      alignItems: "center"
    },
  
    title: {
      fontFamily: "Karnak",
      fontSize: 40,
      fontWeight: "bold",
      margin: 3
    },
  
    letter: {
      fontFamily: "Helvetica Neue",
      fontSize: 30,
      fontWeight: "bold"
    },
  
    dashboard: {
      justifyContent: "center",
      flexDirection: "row",
    },
  
    indicator: {
      width: "20%",
      height: 30,
      marginHorizontal: 10,
      backgroundColor: "#777c7d",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5
    },
  
    indicatorText: {
      fontFamily: "Helvetica Neue",
      fontSize: 12,
      fontWeight: "bold",
      color: "white"
    },

    resetButton: {
      width: "20%",
      height: 30,
      marginHorizontal: 10,
      // backgroundColor: "#777c7d",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      shadowOpacity: 0.5,
      shadowOffset: {width: 1, height: 1},
    },
  });

export default styles;