import React from 'react'
import { 
  Text,
  View,
} from 'react-native';

import styles from "../styles";

const GuessRow = ({guess, score}) => (
  <View style={styles.guessRow}>
    <Box letter={guess.charAt(0)} type={score[0]} />
    <Box letter={guess.charAt(1)} type={score[1]} />
    <Box letter={guess.charAt(2)} type={score[2]} />
    <Box letter={guess.charAt(3)} type={score[3]} />
    <Box letter={guess.charAt(4)} type={score[4]}/>
  </View>
)

const Box = ({letter, type}) => (
    <View style={boxStyle(letter, type)}>
      <Text style={boxLetterStyle(type)}>{letter}</Text>
    </View>
  )
  
  function boxStyle(letter, type) {
    let bgColor = "white";
    let bColor = "lightgrey";
    if (type == -1 && letter != "") {
      bColor = "#777c7d";
    }
    else if (type == 0) {
      bgColor = bColor = "#777c7d"
    }
    else if (type == 1) {
      bgColor = bColor = "#c9b457"
    }
    else if (type == 2) {
      bgColor = bColor = "#69aa63"
    }
  
    return [{backgroundColor: bgColor, borderColor: bColor}, styles.box];
  }
  
  function boxLetterStyle(type) {
    let c = "black"
    if (type != -1) {
      c = "white"
    }
    return [{color: c}, styles.letter]
  }

export default GuessRow;