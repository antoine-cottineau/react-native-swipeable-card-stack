import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { CatDataItem } from './CatDataItem';
import { Image } from 'expo-image';
import type { CardProps } from 'react-native-swipeable-card-stack';
import { CatCardOverlay } from './CatCardOverlay';

export type CatCardProps = CardProps<CatDataItem>;

const UnmemoizedCatCard = ({
  name,
  imageUrl,
  xAnimatedPosition,
  yAnimatedPosition,
}: CatCardProps) => {
  console.log('render', name);

  return (
    <View style={styles.container}>
      <Image source={imageUrl} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
      <CatCardOverlay
        xAnimatedPosition={xAnimatedPosition}
        yAnimatedPosition={yAnimatedPosition}
      />
    </View>
  );
};

export const CatCard = memo(UnmemoizedCatCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'purple',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'purple',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    padding: 16,
    color: 'white',
  },
});
