PWA
=========

- PWA conference talk in Dec 2018 with Todd Anglin

## Background
- Responsive designs vs PWA
  - Responsive designs apply to all screens
  - PWA's do that too, but also work well offline
    - **This is the fundamental idea**
- Other pillars of PWA 
  - Reliable
  - Fast
  - app-like
    - loads fast
      - depends on service worker
    - works offline
      - depends on service worker
  - works everywhere
  - linkable
- Not a Google-specific initiative, but they do work best on android and chrome.
- PWA's don't only make sense for mobile
  - since the key is offline
  - caching locally is good
- [pwa gallery](pwa.rocks)
  - ex: airhorner.com
  - ex: m.uber.com

## App Design
- Components
  - Shell
    - cached on first visit
  - Content
    - loaded via network
- Approaches:
  1. App shell + server side render for entry pages
    - fastest
    - subsequent views are rendered client-side
  2. app shell + client side render
    - slower, but ok
    - this is what is focused on here
  3. full server side render
- requirements
  - requires https
  - you must have/register service worker
  - web app manifest

## Tools and Tutorials
- There are some good google code labs for PWA's
- Dev Tools
  - Lighthouse tools 
    - part of the audit tab chrome dev tools
    - detects PWA readiness and audits performance
  - chrome dev tools application tab
    - useful
    - you can view the manifest
    - you can view service workers that are registered
    - you can simulate offline 
- libraries / tools to make this easier
  - workbox
    - abstraction over service worker
    - probably don't use if you're using angular (not sure why)
  - angular pwa schematic
    - add this scheamatic to your pwa
      - you can define everything in a json config file
      - think it basically creates the service worker 

## Service Worker
- Service Worker is where most of the n/w interaction will get executed
- It's a/the core part of the PWA technology
- enables a lot of the key functionality
- Just a js file
- focused on controlling nw requests
- runs off main thread
- runs in background
- no DOM access
  - like a web worker
- communicates w main thread via postMessages
- 1 per scope 
  - scope is like an application folder level
- updated (at least) every 24 hours
  - in case you have a bugs in your app
  - like your last resort
- sits between page and server
  - you register it with browser
  - browser routes nw requests through it
  - then the svc worker lets us choose whether to get from cache or return stuff from page
    - this is the most complicated piece of logic
- service worker is well supported
  - except ie
- uses the fetch api
  - replacement for xhr
- uses the cache api 
- service worker has a lifecycle that starts when you register it
  - first install
    - register
    - install
    - activate
    - idle
  - updates
    - isntall
    - waiting
    - activate
    - idle

### Service worker in an Angular SPA  
- register in main html (in script tag)
  - there's a snippet for this, you're jsut registering with the app
  - you can't use ngserve at this point, if you use that
  - add the servie worker js file to your assets in the cli config
- chrome apps has a simple web server which is somewhat useful
- an empty server worker file will work (just for pass-thru testing)
- internal logic of the service worker
  - you have event handlers for the lifecycle events
    - you pick files to add to the cache (using the cache api)  
  - youre caching files
  - then you implement the fetch part, which figures out whether to serve over nw or via the cache
  - you can define multiple caches:
    - shell assets could be 1 cache
    - content assets woulc be another cache
      - the http service you use, will check your cache and serve that content (this is interesting, bc I would've expected this to be in the service worker)

### Caching Strategies
- cache only
- nw only
- cache first, nw fallback
- nw first, cache fallback
- cache then nw: show what is cached in the meantime get from the nw and replace on response
- cache and nw race: this is a tricky edge case
- generic fallback: try cache, then nw fallback, then if both failed, show some default from the cache

## App Manifest
- This is another key part of a PWA
  - static file
  - check docs ... talk ran out of time

## Platform Limitations
- as of dec 2018 ... hopefully apple will support this more in the future
- there are some system defaults on cache size limits but they can be updated
- ios limitation
  - 50mb hard limit
  - no background sync (can't listen to push notifications)
  - no screen lock orientation
  - no app spalth screen
  - no installation UX
  - less control over status bar styling
  - only works on safari
  - autopurges cache if its not used regularly
- pwa value propostiion
  - readonly
  - simple user interactions
  - dynamic content
  - web distrinutoon
  - no need to access device api's
- check toddanglin's github for all the info