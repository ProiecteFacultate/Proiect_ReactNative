import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { AuthRouteNames } from './RouteNames';
import { Text } from 'react-native'

const AuthStack = createNativeStackNavigator()

const AuthRoutes = (
    <AuthStack.Navigator initialRouteName='Register'>
        <AuthStack.Screen name={AuthRouteNames.REGISTER} component={RegisterScreen} options={{
            headerTitle: (props) => <Text {...props}>Register</Text>
        }}/>
    </AuthStack.Navigator>
)

export default AuthRoutes;