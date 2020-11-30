import {name as appName} from './app.json';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
import { registerComponents } from './src/components';

registerScreens();
registerComponents();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'yuddomack.HomeScreen', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {
      navBarHidden: false,
    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  screen: {
    screen: 'yuddomack.ExerciseScreen', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {
      navBarHidden: false,
    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  screen: {
    screen: 'yuddomack.RoutineScreen', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {
      navBarHidden: false,
    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  screen: {
    screen: 'yuddomack.HealthScreen', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {
      navBarHidden: false,
    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  screen: {
    screen: 'yuddomack.SettingsScreen', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {
      navBarHidden: false,
    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  }
});