import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { wordList } from "../constants/word-list";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Score } from "../components/Score";
import { Word } from "../components/Word";
import { Card } from "../components/Card";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const GameBoard = () => {
  const [value, setValue] = useState("");
  const [remainingLives, setRemainingLives] = useState(7);
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState([]);
  const [msg, setMsg] = useState("");
  const [topScore, setTopScore] = useLocalStorage("topScore", 0);

  useEffect(() => {
    getWord();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 1500);

    return () => clearTimeout(timer);
  }, [msg]);

  useEffect(() => {
    if (score > topScore) {
      setTopScore(score);
    }
  }, [score]);

  useEffect(() => {
    if (remainingLives === 0) {
      setMsg("Game End. You don't have life.");
      setRemainingLives(7);
      setScore(0);
      setLetters([]);
      getWord();
    }
  }, [remainingLives]);

  const getWord = () => {
    const index = Math.floor(Math.random() * 100);
    const letterArr = wordList[index].split("").map((x) => {
      return { value: x, isMatched: false };
    });
    setLetters(letterArr);
  };

  const onChangeHandler = (val) => {
    const replacedVal = val.replace(/[^A-Za-z]/gi, "");
    setValue(replacedVal);
  };

  const onSuccess = (message) => {
    setTimeout(() => {
      setMsg(message);
      setRemainingLives(7);
      setLetters([]);
      getWord();
    }, 1000);
  };

  const onSubmitHandler = () => {
    let isMatched = false;
    const newLetterArr = letters.map((x) => {
      if (x.value === value) {
        isMatched = true;
        return { ...x, isMatched: true };
      }
      return x;
    });
    setLetters(newLetterArr);
    if (isMatched) {
      if (newLetterArr.every((x) => x.isMatched)) {
        setScore((prevScore) => prevScore + 1);
        onSuccess(`Hurray! You guessed whole word`);
      } else {
        setMsg(`You guessed "${value}" from hidden word`);
      }
    } else {
      const lives = remainingLives - 1;
      setRemainingLives(lives);
      if (lives > 0) {
        setMsg("Wrong Input, Try again!");
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
      <Word letters={letters} />
      {msg && <Card>{msg}</Card>}
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    marginTop: 30,
  },
  scoreSection: {
    marginTop: 50,
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
