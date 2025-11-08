import { memo, type ReactElement } from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { SwipeableCardContainer } from './SwipeableCardContainer';
import type {
  AllowedPanDirection,
  AnimationConfigs,
  RenderCard,
  SwipeDirection,
} from 'react-native-swipeable-card-stack';

export type SwipeableCardStackProps<T> = {
  /** Array of items to be rendered as cards. */
  data: T[];

  /**
   * Array of swipe directions corresponding to each card's state.
   * @example ['right', 'right', 'left'] // First two cards swiped right, third swiped left
   */
  swipes: SwipeDirection[];

  /**
   * Function to render each card.
   * @param props - Contains item data and animated position values.
   * @returns React element representing the card.
   */
  renderCard: RenderCard<T>;

  /**
   * Function to extract a unique key for each card item for performance optimization.
   * @param item - Individual item from the data array.
   * @returns A unique string identifier.
   */
  keyExtractor: (item: T) => string;

  /**
   * Allowed directions for card panning (moving a card with gestures).
   * @default ['left', 'right']
   * @example ['left', 'right', 'up', 'down']
   */
  allowedPanDirections?: AllowedPanDirection[];

  /**
   * Allowed directions for card swiping (validating a swipe towards a direction).
   * @default ['left', 'right']
   * @example ['left', 'right', 'up', 'down']
   */
  allowedSwipeDirections?: AllowedPanDirection[];

  /**
   * Minimum horizontal translation to trigger a swipe.
   * @default 0.3 * windowWidth
   * @unit points
   */
  horizontalTranslationValidationThreshold?: number;

  /**
   * Minimum horizontal velocity to trigger a swipe.
   * @default 1000
   * @unit points/second
   */
  horizontalVelocityValidationThreshold?: number;

  /**
   * Minimum vertical translation to trigger a swipe.
   * @default 0.3 * windowHeight
   * @unit points
   */
  verticalTranslationValidationThreshold?: number;

  /**
   * Minimum vertical velocity to trigger a swipe.
   * @default 1000
   * @unit points/second
   */
  verticalVelocityValidationThreshold?: number;

  /**
   * Number of cards to render beyond the swiped cards.
   * A value of 3 is typically sufficient to prevent blank spaces during rapid swiping.
   * @default 3
   */
  numberOfUnswipedCardsToRender?: number;

  /**
   * Final resting position for horizontal swipes.
   * @default screenWidth
   * @unit points
   */
  horizontalRestingPosition?: number;

  /**
   * Final resting position for vertical swipes.
   * @default screenHeight
   * @unit points
   */
  verticalRestingPosition?: number;

  /**
   * Callback fired when a card swipe animation completes.
   * @param item - The item that was swiped.
   * @param direction - The direction the card was swiped towards.
   */
  onSwipeEnded?: (item: T, direction: SwipeDirection) => void;

  /** Style prop for the container View. */
  style?: StyleProp<ViewStyle>;

  /** Additional props to pass to the container View. */
  viewProps?: Omit<ViewProps, 'style'>;
} & AnimationConfigs;

const UnmemoizedSwipeableCardStack = <T,>({
  data,
  swipes,
  renderCard,
  keyExtractor,
  onSwipeEnded,
  allowedPanDirections = ['left', 'right'],
  allowedSwipeDirections = ['left', 'right'],
  numberOfUnswipedCardsToRender = 3,
  horizontalTranslationValidationThreshold,
  horizontalVelocityValidationThreshold = 1000,
  verticalTranslationValidationThreshold,
  verticalVelocityValidationThreshold = 1000,
  horizontalRestingPosition,
  verticalRestingPosition,
  style,
  viewProps,
  ...animationConfigs
}: SwipeableCardStackProps<T>) => (
  <View style={[styles.container, style]} {...viewProps}>
    <View style={styles.innerContainer}>
      {data.toReversed().map((item, i) => {
        const itemIndex = data.length - 1 - i;
        const cardState = swipes[itemIndex];
        if (itemIndex > swipes.length + numberOfUnswipedCardsToRender) {
          return null;
        }

        return (
          <SwipeableCardContainer
            item={item}
            renderCard={renderCard}
            cardState={cardState}
            horizontalTranslationValidationThreshold={
              horizontalTranslationValidationThreshold
            }
            horizontalVelocityValidationThreshold={
              horizontalVelocityValidationThreshold
            }
            verticalTranslationValidationThreshold={
              verticalTranslationValidationThreshold
            }
            verticalVelocityValidationThreshold={
              verticalVelocityValidationThreshold
            }
            allowedPanDirections={allowedPanDirections}
            allowedSwipeDirections={allowedSwipeDirections}
            onSwipeEnded={onSwipeEnded}
            horizontalRestingPosition={horizontalRestingPosition}
            verticalRestingPosition={verticalRestingPosition}
            key={keyExtractor(item)}
            {...animationConfigs}
          />
        );
      })}
    </View>
  </View>
);

/**
 * A component that renders a stack of swipeable cards with customizable swipe directions,
 * animations, and gesture handling.
 *
 * @template T - The type of data items to be rendered as cards
 *
 * @example
 * ```tsx
 * const CardStack = () => {
 *   const [swipes, setSwipes] = useState(['right']); // First card already swiped right
 *
 *   const cards = [
 *     { id: '1', title: 'Swipe me!' },
 *     { id: '2', title: 'Next card' },
 *     { id: '3', title: 'Last one' },
 *   ];
 *
 *   return (
 *     <SwipeableCardStack
 *       data={cards}
 *       swipes={swipes}
 *       renderCard={({ item }) => (
 *         <View>
 *           <Text>{item.title}</Text>
 *         </View>
 *       )}
 *       keyExtractor={item => item.id}
 *       onSwipeEnded={(_, direction) => setSwipes(current => [...current, direction])}
 *     />
 *   );
 * };
 * ```
 */
export const SwipeableCardStack = memo(UnmemoizedSwipeableCardStack) as <T>(
  props: SwipeableCardStackProps<T>
) => ReactElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});
