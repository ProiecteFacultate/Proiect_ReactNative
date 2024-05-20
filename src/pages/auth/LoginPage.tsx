import { useEffect, useState } from "react";
import { Container } from "../../components/BasicComponents"
import styled from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native"
import { Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRouteNames, GameRouteNames } from "../../router/RouteNames"
import { login } from "../../api";

const LoginPage = () => {
  const navigation = useNavigation<any>()
  const route = useRoute()

  const [windowReloadKey, setWindowReloadKey] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      if(email === '')
        alert("Fill 'Email' field");
      else if(password === '')
        alert("Fill 'Password' field");

        const result = await login(email, password);
        console.log("Login result: " + JSON.stringify(result))
    
        if(result.code != 'undefined' && result.code == 403 && result.message === "User email or password do not match")
          alert("Wrong email or password")!
        else if(result.accessToken != 'undefined') { //it means login succedeed
          await AsyncStorage.setItem('accessToken', result.accessToken);
        }
        
    } catch (error) {
        console.log(error)
    }
  };

  const goToRegister = () => {
    navigation.navigate(AuthRouteNames.REGISTER)
  }

  return (
    <Container>
      <Input placeholder="Email" keyboardType="email-address" onChangeText={setEmail}/>
      <Input placeholder="Password" secureTextEntry onChangeText={setPassword}/>
      <Button onPress={loginUser} style={{alignSelf: 'center'}}>
        <Text style={{alignSelf: 'center'}}>Login</Text>
      </Button>

      <Button onPress={goToRegister} style={{alignSelf: 'center'}}>
        <Text style={{alignSelf: 'center'}}>Go To Register</Text>
      </Button>  
    </Container>
  );
}

export default LoginPage;


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