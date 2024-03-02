import { useRef } from 'react'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { SwipeableCardRef } from 'react-native-swipeable-card-stack/dist/SwipeableCardStack'
import { CatCard } from './CatCard'
import { cats } from './cats'

export const CatStack = () => {
  const ref = useRef<SwipeableCardRef>(null)

  return (
    <SwipeableCardStack
      data={cats}
      renderCard={(props) => (
        <CatCard
          {...props}
          onAction={(action) => {
            if (action === 'swipe-left') {
              ref.current?.swipeLeft()
              return
            }
            if (action === 'swipe-right') {
              ref.current?.swipeRight()
            }
          }}
        />
      )}
      ref={ref}
    />
  )
}
