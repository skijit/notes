React App Setup Notes
============

- Find some examples of using create react app with:
  - Next
  - Typescript  
  - Express
  - and to a lesser extent: Apollo Client
- What should I do about styles?
- Also need to use hooks!
  - look into apollo hooks
- no absolute reason to host on the same machine: cloud deployment might be ok

## Apollo and TypeScript
- https://www.apollographql.com/docs/react/recipes/static-typing/
- https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide
- initial conclusion: create your react app with express and typescript first, then add in apollo
- apollo hooks:
  - https://medium.com/the-guild/graphql-code-generator-introducing-hooks-support-for-react-apollo-2cdc8a7b526d

## Create React App, TypeScript, Express
- Create React App support for Typescript:
  - https://medium.com/byteconf/getting-started-with-typescript-in-create-react-app-2306b713088f
- When is Create React App not good?
  - seems like a reasonable place to start
  - you can always eject the config and extend it
- Deployment
  - build output will include builds dir including...
    - bundles with hashnames 
    - static assets 
    - a servable index.html
  - update your express paths to serve the main page when client-side routes are selected
  - if your app is not the root-level, you can specify `homepage` option in the package.json
 - you do need to include poly fills for IE11 support:
  - see https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md
- create-react-app is the CLI for initial creation, and it creates a react-scripts module
  - you can update to new versions of react-scripts by bumping the version number in package.json or reading the migration instructions on react-scripts
- has support for loading graphql files directly
- you can change the index file in public directly, as you like
- most static files will get bundled with webpack, you you can put stuff in the  public folder and then refernece it like this:

```(html)
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
```

- code splitting lets you break into chunks
- you can apply environment variables into your bundles
  - prefixed with REACT_APP
  - access by `process.env.REACT_APP_MYENV`

## Tailwind.css
- https://tailwindcss.com/


## Next.js
- is it worth it?
- Custom App container
