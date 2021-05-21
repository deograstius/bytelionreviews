import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const configureSignIn = () => {
  GoogleSignin.configure();
};

export const signIn = async () => {
  // Make sure the user has play services.
  await GoogleSignin.hasPlayServices();
  return await GoogleSignin.signIn();
};

export const isSignedIn = async () => {
  return await GoogleSignin.isSignedIn();
};

export const getCurrentUser = async () => {
  return await GoogleSignin.getCurrentUser();
};

export const signOut = async () => {
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
};
