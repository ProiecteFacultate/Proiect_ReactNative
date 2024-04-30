import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from "./AuthRouter";
import GameRoutes from "./GameRouter";
import { useAuthContext } from "../hooks/AuthContext";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Router: React.FC  = () => {
  const authContext = useAuthContext();

    if (authContext.isLoading) {
        return (
          <SafeAreaView>
            <Text>LOADING</Text>
          </SafeAreaView>
        )
    }

 return (
    <NavigationContainer>
      {authContext.isAuthenticated() ? GameRoutes : AuthRoutes}
    </NavigationContainer>
  )
}

export default Router;