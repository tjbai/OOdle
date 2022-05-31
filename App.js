import React, { useState } from "react"
import { 
  Text,
  View,
  SafeAreaView,
  Animated,
  Alert
} from 'react-native';
// import { useSetState } from "react-use"
import { useFonts } from "expo-font"

import GuessRow from "./components/GuessRow";
import Keyboard from "./components/Keyboard";
import Dashboard from "./components/Dashboard"
import styles from "./styles";

import answers from "./assets/word-lists/answers.json"
import guesses from "./assets/word-lists/guesses.json"

let randomizeTarget = () => {
  return answers[Math.floor(Math.random() * answers.length)].toUpperCase()
}
  
export default function App() {

  // Refactor this mess with useSetState() at some point
  const [g, setG] = useState(Array(6).fill(""))
  const [s, setS] = useState(Array.from({length: 6}, () => new Array(5).fill(-1)))
  const [target, setTarget] = useState(randomizeTarget()) 
  const [winState, setWinState] = useState(false)
  const [index, setIdx] = useState(0)
  const [streak, setStreak] = useState(0)
  const [avg, setAvg] = useState(0)

  // let defaultState = {
  //   guess: Array(6).fill(""),
  //   sscore: Array.from({length: 6}, () => new Array(5).fill(-1)),
  //   target: randomizeTarget(),
  //   winState: false,
  //   streak: 0,
  //   average: 0,
  //   index: 0
  // }

  const [fadeAnim] = useState(new Animated.Value(0))
  const [flag, setFlag] = useState("")

  // Helper functions
  function popup() {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  }

  function fadeIn() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  }

  function fadeOut() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }

  // Reset all boxes and select a new word
  function resetScreen() {
    setG(Array(6).fill(""));
    setS(Array.from({length: 6}, () => new Array(5).fill(-1)));
    setIdx(0);
    setWinState(false);
    setTarget(randomizeTarget());
    fadeOut()
  }

  // Reset screen, reveal answer, reset streak, reset average
  let handleReset = () => {
    Alert.alert(
      "Are you sure?",
      "This will reset your streak and average",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            setStreak(0)
            setAvg(0)
            resetScreen()
          }
    }])
  }

  // Reset screen, increment streak, reset average
  let handleNext = () => {
    if (winState) {
      resetScreen();
      setAvg(Math.round((streak*avg+index) / (streak+1) * 100) / 100)
      setStreak(streak+1);
    }
    else {
      setFlag("Finish or RESET")
      popup()
    }
  }

  // A little memory inefficiency for simplicity's sake
  function setGuess(newGuess) {
    let n = g.map(x => x)
    n[index] = newGuess
    setG(n)
  }

  function setScore(newScore) {
    let n = s.map(x => x)
    n[index] = newScore
    setS(n)
  }

  // Perform word comparison and update score array
  function computeNewScore(guess, answer) {
    let newScore = [0,0,0,0,0]
    let cmap = new Map();
    // Look for greens
    for (let i = 0; i < guess.length; i++) { 
      let gchar = guess.charAt(i);
      let achar = answer.charAt(i);

      if (gchar == achar) {
        newScore[i] = 2;
      }
      // Not a green, increment cmap
      else if (cmap.has(achar)) {
        cmap.set(achar, cmap.get(achar)+1);
      }
      else {
        cmap.set(achar, 1);
      }
    }
    // Look for yellows, but don't double count
    for (let i = 0; i < guess.length; i++) {
      let gchar = guess.charAt(i);
      if (cmap.get(gchar) > 0 && newScore[i] == 0) { 
        newScore[i] = 1;
        cmap.set(guess.charAt(i), cmap.get(guess.charAt(i)-1));
      }
    }
    return newScore
  }

  // Handle all key presses
  function handleKeyPress(input) {
    // If in a win state, need to update with reset
    if (index >= 6 || winState) {
      return 
    }

    let guess = g[index];
    // User attempts to delete a character
    if (input == "DELETE") {
      setGuess(guess.slice(0,-1))
      return
    }

    // User attempts to enter their guess
    if (input == "ENTER") {
      // Check if word is valid
      // if (is valid word)

      if (guess.length != 5) {
        // alert("Too short")
        setFlag("Not enough letters")
        popup()
        return
      }
      setIdx(index+1) // Increment guess index

      // Calculate new score, check if winning, and update
      let newScore = computeNewScore(guess, target)
      if (guess === target) {
        setFlag("Streak + 1!")
        popup()
        setWinState(true)
      }
      setScore(newScore)

      // Lose condition
      if (index >= 5) {
        setFlag("Answer was: " + target)
        fadeIn()
      }
      return
    }

    // Do nothing if they have exceeded 5 chars
    if (guess.length >= 5) return

    setGuess(guess + input)
  }

  // Allows us to load custom fonts
  const [loaded] = useFonts({
    Karnak: require("./assets/fonts/Karnak.otf"),
  })
  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifierContainer}>
        <Animated.View style={[styles.notifier, {opacity: fadeAnim}]}>
          <Text style={styles.notifierText}>{flag}</Text>
        </Animated.View>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>OOdle</Text>
      </View>
      <View>
        <GuessRow guess={g[0]} score={s[0]}/>
        <GuessRow guess={g[1]} score={s[1]}/>
        <GuessRow guess={g[2]} score={s[2]}/>
        <GuessRow guess={g[3]} score={s[3]}/>
        <GuessRow guess={g[4]} score={s[4]}/>
        <GuessRow guess={g[5]} score={s[5]}/>
      </View>
      <View style={styles.footer}>
        <Dashboard streak={streak} avg={avg} 
          reset={handleReset} next={handleNext}/>
        <Keyboard keyHandler={handleKeyPress}/>
      </View>
    </SafeAreaView>
  )
}