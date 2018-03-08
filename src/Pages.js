import { StackNavigator } from 'react-navigation';

import Home from './components/Home/Home';
import Animals from './components/Animals/Animals';
import Favorites from './components/Favorites/Favorites';
import Description from './components/Description/Description';


export const Pages = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Animals: {
    screen: Animals,
  },
  Favorites: {
    screen: Favorites,
  },
  Description: {
    screen: Description,
  },
});

export default Pages;
