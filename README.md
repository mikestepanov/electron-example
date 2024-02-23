1. I created a nextron app (Electron.js with integrated Next.js) with MUI library as a starting set up
   a) Next is a React framework that provides advanced routing
   b) MUI is a Material Design UI library that uses Emotion.js JSS (JS-in-CSS) for styling
2. Added Jotai for state management - (light lib with hooks). Redux has 1 object for the entire state, Jotai breaks state into separate instances (they are called atoms) - each atom is responsible for its own element

3) home (starting) page is located [here](renderer/pages/home.tsx)
4) the onboarding flow is:
   a) ask user for a phone number
   b) ask user to verify 6-digit code
   c) ask user for first and last name
   d) once all steps are completed, user is redirected to conversations screen
5) the onboardiang flow is restricted until each step is satisfied:
   a) a valid phone number, non-digits are automatically filtered, hyphens are automatically added
   b) a valid 6-digit code, non-digits are automatically filtered
   c) user first and last name should be more than 2 characters long

### Install Dependencies

```
# using yarn or npm
$ yarn (or `npm install`)

# using pnpm
$ pnpm install --shamefully-hoist
```

### Use it

```
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```
