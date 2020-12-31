import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./Components/Home";
import CountryList from "./Components/CountryList";
import CountryStatics from "./Components/CountryStatics";
function App(){
  const Drawer = createDrawerNavigator();
  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Statistics Screen">
        <Drawer.Screen name="World Statistics Screen" component={Home} />
        <Drawer.Screen name="Country Statistics Screen" component={CountryList} />
        <Drawer.Screen name="Country Statistics" component={CountryStatics} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;