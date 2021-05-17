Google Tag Manager (GTM) Basics
=======

- 2 key problems it solves:
  - Centralization
  - Customizable & Centralized Behavior Capture
- Centralization
  - There are lots of analytics products out there (incl GA, FB, Google Ads, etc.)
  - Each one requires a "Marketing Tag": js snippet to be added to your document
  - With GTM, you can have just 1 marketing tag and on the server-side, use that to integrate with any analytics products 
- Customizable & Centralized Behavior Capture
  - You can create custom events based on user behaviors
  - The user behaviors are based on triggers you define (server-side)
  - The tags (& their associated triggers) are in a versioned container, so they are active once you submit and publish them.
- Preview Mode
  - Lets you test a tag/trigger locally before pushing it out
  - Click "Preview" in GTM and it will open a specialized version of your site (your browser alone) which communicates with the server
  - You can track the events that are triggered to verify the tag/trigger works as expected
- Each tag has:
  - a destination: e.g. GA or FB
  - ...
- Use GTM tag assistant chrome extension to validate your integration
- GA Events (which is one type of Tag you can create)
  - Event hit includes following componenets (which can be included in reports)  ([excllent src](https://support.google.com/analytics/answer/1033068?hl=en)):
    - Remember: This is a GA schema which is used to drive reporting.  For the most part, it's just the hierarchy you want to report on.
    - **Category**: High-level grouping for the event
    - **Action**: A name for the interaction.  If you can, these should be cross-cutting values (ie not specific to the 1 category)
    - **Label**: Additional information you want to analyze.  Usually highest level of specificity.
    - **Value** (optional): This is always an integer and the report will take the sum and average of these values.  Usually good for measuring times (e.g. load time).