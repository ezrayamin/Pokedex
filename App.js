import React from 'react'
// import SplashScreen from 'react-native-splash-screen'
import {NavigationContainer} from '@react-navigation/native'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
// import {View, Text} from 'react-native'
import allReducer from './src/reducer'
import MainNav from './src/navigation/main-navigation'

const globalStore = createStore(
  allReducer,
  {},
   composeWithDevTools(applyMiddleware(ReduxThunk))
)

// React.useEffect(() => {
//  SplashScreen.hide()
// }, [])

const App = () => {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <MainNav/>
      </NavigationContainer>
    </Provider>
  )
}

export default App
