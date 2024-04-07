export const allAxis = ['x', 'y'] as const

export type SwipeAxis = (typeof allAxis)[number]
