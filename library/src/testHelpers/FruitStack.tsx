import { useRef } from 'react'
import { Button, View, Text } from 'react-native'
import {
  SwipeableCardStack,
  type SwipeableCardStackProps,
  type RenderCardProps,
  type SwipeableCardStackRef,
} from '..'

export type FruitItem = {
  fruit: string
}

type FruitCardProps = RenderCardProps<FruitItem>

const FruitCard = ({ data }: FruitCardProps) => (
  <View>
    <Text>{data.fruit}</Text>
  </View>
)

export const FruitStack = (
  props?: Partial<SwipeableCardStackProps<FruitItem>>,
) => {
  const ref = useRef<SwipeableCardStackRef>(null)

  return (
    <>
      <SwipeableCardStack
        data={[
          { fruit: 'banana' },
          { fruit: 'apple' },
          { fruit: 'lemon' },
          { fruit: 'strawberry' },
        ]}
        renderCard={FruitCard}
        ref={ref}
        {...props}
      />
      <Button title="Swipe right" onPress={() => ref.current?.swipe('right')} />
      <Button title="Swipe left" onPress={() => ref.current?.swipe('left')} />
      <Button title="Swipe top" onPress={() => ref.current?.swipe('top')} />
      <Button
        title="Swipe bottom"
        onPress={() => ref.current?.swipe('bottom')}
      />
    </>
  )
}
