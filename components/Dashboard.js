import React from 'react'
import { 
  Text,
  View,
  Pressable
} from 'react-native';

import styles from "../styles";

const Dashboard = ({streak, avg, reset, next}) => ( 
    <View style={styles.dashboard}>
      {/* Reset button */}
      <Pressable onPress={reset} style={({pressed}) => [
          {
            backgroundColor: pressed ? "#ad0a07" : "crimson",
            shadowColor: pressed ? "black" : "white"}, styles.resetButton
          ]}>
          <Text style={styles.indicatorText}>RESET</Text>
      </Pressable>

      <Indicator msg={"STREAK: " + streak} />
      <Indicator msg={"AVG: " + avg} />

      {/* Play Again button */}
      <Pressable onPress={next} style={({pressed}) => [
          {
            backgroundColor: pressed ? "#31611a" : "green",
            shadowColor: pressed ? "black" : "white"}, styles.resetButton
          ]}>
          <Text style={styles.indicatorText}>NEXT</Text>
      </Pressable>
    </View>
  )
  
const Indicator = ({msg}) => (
    <View style={styles.indicator}>
        <Text style={styles.indicatorText}>{msg}</Text>
    </View>
)

export default Dashboard;

