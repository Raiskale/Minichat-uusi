import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MessageInput from '../components/MessageInput';
import MessageBubble from '../components/MessageBubble';

export default function ChatScreen() {
  const { username } = useLocalSearchParams();
  const [viestit, setViestit] = useState([]);

  const API_URL = 'http://localhost/minichat/api.php';

  const haeViestit = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setViestit(data);
    } catch (error) {
      console.error('Virhe viestien haussa:', error);
    }
  };

  useEffect(() => {
    haeViestit();
    const interval = setInterval(haeViestit, 3000);
    return () => clearInterval(interval); 
  }, []);

  const kasitteleUusiViesti = async (teksti: string) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: username, 
          text: teksti,     
        }),
      });
      

      haeViestit();
    } catch (error) {
      console.error('Virhe viestin lähetyksessä:', error);
    }
  };

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.viestiAlue}>
        <Text style={styles.infoTeksti}>Tervetuloa chattiin, {username}!</Text>
        
        {viestit.map((viesti: any) => (
          <MessageBubble 
            key={viesti.id} 
            text={viesti.text} 
            sender={viesti.sender} 
            isMe={viesti.sender === username} 
          />
        ))}
      </ScrollView>

      <MessageInput onSendMessage={kasitteleUusiViesti} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  viestiAlue: {
    flex: 1,
    padding: 10,
  },
  infoTeksti: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
    marginTop: 10,
  }
});