import { useState } from "react";
import { Container } from "../../components/BasicComponents"
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native"
import { Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRouteNames } from "../../router/RouteNames"
import { register } from "../../api";

const RegisterPage = () => {
  const navigation = useNavigation<any>()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActiveRegisterSuccessText, setIsActiveRegisterSuccessText] = useState(false)

  const registerUser = async () => {
    try {
       if(email === '')
        {
          alert("'Email' can't be empty");
          return;
        }
        else if(password === '')
        {
          alert("'Password' can't be empty");
          return;
        }  

        const result = await register(email, password);
        console.log("Register result: " + result)

        if(result.code != 'undefined' && result.code == 409 && result.message === "Need to specify a different email") 
          alert("The email you entered is already used!");
        else if(result.id != 'undefined')
          setIsActiveRegisterSuccessText(() => true);
    } catch (error) {
        console.log(error)
    }
  };

  const goToLogin = () => {
    navigation.navigate(AuthRouteNames.LOGIN)
  }

  return (
    <Container style={styles.mainContainer}>
      <Input placeholder="Email" keyboardType="email-address" onChangeText={setEmail}/>
      <Input placeholder="Password" secureTextEntry onChangeText={setPassword}/>
      <Button onPress={registerUser} style={{alignSelf: 'center'}}>
        <Text style={{alignSelf: 'center'}}>Register</Text>
      </Button>

      <Button onPress={goToLogin} style={{alignSelf: 'center'}}>
        <Text style={{alignSelf: 'center'}}>Go To Login</Text>
      </Button>

      {
        isActiveRegisterSuccessText &&
        <Text style={styles.warningTextStyle}>     
          Successfully registered!{"\n"}Go back to 'Login' page to sing in!
        </Text>
      }
    </Container>
  );
}

export default RegisterPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  warningTextStyle: {
    alignSelf: 'center', 
    color: 'green', 
    textAlign: 'center', 
  }
});


export const Input = styled.TextInput`
    width: 70%;
    height: 50px; 
    margin-bottom: 10px;
    padding: 8px;
    border: 2px solid #0aa1ff; 
    border-radius: 5px;
    align-self: center;
`

export const Button = styled.TouchableOpacity`
    width: 40%;
    padding: 10px 15px; 
    margin-bottom: 10px;
    border: 2px solid; 
    border-radius: 5px;
    color: white; 
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease; 
`;