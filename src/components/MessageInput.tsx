import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function MessageInput({ onSendMessage }: any) {
  const [uusiViesti, setUusiViesti] = useState('');

  const laheta = () => {
    if (uusiViesti !== '') {
      onSendMessage(uusiViesti);
      setUusiViesti('');
    }
  };

  return (
    <View style={styles.syottoAlue}>
      <TextInput
        style={styles.tekstikentta}
        placeholder="Kirjoita viesti"
        value={uusiViesti}
        onChangeText={setUusiViesti}
      />
      <Button 
        title="Lähetä" 
        onPress={laheta} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  syottoAlue: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
  },
  tekstikentta: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
  }
});