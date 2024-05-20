import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from '../pages/auth/RegisterPage';
import LoginPage from '../pages/auth/LoginPage';
import { AuthRouteNames } from './RouteNames';
import { Text } from 'react-native'

const AuthStack = createNativeStackNavigator()

const AuthRoutes = (
    <AuthStack.Navigator initialRouteName={AuthRouteNames.LOGIN}>
        <AuthStack.Screen name={AuthRouteNames.LOGIN} component={LoginPage} options={{
            headerTitle: (props) => <Text {...props}>Login Page</Text>
        }}/>
        
        <AuthStack.Screen name={AuthRouteNames.REGISTER} component={RegisterPage} options={{
            headerTitle: (props) => <Text {...props}>Register Page</Text>
        }}/>
    </AuthStack.Navigator>
)

export default AuthRoutes;