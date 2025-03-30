import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
};

export const ActionButton = ({ text, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'plum',
    padding: 12,
    borderRadius: 1000,
    boxShadow:
      '0 4px 10px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(35, 35, 35, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  },
  text: {
    fontSize: 28,
  },
});
