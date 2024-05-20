import { useEffect, useState } from "react";
import { Container } from "../components/BasicComponents"
import styled from "styled-components/native";
import { Text, StyleSheet, View } from "react-native";
import { joinGame } from "../api"
import { GameRouteNames } from "../router/RouteNames"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameListingEntry = ({game}) => {
  const navigation = useNavigation<any>()

  const [player1Email, setPlayer1Email] = useState('None')
  const [player2Email, setPlayer2Email] = useState('None')

  useEffect(() => {
    if(JSON.parse(JSON.stringify(game.player1)) != null)
      setPlayer1Email(() => JSON.parse(JSON.stringify(game.player1)).email)

    if(JSON.parse(JSON.stringify(game.player2)) != null)
      setPlayer2Email(() => JSON.parse(JSON.stringify(game.player2)).email)
  })

  const join = async () => {
    try {
      const gameId = game.id;
      const result = await joinGame(gameId);

      console.log("Join game result: " + result)
      await AsyncStorage.setItem('gameId', gameId);
      navigation.navigate(GameRouteNames.GAME)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container style={styles.container}>
      <View style={styles.view}>
        <Text>{player1Email}</Text>
      </View>
      
      <View style={styles.view}>
        <Text>{player2Email}</Text>
      </View>

      <View style={styles.view}>
        <Text>{game.status}</Text>
      </View>

      <Button onPress={join} style={{alignSelf: 'center'}}>
          <Text style={{alignSelf: 'center'}}>Join</Text>
      </Button> 

    </Container>
  );
}

export default GameListingEntry;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 10,
    backgroundColor: "red",
  },

  view: {
    flex: 1,

    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 2,
    borderLeftWidth: 0,
    borderColor: "#454545",
    alignItems: "center", 
    justifyContent: "center", 
  }
});

export const Button = styled.TouchableOpacity`
  width: 20%;
  border: 1px solid #ccc; 
  border-radius: 5px; 
  color: white; 
  text-align: center;
  self-align: center;
  justify-content: center;
  cursor: pointer;
  background-color: #73bbff
`;