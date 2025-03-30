import {
  SwipeableCardStack,
  type SwipeDirection,
} from 'react-native-swipeable-card-stack';
import { useCallback, useState } from 'react';
import { cats } from './cats';
import { type CatCardProps, CatCard } from './CatCard';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { CatDataItem } from './CatDataItem';
import { ActionButton } from './ActionButton';

export const CatStack = () => {
  const [data, setData] = useState<CatDataItem[]>(cats);
  const [swipes, setSwipes] = useState<SwipeDirection[]>([]);
  const { bottom } = useSafeAreaInsets();

  const onSwipeEnded = useCallback(
    (_: CatDataItem, direction: SwipeDirection) => {
      setSwipes((current) => [...current, direction]);
      console.log(_.name, direction);
    },
    []
  );

  return (
    <View style={styles.container}>
      <SwipeableCardStack
        data={data}
        swipes={swipes}
        renderCard={renderCard}
        keyExtractor={keyExtractor}
        onSwipeEnded={onSwipeEnded}
        allowedPanDirections={['left', 'right', 'top', 'bottom']}
        allowedSwipeDirections={['left', 'right', 'top', 'bottom']}
        style={styles.stack}
      />
      <View style={styles.actionButtonsContainer}>
        <ActionButton
          text="⬅️"
          onPress={() => {
            setSwipes((current) => [...current, 'left']);
          }}
        />
        <ActionButton
          text="💥"
          onPress={() => {
            setSwipes((current) => [...current, 'unknown']);
          }}
        />
        <ActionButton
          text="🔄"
          onPress={() => {
            setData(cats);
            setSwipes([]);
          }}
        />
        <ActionButton
          text="🐱"
          onPress={() => {
            setData((currentData) => [...currentData, generateCat()]);
          }}
        />
        <ActionButton
          text="➡️"
          onPress={() => {
            setSwipes((current) => [...current, 'right']);
          }}
        />
      </View>
      <View style={{ height: bottom + 16 }} />
    </View>
  );
};

const renderCard = (props: CatCardProps) => <CatCard {...props} />;

const keyExtractor = (item: CatDataItem) => item.name;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stack: {
    padding: 16,
    paddingTop: 64,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    gap: 16,
  },
});

const generateCat = (): CatDataItem => ({
  name: generateRandomCatName(12),
  age: 17,
  imageUrl: '',
  hasLikedMyProfile: false,
});

const generateRandomCatName = (length: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};
