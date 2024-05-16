import { useEffect, useState } from "react";
import { Container } from "../../components/BasicComponents"
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native"
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRouteNames } from "../../router/RouteNames"
import { getUserDetails } from "../../api";

const UserDetailsPage = () => {
  const navigation = useNavigation<any>()

  const [userDetails, setUserDetails] = useState({});
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    retrieveUserDetails()
  }, []);

  const retrieveUserDetails = async () => {
    try {
      const result = await getUserDetails();
      setUserDetails(() => result)
      setUserEmail(() => JSON.parse(JSON.stringify(result.user)).email)
    } catch (error) {
        console.log(error)
    }
  }

  const logOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    window.location.reload(); //accestToken key no longer in storage, so on reload we are sent to login
  }

  return (
    <Container style={styles.container}> 

        <Container style={styles.statisticsContainer}>
          <Text style={styles.heading}>Statistics for '{userEmail}'</Text>

          <View style={styles.statisticItem}>
            <Text>Games Played</Text>
            <Text>{userDetails.gamesPlayed}</Text>
          </View>

          <View style={styles.statisticItem}>
            <Text>Games Lost</Text>
            <Text>{userDetails.gamesLost}</Text>
          </View>

          <View style={styles.statisticItem}>
            <Text>Games Won</Text>
            <Text>{userDetails.gamesWon}</Text>
          </View>

          <View style={styles.statisticItem}>
            <Text>Currently Games Playing</Text>
            <Text>{userDetails.currentlyGamesPlaying}</Text>
          </View>
        </Container>

        <Button onPress={logOut} style={{alignSelf: 'center'}}>
          <Text style={{alignSelf: 'center'}}>Log out</Text>
        </Button>  
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    marginHorizontal: "auto"
  },

  statisticsContainer: {
    alignItems: 'center',
    height: "60%"
  },

  heading: {
    fontSize: 20,
    marginBottom: 10,
  },

  statisticItem: {
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0f0",
    borderRadius: 10,
    marginBottom: 10,
  }
});

export const Button = styled.TouchableOpacity`
  width: 50%;
  padding: 10px 15px; 
  margin-bottom: 10px;
  border: 2px solid #ff0a3f; 
  border-radius: 5px; 
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease; 
`;

export default UserDetailsPage;