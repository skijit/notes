React Event System Notes
=====================

- Recall DOM Event Handling Timeline:
  1. 'Trigger': Event occurs on DOM node (target)
  2. 'Queue': Event name and corresponding object get placed in Brower's task queue and are executed on opening  
  3. 'Handle-Preprocess': Event system calculates path from node to root (document element), collect a list of capture and bubble phase handlers with that event associated with any DOM nodes in the path from node to root.
  4. 'Handle-Capture Phase': Event System calls any associated capture phase handlers (from previous list), starting with those associated with root node and propagating towards the target node
    - If stop propagation hasn't been called
  5. 'Handle-Bubble Phase': Event System calls any associated bubble phase handlers (from previous list), starting with those associated with target node and propagating towards the target node
    - If stop propagation hasn't been called
  6. (This is where React's parallel event system is executed)
  7. 'Handle-Complete': Execute browser default action if the `preventDefault()` wasn't called (or stop propagation hasn't been called)

## Problem with the existing Browser Event System:
- Lack of uniformity in how browsers implement events, including:
  - Event Names
  - Event Payload Structure
  - How you attach a listener to an event
- React's Solution:
  - Wrap the native (browser) event payload in a standardized (i.e. *Synthetic*) object.
    - This is what is passed to your react event callback handlers
    - Interface is:

      ```
      boolean bubbles
      boolean cancelable
      DOMEventTarget currentTarget
      boolean defaultPrevented
      number eventPhase
      boolean isTrusted
      DOMEvent nativeEvent
      void preventDefault()
      boolean isDefaultPrevented()
      void stopPropagation()
      boolean isPropagationStopped()
      DOMEventTarget target
      number timeStamp
      string type
      ```

## Triggering  
- [src-1](React event handlers will always execute after native capture handlers)
- React event handlers will always execute after native capture handlers
  - React is listening for all events on the document element, bubble-phase.  When it receives them, it dispatches it's own parallel (w/ bubbling) event system.
  - However, since you can prevent default with react, it must execute completely before the 'Handle-Complete' phases

## Todo
- Lot's more research/explanation needed here...
