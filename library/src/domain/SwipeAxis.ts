export const allAxis = ['horizontal', 'vertical'] as const

export type SwipeAxis = (typeof allAxis)[number]
