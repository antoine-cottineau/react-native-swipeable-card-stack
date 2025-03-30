"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[924],{7161:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>o});const a=JSON.parse('{"id":"getting-started","title":"Getting Started","description":"Installation","source":"@site/docs/getting-started.md","sourceDirName":".","slug":"/getting-started","permalink":"/react-native-swipeable-card-stack/getting-started","draft":false,"unlisted":false,"editUrl":"https://github.com/antoine-cottineau/react-native-swipeable-card-stack/docs/getting-started.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Getting Started"},"sidebar":"defaultSidebar","previous":{"title":"Presentation","permalink":"/react-native-swipeable-card-stack/"},"next":{"title":"API","permalink":"/react-native-swipeable-card-stack/api"}}');var i=n(4848),s=n(8453);const r={sidebar_position:2,title:"Getting Started"},c=void 0,d={},o=[{value:"Installation",id:"installation",level:2},{value:"Basic Usage",id:"basic-usage",level:2}];function l(e){const t={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsxs)(t.p,{children:["Start by installing required peer dependencies: ",(0,i.jsx)(t.a,{href:"https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/",children:"React Native Reanimated"})," and ",(0,i.jsx)(t.a,{href:"https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation",children:"React Native Gesture Handler"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["Then install ",(0,i.jsx)(t.code,{children:"react-native-swipeable-card-stack"}),":"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# using npm\nnpm install react-native-swipeable-card-stack\n# or yarn\nyarn add react-native-swipeable-card-stack\n"})}),"\n",(0,i.jsx)(t.h2,{id:"basic-usage",children:"Basic Usage"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"import {\n  SwipeableCardStack,\n  type SwipeDirection,\n  type CardProps,\n} from 'react-native-swipeable-card-stack';\nimport { useState } from 'react';\n\ntype CardItem = {\n  id: string;\n  title: string;\n};\n\nconst cards: CardItem[] = [\n  { id: '1', title: 'Swipe me!' },\n  { id: '2', title: 'Next card' },\n  { id: '3', title: 'Last one' },\n];\n\nconst Card = ({ item }: CardProps<CardItem>) => (\n  <View>\n    <Text>{item.title}</Text>\n  </View>\n);\n\nconst CardStack = () => {\n  const [swipes, setSwipes] = useState<SwipeDirection[]>(['right']); // First card already swiped right\n\n  return (\n    <SwipeableCardStack<CardItem>\n      data={cards}\n      swipes={swipes}\n      renderCard={Card}\n      keyExtractor={(item) => item.id}\n      onSwipeEnded={(_, direction) =>\n        setSwipes((current) => [...current, direction])\n      }\n    />\n  );\n};\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Check out the ",(0,i.jsx)(t.a,{href:"./api",children:"API Reference"})," for detailed information about available props and customization options."]})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>c});var a=n(6540);const i={},s=a.createContext(i);function r(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);