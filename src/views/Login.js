import React, {useEffect, useState} from 'react';
import {Alert, View, Image, StyleSheet} from 'react-native';

import {
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  configureSignIn,
  signIn as signInWithGoogle,
  isSignedIn,
  getCurrentUser,
} from '../viewModels/googleViewModel';

import {viewUtilities} from './utilities/viewUtilities';

import STYLE_CONSTANTS from './constants/styleConstants';
import IMAGE_CONSTANTS from './constants/imageConstants';

const Login = ({navigation}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    configureSignIn();
    signInIfUserAlreadySignedIn();
  }, []);

  const showSignInError = error => {
    switch (error.code) {
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        Alert.alert(
          'Error',
          'Please make sure your device has Google Play Services before continueing.',
        );
        break;
      default:
        // Since we don't know why it failed, show a generic error.
        viewUtilities.showGenericError();
    }
    // TODO: Log error in logger.
  };
  const signIn = async () => {
    setIsSigningIn(true);
    try {
      // If the user successfully signs in go to reviews.
      //  NOTE: signInWithGoogle returns user information.
      goToReviews(await signInWithGoogle());
    } catch (error) {
      showSignInError(error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const signInIfUserAlreadySignedIn = async () => {
    // If the user is signed in, move them to the reviews page.
    if (await isSignedIn()) {
      goToReviews(await getCurrentUser());
    }
  };

  const goToReviews = ({user}) => {
    navigation.navigate('Reviews', {user});
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={IMAGE_CONSTANTS.LOGO}
        resizeMode="contain"
      />
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
        disabled={isSigningIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '50%',
    height: STYLE_CONSTANTS.BUTTON_HEIGHT,
    marginBottom: STYLE_CONSTANTS.SMALL_MARGIN,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    width: '50%',
    height: STYLE_CONSTANTS.BUTTON_HEIGHT,
  },
});

export default Login;
