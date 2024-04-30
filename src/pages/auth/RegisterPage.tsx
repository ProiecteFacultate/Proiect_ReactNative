import { useState } from "react";
import { Container } from "../../components/BasicComponents"
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native";
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
          alert("'Email' can't be empty");
        else if(password === '')
          alert("'Password' can't be empty");

        const result = await register(email, password);
        console.log("Register result: " + result)

        if(result.code != 'undefinde' && result.code == 409 && result.message === "Need to specify a different email") 
          alert("The email you entered is already used!");
        else if(result.id != 'undefinde')
          setIsActiveRegisterSuccessText(() => true);
    } catch (error) {
        console.log(error)
    }
  };

  const goToLogin = () => {
    navigation.navigate(AuthRouteNames.LOGIN)
  }

  return (
    <Container>
      <Input placeholder="Email" keyboardType="email-address" onChangeText={setEmail}/>
      <Input placeholder="Password" secureTextEntry onChangeText={setPassword}/>
      <Button onPress={registerUser} style={{alignSelf: 'center'}}>
        <Text style={{alignSelf: 'center'}}>Register</Text>
      </Button>

      <Button onPress={goToLogin} style={{alignSelf: 'center'}}>
        <Text style={{alignSelf: 'center'}}>Go To Login</Text>
      </Button>

      ({
        isActiveRegisterSuccessText &&
        <Text style={{alignSelf: 'center', color: 'green', textAlign: 'center'}}>     
          Successfully registered!{"\n"}Go back to 'Login' page to sing in!
        </Text>
      })
    </Container>
  );
}

export default RegisterPage;


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