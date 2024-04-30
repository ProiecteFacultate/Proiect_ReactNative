import 'react-native-gesture-handler';
import Router from './src/router/Router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/hooks/AuthContext';

export default function App() {
  return ( 
      <SafeAreaProvider>
        <AuthContextProvider>
          <Router/>
        </AuthContextProvider>
      </SafeAreaProvider>  
  );
}
