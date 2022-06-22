import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Animated, Alert } from "react-native";
import { useFonts } from "expo-font";

import GuessRow from "./components/GuessRow";
import Keyboard from "./components/Keyboard";
import Dashboard from "./components/Dashboard";
import styles from "./styles";

import answers from "./assets/word-lists/answers.json";
import guesses from "./assets/word-lists/guesses.json";

let RAND_TARGET = () => {
  return answers[Math.floor(Math.random() * answers.length)].toUpperCase();
};

let LDICT = {};
let LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
LETTERS.map((l) => (LDICT[l] = -1));

export default function App() {
  const [g, setG] = useState(Array(6).fill(""));
  const [s, setS] = useState(
    Array.from({ length: 6 }, () => new Array(5).fill(-1))
  );

  // Refactor this mess with useSetState() at some point
  const [target, setTarget] = useState(RAND_TARGET());
  const [winState, setWinState] = useState(-1);
  const [index, setIdx] = useState(0);
  const [streak, setStreak] = useState(0);
  const [avg, setAvg] = useState(0);

  const [fadeAnim] = useState(new Animated.Value(0));
  const [flag, setFlag] = useState("");

  const [kbColors, setKBColors] = useState(LDICT);

  // Updating state helper function. Should use spread operator.
  function setGuess(newGuess) {
    let n = g.map((x) => x);
    n[index] = newGuess;
    setG(n);
  }

  function setScore(newScore) {
    let n = s.map((x) => x);
    n[index] = newScore;
    setS(n);
  }

  const setKeyboardColors = (guess, newScore) => {
    let n = {...kbColors}
    for (let i = 0; i < 5; i++) {
      n[guess[i]] = newScore[i]
    }
    setKBColors(n)
  }

  // Animation helper functions
  function popup() {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function fadeIn() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  // Reset relevant states to default
  function resetScreen() {
    setG(Array(6).fill(""));
    setS(Array.from({ length: 6 }, () => new Array(5).fill(-1)));
    setIdx(0);
    setWinState(-1);
    setTarget(RAND_TARGET());
    setKBColors(LDICT);
    fadeOut();
  }

  // Reset button
  let handleReset = () => {
    Alert.alert("Are you sure?", "This will reset your streak and average", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setStreak(0);
          setAvg(0);
          resetScreen();
        },
      },
    ]);
  };

  // Next button
  let handleNext = () => {
    if (winState == 1) {
      resetScreen();
      setAvg(Math.round(((streak * avg + index) / (streak + 1)) * 100) / 100);
      setStreak(streak + 1);
    } else if (winState == 0) {
      resetScreen();
      setAvg(0);
      setStreak(0);
    } else {
      setFlag("Round incomplete");
      popup();
    }
  };

  // Perform word comparison and update score array
  function computeNewScore(guess, answer) {
    let newScore = [0, 0, 0, 0, 0];
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
        cmap.set(achar, cmap.get(achar) + 1);
      } else {
        cmap.set(achar, 1);
      }
    }
    // Look for yellows, but don't double count
    for (let i = 0; i < guess.length; i++) {
      let gchar = guess.charAt(i);
      if (cmap.get(gchar) > 0 && newScore[i] == 0) {
        newScore[i] = 1;
        cmap.set(guess.charAt(i), cmap.get(guess.charAt(i) - 1));
      }
    }

    setKeyboardColors(guess, newScore)
    return newScore;
  }

  // Handle all key presses
  function handleKeyPress(input) {
    // If in a win state, need to update with reset
    if (index >= 6 || winState == 1) {
      return;
    }

    let guess = g[index];
    // User attempts to delete a character
    if (input == "DELETE") {
      setGuess(guess.slice(0, -1));
      return;
    }

    // User attempts to enter their guess
    if (input == "ENTER") {
      if (guess.length != 5) {
        setFlag("Not enough letters");
        popup();
        return;
      }

      // Backdoor = "APAPA"
      if (guess != "APAPA" && !guesses.includes(guess.toLowerCase())) {
        setFlag("Not in word list");
        popup();
        return;
      }

      setIdx(index + 1); // Increment guess index

      // Calculate new score, check if winning, and update
      let newScore = computeNewScore(guess, target);
      if (guess === target) {
        setFlag("Streak + 1!");
        popup();
        setWinState(1);
      }
      setScore(newScore);

      // Lose condition
      if (index >= 5) {
        setFlag("Answer was: " + target);
        fadeIn();
        setWinState(0);
      }
      return;
    }

    // Do nothing if they have exceeded 5 chars
    if (guess.length >= 5) return;

    setGuess(guess + input);
  }

  // Allows us to load custom fonts
  const [loaded] = useFonts({
    Karnak: require("./assets/fonts/Karnak.otf"),
  });
  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifierContainer}>
        <Animated.View style={[styles.notifier, { opacity: fadeAnim }]}>
          <Text style={styles.notifierText}>{flag}</Text>
        </Animated.View>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>OOdle</Text>
      </View>
      <View>
        <GuessRow guess={g[0]} score={s[0]} />
        <GuessRow guess={g[1]} score={s[1]} />
        <GuessRow guess={g[2]} score={s[2]} />
        <GuessRow guess={g[3]} score={s[3]} />
        <GuessRow guess={g[4]} score={s[4]} />
        <GuessRow guess={g[5]} score={s[5]} />
      </View>
      <View style={styles.footer}>
        <Dashboard
          streak={streak}
          avg={avg}
          reset={handleReset}
          next={handleNext}
        />
        <Keyboard keyHandler={handleKeyPress} keyboardColors={kbColors} />
      </View>
    </SafeAreaView>
  );
}
