import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ text, sender, isMe }: any) {
  return (
    <View style={[styles.kupla, isMe ? styles.omaKupla : styles.muidenKupla]}>
      <Text style={styles.lahettajaNimi}>{sender}</Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  kupla: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%', 
  },
  omaKupla: {
    backgroundColor: '#dcf8c6', 
    alignSelf: 'flex-end', 
  },
  muidenKupla: {
    backgroundColor: '#ffffff', 
    alignSelf: 'flex-start', 
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  lahettajaNimi: {
    fontSize: 11,
    color: 'gray',
    marginBottom: 3,
  }
});