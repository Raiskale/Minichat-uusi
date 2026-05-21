import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [nimimerkki, setNimimerkki] = useState('');

  const siirryChattiin = () => {
    if (nimimerkki !== '') {
     
      router.push(`/chat?username=${nimimerkki}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.otsikko}>MiniChat</Text>

      <TextInput
        placeholder="Kirjoita nimimerkki tähän"
        style={styles.tekstikentta}
        value={nimimerkki}
        onChangeText={setNimimerkki}
      />

      <Button 
        title="Aloita keskustelu" 
        onPress={siirryChattiin} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  otsikko: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  tekstikentta: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
  }
});