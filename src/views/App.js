import 'react-native-gesture-handler';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Login';
import Reviews from './Reviews';
import Review from './Review';
import Reply from './Reply';

import {signOut as googleSignOut} from '../viewModels/googleViewModel';
import {viewUtilities} from './utilities/viewUtilities';

import STYLE_CONSTANTS from './constants/styleConstants';

const Stack = createStackNavigator();

const App = () => {
  const signOut = async navigation => {
    try {
      await googleSignOut();
      navigation.goBack();
    } catch (e) {
      viewUtilities.showGenericError();
      // TODO: Log error in logger.
    }
  };

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={({navigation}) => ({
              headerLeft: null,
              headerRight: () => {
                return (
                  <Icon
                    containerStyle={styles.logout}
                    onPress={() => signOut(navigation)}
                    name="log-out-outline"
                    type="ionicon"
                    size={STYLE_CONSTANTS.RATING_STAR_SIZE}
                    color="blue"
                  />
                );
              },
            })}
          />
          <Stack.Screen name="Review" component={Review} />
          <Stack.Screen name="Reply" component={Reply} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
};

const styles = StyleSheet.create({
  logout: {
    marginRight: STYLE_CONSTANTS.SMALL_MARGIN,
  },
});

export default App;
