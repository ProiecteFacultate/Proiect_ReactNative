import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameRouteNames } from './RouteNames';
import { Text } from 'react-native'
import UserDetailsPage from '../pages/auth/UserDetailsPage';
import LobbyPage from '../pages/game/LobbyPage';
import GamePage from '../pages/game/GamePage';

const GameStack = createNativeStackNavigator()

const GameRoutes = (
    <GameStack.Navigator initialRouteName={GameRouteNames.LOBBY}>
        <GameStack.Screen name={GameRouteNames.LOBBY} component={LobbyPage} options={{
            headerTitle: (props) => <Text {...props}>Game Lobby Page</Text>
        }}/>

        <GameStack.Screen name={GameRouteNames.USER_DETAILS} component={UserDetailsPage} options={{
            headerTitle: (props) => <Text {...props}>User Details Page</Text>
        }}/>

        <GameStack.Screen name={GameRouteNames.GAME} component={GamePage} options={{
            headerTitle: (props) => <Text {...props}>Game Page</Text>
        }}/>
    </GameStack.Navigator>
)

export default GameRoutes;