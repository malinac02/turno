import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from '../assets/Themes';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Onboarding() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');


  const handleLogIn = () => {
    // Placeholder for the login functionality
    console.log('Log In');
  };

  //import poppins
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/Poppins/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/Poppins/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return undefined;
    }

  const handleSignUp = () => {
    // Placeholder for the sign-up functionality
    console.log('Sign Up');
  };

  const renderOnboarding = () => {
    return (
      <View style={styles.container}>
        <View style={styles.onboardingSpacing}/>
        <Image source={require('../assets/Themes/Images/DiceFaces/Dice-3.png')} style={styles.logo} />  
        <Text style={styles.title}>Turno</Text>
        <Text style={styles.subtitle}>Roll your way through the day</Text>
        <TouchableOpacity onPress={() => setCurrentScreen('log in')} style={styles.loginButton}>
            <Text style={styles.onBoardingButtonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Sign Up" onPress={() => setCurrentScreen('sign up')} style={styles.signUpButton}>
            <Text style={styles.onBoardingButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLogIn = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentScreen('onboarding')} style={styles.backCaret}>
            <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.spacing}/>
        <Image source={require('../assets/Themes/Images/DiceFaces/Dice-3.png')} style={styles.logo} />  
        <Text style={styles.title}>Turno</Text>
        <Text style={styles.subtitle}>Roll your way through the day</Text>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
            <Link
            href={{
                pathname: "/roll",
            }}
            >
        <TouchableOpacity  onPress={handleLogIn} style={styles.loginButton}>
                
                <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        </Link>
      </View>
    );
  };

  const renderSignUp = () => {
    return (
      <View style={styles.container}>
         <TouchableOpacity onPress={() => setCurrentScreen('onboarding')} style={styles.backCaret}>
            <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Turno</Text>
        <Text style={styles.subtitle}>Roll your way through the day</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <Link href={{ pathname: '/roll' }}>
        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
            <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        </Link>
        <Text style={styles.loginText} onPress={() => setCurrentScreen('log in')}>
          Already have an account? Log In
        </Text>
      </View>
    );
  };

  switch (currentScreen) {
    case 'log in':
      return renderLogIn();
    case 'sign up':
      return renderSignUp();
    default:
      return renderOnboarding();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: Themes.colors.background,
    zIndex: 1,
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 8,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
    loginButton: {
    width: windowWidth * 0.6,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 16,
    backgroundColor: Themes.colors.salmon,
    
    },
    loginText: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: 'white',
    },
  signUpButton: {
    width: windowWidth * 0.8,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { height: 4, width: 1 },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    marginTop: 16,
    backgroundColor: Themes.colors.salmon,
  },
    loginButton: {
        width: windowWidth * 0.8,
        alignItems: 'center',
        width: windowWidth * 0.8,
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 16,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { height: 4, width: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
        marginTop: 16,
        backgroundColor: Themes.colors.blue,
    },

  onBoardingButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  backCaret: {
    alignSelf: 'flex-start',
    marginTop: 50,
    alignSelf: 'flex-start',
    width: windowWidth * 0.9,
    height: 50,
  },
  spacing: {
    height: windowHeight * 0.25 - 100
  },
  onboardingSpacing: {
    height: windowHeight * 0.25 
  },
 
});
