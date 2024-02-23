1. I created a nextron app (Electron.js with integrated Next.js) with MUI library as a starting set up
2. Added Jotai for state management - (light lib with hooks). Redux has 1 object for the entire state, Jotai breaks state into separate instances (they are called atoms) - each atom is responsible for its own element

3) home (starting) page is located at [text](renderer/pages/home.tsx)

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
