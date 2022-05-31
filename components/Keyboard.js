import React from 'react'
import { 
  Text,
  Pressable,
  View
} from 'react-native';

import styles from "../styles";

function keyStyle(pressed, type) {
  let bgColor = "lightgrey"
  if (type == 0) {
    bgColor = "#777c7d"
  }
  else if (type == 1) {
    bgColor = "#c9b457"
  }
  else if (type == 2) {
    bgColor = "#69aa63"
  }
  let sColor = pressed ? "black" : "white"
  return [{backgroundColor: bgColor, shadowColor: sColor}, styles.key]
}

function keyLetterStyle(type) {
  let c = (type == -1) ? "black" : "white"
  return [{color: c}, styles.keyboardLetter]
}

const Key = ({letter, keyHandler, type}) => (
    <Pressable onPress={() => keyHandler(letter)} style={({pressed}) => keyStyle(pressed, type)}>
       <Text style={keyLetterStyle(type)}>{letter}</Text>
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

const Keyboard = ({keyHandler, keyboardColors}) => {
  const rows = [
    {id: "row1", letters: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]},
    {id: "row2", letters: ["A", "S", "D", "F", "G", "H", "J", "K", "L"]},
    {id: "row3", letters: ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"]}]

  return (
    <View style={styles.keyboard}>
      {rows.map(row => 
      <View style={styles.keyboardRow} key={row.id}>
        {row.letters.map(letter => 
          (["ENTER", "DELETE"].includes(letter) ? 
            <FatKey phrase={letter} keyHandler={keyHandler} key={letter}/> : 
            <Key letter={letter} keyHandler={keyHandler} type={keyboardColors[letter]} key={letter}/> 
          ))}
      </View>)}
    </View>
  )  
}

export default Keyboard;