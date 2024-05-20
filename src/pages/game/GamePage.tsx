import { useEffect, useState } from "react";
import { Container } from "../../components/BasicComponents"
import styled from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRouteNames } from "../../router/RouteNames"
import { getUserDetails, getGameDetails, sendMapConfiguration } from "../../api";

const GamePage = () => {
  const navigation = useNavigation<any>()
  const route = useRoute()

  const [gameDetails, setGameDetails] = useState({})
  const [player1Email, setPlayer1Email] = useState('')
  const [player2Email, setPlayer2Email] = useState('')
  const [boardRow, serBoardRow] = useState(Array(10).fill(0).map((_, i) => i));

  useEffect(() => {
    getDetailsOfGame()
    // getMapConfiguration()
  }, []);

  const getDetailsOfGame = async () => {
    try {
      const gameId = await AsyncStorage.getItem('gameId');
      const result = await getGameDetails(gameId);
      // console.log("Get game details result: " + result)

      if(JSON.parse(JSON.stringify(result.player1)) != null)
        setPlayer1Email(() => JSON.parse(JSON.stringify(result.player1)).email)
  
      if(JSON.parse(JSON.stringify(result.player2)) != null)
        setPlayer2Email(() => JSON.parse(JSON.stringify(result.player2)).email)

      await setGameDetails(() => result)
    } catch (error) {
      console.log(error)
    }
  }

  // const getMapConfiguration = async () => {
  //   try {
  //     const gameId = await AsyncStorage.getItem('gameId');
  //     const result = await sendMapConfiguration(gameId);
  //     console.log("Send map configuration result: " + result)

  //     // await setGameDetails(() => result)
  //   } catch (error) {
  //     console.log(error)
  //   }

  return (
    <Container style={styles.mainContainer}>  

      <Container style={styles.playerNamesContainer}>
        <Text style={styles.playerNamesText}>{player1Email} ----VS---- {player2Email}</Text>
      </Container>

      <FlatList
        data={boardRow}
        renderItem={(rowIndex) => (
          <FlatList
            data={boardRow}
            renderItem={(colIndex) => (
              <Container style={styles.squareContainer}>
                <View
                 style={styles.square}
                />
              </Container>
            )}
            style={{marginBottom: 10, width: '20%', display: 'flex', flexDirection: 'row' }}
          />
        )}
        style={{marginBottom: 10}}
      />
      
    </Container>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "70%",
    flexDirection: "column",
    alignSelf: "center",
    height: "100%",
  },

  playerNamesContainer: {
    height: "auto",
    textAlign: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  playerNamesText: {
    fontSize: 20,
    fontWeight: "bold"
  },

  squareContainer: {

    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
  },

  square: {
    display: "flex",
    flexDirection: "row",
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'gray'
  }
});

export default GamePage;