import { useEffect, useState } from "react";
import { Container } from "../../components/BasicComponents"
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRouteNames } from "../../router/RouteNames"
import { getUserDetails } from "../../api";

const UserDetailsPage = () => {
  const navigation = useNavigation<any>()

  const [email, setEmail] = useState('');

  useEffect(() => {
    retrieveUserDetails()
  }, []);

  const retrieveUserDetails = async () => {
    try {
        const emailFromStorage = await AsyncStorage.getItem('email');

        if(emailFromStorage != null && emailFromStorage != 'undefined' && emailFromStorage !== '') {
            setEmail(() => emailFromStorage); 
            const result = await getUserDetails(0, emailFromStorage);
            console.log("Get user result: " + result)
        } 
        else {
            console.log("Email from storage not exist!")
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Container>
      <Text>User details</Text>
    </Container>
  );
}

export default UserDetailsPage;