import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { wordList } from "../constants/word-list";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Score } from "../components/Score";
import { Word } from "../components/Word";
import { Card } from "../components/Card";

export const GameBoard = () => {
  const [value, setValue] = useState("");
  const [word, setWord] = useState("");
  const [remainingLives, setRemainingLives] = useState(7);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [letters, setLetters] = useState([]);
  const [msg, setMsg] = useState("");

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

  const setAndClearMsg = (message) => {
    setMsg(message);
    setTimeout(() => {
      setMsg("");
    }, 1500);
  };

  const onSuccess = (message) => {
    setTimeout(() => {
      setAndClearMsg(message);
      setRemainingLives(7);
      setLetters([]);
      getWord();
    }, 1000);
  };

  const onGameEnd = (message) => {
    setAndClearMsg(message);
    setRemainingLives(7);
    setScore(0);
    setLetters([]);
    getWord();
  };

  const onSubmitHandler = () => {
    const result = word.split("").find((x) => x === value);
    if (result) {
      if (!letters.includes(value)) {
        const newLetters = [...letters, value];
        setLetters(newLetters);

        if (word.split("").every((x) => newLetters.includes(x))) {
          const totalScore = score + 1;
          setScore(totalScore);
          if (totalScore >= topScore) {
            setTopScore(totalScore);
            AsyncStorage.setItem("topScore", totalScore.toString());
          }
          onSuccess(`Hurray! You guessed whole word "${word}"`);
        } else {
          setAndClearMsg(`You guessed "${value}" from hidden word`);
        }
      }
    } else {
      const lives = remainingLives - 1;
      setRemainingLives(lives);
      if (lives === 0) {
        onGameEnd("Game End. You don't have life.");
      } else {
        setAndClearMsg("Wrong Input, Try again");
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
      <Word wordLetters={word.split("")} triedLetters={letters} />
      {msg && <Card>{msg}</Card>}
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
});
