1. I created a nextron app (Electron.js with integrated Next.js) with MUI library as a starting set up
   - Next is a React framework that provides advanced routing
   - MUI is a Material Design UI library that uses Emotion.js JSS (JS-in-CSS) for styling
2. Added Jotai for state management - (light lib with hooks). Redux has 1 object for the entire state, Jotai breaks state into separate instances (they are called atoms) - each atom is responsible for its own element

3) home (starting) page is located [here](renderer/pages/home.tsx)
4) the onboarding flow is:
   - ask user for a phone number
   - ask user to verify 6-digit code
   - ask user for first and last name
   - once all steps are completed, user is redirected to conversations screen
5) the onboardiang flow is restricted until each step is satisfied:
   - a valid phone number, non-digits are automatically filtered, hyphens are automatically added
   - a valid 6-digit code, non-digits are automatically filtered
   - user first and last name should be more than 2 characters long
6) based on the requirement, one conversation is sufficient
   - during the interview conversation we were talking about custom-based WebSocket application at Vama
   - since I was a bit rusty with websockets, I decided to add them here:
   - as a bonus I implemented a small WebSocket server with Socket.IO
7) On last page of the onboarding, the client will emit user data with `creatingNewUser` to the server:
   - In response, the server will emit new users ID with `newUserCrated`, this will be our placebo 'auth token'
   - all messages from that user will be authored from that ID (aside from preestablished and convo ones)
8) After the onboarding, the user is redirected to conversations page
   - client emits `requestConversationsAndUsers`, loading mock starts
   - server emits in response `recieveConversationsAndUsers`, sends all users and all conversations (in prod case it will be paginated but here it's just mock)
   - in all users should be our current user as well

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
