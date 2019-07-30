# Wisdom

A design system system.

## Usage

```bash
npm install
npm run build
```

You'll see a `dist` folder with a file called `design-system.json` in it.

## How It Works

All we're doing here is building an object that holds the values of the design system, then serializing it to JSON with a simple build script.

### `inputs.json`

The base values that the design system is derived from.

Hint: what if we added a server and front-end to this repo that allowed us to graphically edit this file?

### `src/design-system.ts`

Uses the inputs to derive the values of the design system and place it into a particular schema.

We can use TypeScript interfaces to define the schema, which will guide contribution and break the build if anything is off.

### `dist/design-system.json`

When you run `npm run build`, it will generate this file, which contains serialized design system object.

## CMS

Run:

```bash
npm run cms
```

This will run a server, exposing a CMS. By default, it will use port 9999 on localhost:

If the server is running, you can [click here to go to the CMS](http://localhost:9999).

Change the JSON to see the resulting changes to the design system. When you press "Save", it will write the changes to `inputs.json`.

## The Future

- Code generation (Generate Swift, Kotlin, CSS, Styled Components, etc.)
- Statically generated style guide