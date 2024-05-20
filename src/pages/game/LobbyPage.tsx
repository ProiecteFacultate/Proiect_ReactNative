import { useEffect, useState } from "react";
import { Container } from "../../components/BasicComponents"
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FlatList } from "react-native-gesture-handler";
import { GameRouteNames } from "../../router/RouteNames"
import { getAllGames } from "../../api";
import GameListingEntry from "../../components/GameListingEntry";
import { getUserDetails, createGame } from "../../api";

const LobbyPage = () => {
  const navigation = useNavigation<any>()

  const [gamesList, setGamesList] = useState<any[]>([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    getGamesList()
  }, [])

  const retrieveUserId = async () => {
    try {
      const result = await getUserDetails();
      setUserId(() => JSON.parse(JSON.stringify(result.user)).id)
    } catch (error) {
        console.log(error)
    }
  }

  const getGamesList = async () => {
    try {
      await  retrieveUserId();
      const result = await getAllGames();

      // console.log("Get games list result: " + result)
      let games = []
      for(let i = 0; i < result.games.length; i++)
        if(result.games[i].player1Id === userId || result.games[i].player2Id === userId
            || result.games[i].player1Id === null || result.games[i].player2Id === null) {
            games.push(result.games[i])
          }
      
      setGamesList(() => games)
    } catch (error) {
      console.log(error)
    }
  }

  const createNewGame = async () => {
    try {
      const result = await createGame();

      console.log("Create game result: " + result)
      getGamesList()
    } catch (error) {
      console.log(error)
    }
  }
  
  const goToUserDetails = () => {
    navigation.navigate(GameRouteNames.USER_DETAILS)
  }

  return (
    <Container style={styles.mainContainer}>
   
      <Container style={styles.topContainer}>
        <Button onPress={createNewGame} style={{alignItems: "center", backgroundColor: "#73bbff"}}>
          <Text style={{fontSize: 20}}>Create game</Text>
        </Button>

        <View style={{}}>
          <Text style={{fontSize: 30, fontWeight: "bold"}}>Games List</Text>
        </View>

        <Button onPress={goToUserDetails} style={{alignItems: "center", backgroundColor: "#73bbff"}}>
          <Text style={{fontSize: 20}}>User Details</Text>
        </Button>
      </Container>

      <FlatList
        data={gamesList}
        renderItem={(game) => (
          <GameListingEntry game={game.item} />
        )}
        keyExtractor={(game) => game.id}
        style={{marginBottom: 10}}
        contentContainerStyle={{justifyContent: "space-between", flexDirection: "column"}}
      />
    </Container>
  );
}

export default LobbyPage;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignSelf: "center",
    height: "100%"
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    height: "auto"
  }
});

export const Input = styled.TextInput`
    width: 30%;
    height: 30px;
    border: 1px solid;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc; /* Same border style as Button */
    border-radius: 5px; /* Matching rounded corners */
    align-self: center;
`

export const Button = styled.TouchableOpacity`
  width: 30%;
  padding: 10px 15px; 
  border: 1px solid #ccc; 
  margin-bottom: 10px;
  border-radius: 5px; 
  color: white; 
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease; 
`;