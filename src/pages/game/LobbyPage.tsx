import { useEffect, useState } from "react";
import { Container } from "../../components/BasicComponents"
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameRouteNames } from "../../router/RouteNames"
import { getGames } from "../../api";

const LobbyPage = () => {
  const navigation = useNavigation<any>()

  useEffect(() => {
    getGamesList()
  }, [])

  const getGamesList = async () => {
    try {
       const result = await getGames();
       console.log("Get games list result: " + result)
   } catch (error) {
       console.log(error)
   }
  }

  const goToUserDetails = () => {
    navigation.navigate(GameRouteNames.USER_DETAILS)
  }

  return (
    <Container>
      <Text>LOBBBY</Text>
      <Button onPress={goToUserDetails}>
        <Text>Go To User Details</Text>
      </Button>
    </Container>
  );
}

export default LobbyPage;



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
  width: 10%;
  padding: 10px 15px; 
  border: 1px solid #ccc; 
  margin-bottom: 10px;
  border-radius: 5px; 
  color: white; 
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: #45a049; 
  }
`;