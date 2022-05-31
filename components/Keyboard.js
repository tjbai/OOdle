import React from 'react'
import { 
  Text,
  Pressable,
  View
} from 'react-native';

import styles from "../styles";

const Key = ({letter, keyHandler}) => (
    <Pressable onPress={() => keyHandler(letter)} style={({pressed}) => [
      {
        backgroundColor: pressed ? "darkgrey" : "lightgrey",
        shadowColor: pressed ? "black" : "white"
      }, styles.key
    ]}>
       <Text style={styles.keyboardLetter}>{letter}</Text>
    </Pressable>
  )

const FatKey = ({phrase, keyHandler}) => (
  <Pressable onPress={() => keyHandler(phrase)} style={({pressed}) => [
    {
      backgroundColor: pressed ? "darkgrey" : "lightgrey",
      shadowColor: pressed ? "black" : "white"
    }, styles.fatKey
  ]}>
      <Text style={styles.keyboardLetter}>{phrase}</Text>
  </Pressable>
)

const Keyboard = ({keyHandler}) => {
  const rows = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"]]

  return (
    <View style={styles.keyboard}>
      {rows.map(row => 
      <View style={styles.keyboardRow}>
        {row.map(letter => 
          (
          ["ENTER", "DELETE"].includes(letter) ? 
            <FatKey phrase={letter} keyHandler={keyHandler} /> : 
            <Key letter={letter} keyHandler={keyHandler}/> 
          ))}
      </View>)}
    </View>
  )  
}

export default Keyboard;