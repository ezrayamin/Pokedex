import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import HomePage from '../pages/home'
import PokemonDetail from '../pages/pokemonDetail'

const MainNav = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="home" 
            component={HomePage}
            options={{headerShown: false}}
            />
            <Stack.Screen 
            name="pokemon-details" 
            component={PokemonDetail}
            options={{headerShown: false}}
            />
        </Stack.Navigator>       
    )
}

export default MainNav