import { Alert, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { wordList } from "../constants/word-list";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Score } from "../components/Score";

export const GameBoard = () => {
  const [value, setValue] = useState("");
  const [word, setWord] = useState("");
  const [remainingLives, setRemainingLives] = useState(7);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    async function fetchTopScore() {
      const storedTopScore = await AsyncStorage.getItem("topScore");

      if (storedTopScore) {
        setTopScore(+storedTopScore);
      }
    }

    fetchTopScore();
    getWord();
  }, []);

  const getWord = () => {
    const index = Math.floor(Math.random() * 100);
    setWord(wordList[index]);
  };

  const onChangeHandler = (val) => {
    setValue(val);
  };

  const onSuccessHandler = () => {
    setRemainingLives(7);
    setIsMatch(false);
    getWord();
  };

  const onEndHandler = () => {
    setRemainingLives(7);
    setScore(0);
    setIsMatch(false);
    getWord();
  };

  const onSubmitHandler = () => {
    const result = word.split("").find((x) => x === value);
    if (result) {
      const totalScore = score + 1;
      setScore(totalScore);
      if (totalScore >= topScore) {
        setTopScore(totalScore);
        AsyncStorage.setItem("topScore", totalScore.toString());
      }
      setIsMatch(true);
      Alert.alert(
        "Correct",
        `
        You guessed "${value}"
        From word "${word}"
        `,
        [{ text: "Ok", onPress: () => onSuccessHandler() }]
      );
    } else {
      const lives = remainingLives - 1;
      setRemainingLives(lives);
      if (lives === 0) {
        Alert.alert("Game End", "You don't have life.", [
          { text: "Restart", onPress: () => onEndHandler() },
        ]);
      } else {
        Alert.alert("Wrong Input", "Try again", [{ text: "Ok" }]);
      }
    }
    setValue("");
  };

  return (
    <View style={styles.boardContainer}>
      <Header>Hanged Man</Header>
      <View style={styles.scoreSection}>
        <Score label="Lives Remain" value={remainingLives} />
        <Score label="Top Score" value={topScore} />
        <Score label="Score" value={score} />
      </View>
      <View style={styles.gameSection}>
        <View style={styles.input}>
          <Input maxLength={1} value={value} onUpdateValue={onChangeHandler} />
        </View>
        <View style={styles.button}>
          <Button onPress={onSubmitHandler} disabled={!value}>
            Submit
          </Button>
        </View>
      </View>
      <View style={styles.wordSection}>
        {word.split("").map((w, index) => (
          <View key={index}>
            <Text style={styles.letter}>{isMatch ? w : "_"}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    marginTop: 100,
  },
  scoreSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  gameSection: {
    marginTop: 30,
    padding: 20,
    flexDirection: "row",
  },
  input: {
    width: 200,
  },
  button: {
    marginLeft: 20,
    marginTop: 15,
    justifyContent: "center",
  },
  wordSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  letter: {
    marginRight: 10,
    fontSize: 24,
    fontWeight: "400",
  },
});
