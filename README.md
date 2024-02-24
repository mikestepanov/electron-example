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
6) during the interview conversation we were talking about custom-based WebSocket application at Vama
   - as a bonus I implemented a small WebSocket server with Socket.IO
   - for simplicity, the user is automatically subscribed to all conversations and no pagination logic is set
7) On last page of the onboarding, the client will emit user data with `creatingNewUser` to the server:
   - In response, the server will emit new users ID with `newUserCrated`, this will be our placebo 'auth token'
   - all messages from that user will be authored from that ID (aside from preestablished and convo ones)
8) After the onboarding, the user is redirected to conversations page
   - client emits `requestConversationsAndUsers`, loading mock starts
   - server emits in response `recieveConversationsAndUsers`, sends all users and all conversations
   - in the users array there should be our current user as well
9) In the example the first conversation (a conversation with character Vegeta):
   - 0th messaged comes from Vegeta (to show chat activity)
   - A chat is automatically created with an imaginary user.
   - When user sends the first message, it comes from the user.
   - When user sends the second message, it comes from Vegeta
   - Third messaged is authored from the user
   - Forth is form Vegeta, and so on...
   - The preview cell in the sidebar is updated properly
     - If last message is from the user, 'You: ' is appended to the message preview
     - the chat has DMed user image and name and is unchanging
10) user sends a message by emitting `sendMessage`, the server responds with updated conversation back via `channelUpdate`
11) user can send `isDrafting` when typing into the message input, the server responds with `channelUpdate`, labeling the conversation as in draft mode
    - this will show loading (`...`) logic on client

12. as a bonus, I added multi user view in the second conversation, similar to single user chat with minor changes
    - Character's first name is apppended to the message preview
    - in the conversation view, non-current user's messages show name and image

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
