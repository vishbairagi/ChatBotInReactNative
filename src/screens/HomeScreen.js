
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You AI Assistant</Text>
      <Text style={styles.subtitle}>
        Using this software, you can ask you{"\n"}
        questions and receive articles using{"\n"}
        artificial intelligence assistant
      </Text>

      <Image
        source={require('../../assets/ChatBot.png')} // Put your image in assets folder
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChatScreen')}
      >
        <Text style={styles.buttonText}>Continue →</Text>
        <Text style={styles.arrow}></Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    color: '#2b60ff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  button: {
    backgroundColor: '#2b60ff',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
});
