Anki Flashcard App
========

## References
- Documentation
  - [Mobile App](https://docs.ankimobile.net/)
  - [Desktop Version](https://docs.ankiweb.net/)

## Basic Concepts
- Cards have 3 stages:
  - **New**: Haven't seen them yet
  - **Learning**: Seen recently, but not fully learnt
  - **Review**: Learnt and in 'maintenance mode'
- Learning Stage:
  - Repeated a configurable number of times
    - Each called a 'learning step' 
    - Each has a fixed delay period
  - Each time the card is presented, it moves through learning steps in 1 of 4 ways depending on which button you press:
    - 'Again' -> first step
    - 'Hard' -> repeat current step
    - 'Good' -> next step
    - 'Easy' -> auto skip to 'Review' stage (regardless of current learning stage)
  - 'Graduating': When a card is advanced from learning stage to the 'Review' stage 
- Review Stage
  - Review Stage is where the card stays until you have 'Lapse'
  - There are no "learning Steps" like with the Learning Stage
    - Instead the buttons (Again, Hard, Good, Easy) apply logic which set the next delay period
    - The basic idea is to progressively increase ('ease') the delay (if you have no problems)
    - To calculate the new delay, a multiplier is applied to the previous delay
      - The value of the multiplier depends on which button is pressed
      - Each of those multipliers is in the configuration
      - Example: previous delay was 10 days, card presented, 'good' pressed, starting ease setting is 2.5, next delay is 25 days 
    - The seed delay is the 'Graduating Interval' (set in config)
  - 'Again' -> 'Lapse Stage' 
  - 'Hard' -> Apply multiplier associated with Hard (default is 1.2) 
  - 'Good' -> Keep the same multiplier
  - 'Easy' -> Increase the multiplier by adding the 'Easy Bonus' to the current multiplier
- Lapses / Relearning Stage
  - If you press 'Again' on a Review Stage card, it goes into a 'Relearning Stage'
  - Relearning stage is a special case of Learning Stage
  - You can configure it with:
    - Any number of relearning steps
    - A new 'graduating interval' called 'minimum interval'
- Display section at bottom of screen:
  - Looks like '12 + 34 + 56'
  - New Cards + Cards in Learning Stage + Cards in Reviews
  - So you should see the numbers just decreasing in each column during a study session

## Strategies
- Learning Steps
  - Probably good to have a few sequential days to fully reinforce
    - **Gotcha**: If you want to learn a card through daily learning steps, set your stages like `1d 1d 1d ...` not `1d 2d 3d ...`
  - If there are no other cards to show, Anki will show Learning cards before their full delay.  You can change this with `Preferences>Scheduling>Learn Ahead Limit` (probably a good idea)

## Custom Study (from iOS App)
- "Custom Study" is what is called when you just want to go through flashcards, independent of the review schedule
  - AKA "For Christ Sake just show my the freaking cards!!!???"
- 2 high level approaches:
  1. Pick based on card/deck metadata (e.g. tags, deck study options, most lapses, etc.) into temporary (filtered) decks
    - Custom Study Sessions
    - Cramming/Filter
  2. Browse and pick individual cards, then move to a new permanent deck (then apply the first method) 
- Approach 1:
  - Custom Study Sessions
    - Anki App home screen already has a "Custom Study Session" Deck available and it fills it with the cards you specify
    - **Scenario 1**: Pick cards from A SINGLE EXISTING DECK into Custom Study Session
      - Home screen: `<Deck Name>` -> `<Gear Icon>` -> `Custom Study`
      - `Preview All cards with Certain Tags`  (dont worry if you dont use tags)
        - You can set the max cards and use (or not) the include/exclude tags 
      - `Done`
      - Now if you check the Custom Study Session it has those cards in it
        - The good thing about `Preview ...` is it has no effect on the card's scheduling
        - If you were to 'Browse' the cards from the source deck, they'll be marked as 'Filtered'
          - That means they belong to the Custom Study Deck until you mark them as 'Good' in that deck
        - You can empty the Custom Study deck by clicking the `<Gear Icon>` -> `Empty` (it takes some scrolling)
    - **Scenario 2**: Pick cards from MULTIPLE DECKS into Custom Study Session
      - Follow the process above but select a parent deck (assuming you have grouped them in hierarchies)
  - Cramming / Filtered Decks
    - Home screen: `<Deck Name>` -> `Filter/Cram`
    - Search Text: scroll to right and remove the `is:due` part
      - There's some very fancy searching syntax which is supported which might be interesting, but not important now
    - Order: You can select `Most Lapses`, `Order due`, `Decreasing Intervals` (cards with biggest intervals first), ...
    - Reschedule: Probably unselect this as you don't want to affect the card's scheduling
    - `Build`
    - The resulting deck will have a system name like `Filtered Deck...`
  - IMPORTANT: Deleting vs Emptying decks
    - **DANGER**: Deleting (swipe left in home screen) will also remove cards (possibly not in a filtered deck!!)
    - Instead empty the deck: `<Deck Name>` -> `<Gear Icon>` -> `Empty`
- Approach 2:
  - Permanently Move a card to a new deck
    - The idea is to create new (temporary) decks based on existing cards
    - `Home Screen` -> `Search` -> `Filter`
      - Now you can select any of these pre-set filters or type in your own fancy stuff
    - Manually Select the cards you want in the deck
    - `Actions` -> `Change Deck`

## Importing Updates to Anki from Google Sheets
- Export (only the new rows) as CSV
- The content can be HTML
- In Anki -> Import File -> Choose CSV -> Select the Deck and other variables in the next pop-up window  

## Syncing Anki Cards into Quizlet
- Why: bc Quizlet lets you browse the deck more easily.  Might be preferable in the initial learning phases.
- Anki: File -> Export
  - Export format: Cards in Plain Text
  - Include: choose decks
  - Uncheck "Include HTML and media references"
- Import into Google Sheets
  - It should parse it properly automatically
  - In another column, combine the 2 A and B columns with a custom delimeter (e.g. '
  ||D||')like: `=A1&"||D||"&B1`
  - Copy that column to the clipboard and go to Quizlet
- Quizlet
  - Create a new Deck, specify from an import
  - Enter the custom delimeter to separate the term from the definition
  - The default card delimited will work fine (newline)
  - Paste!
  - **Updating an Existing Deck**: 
    - Dont bother.  Just replace the whole thing unless it's just a few imports.
- Note: It might be smarter to export ALL decks at the same time and then filter them in google sheets.
  - Unfortunately, Anki doesn't specify the deck name but it's fairly obvious
  - Then you can just replace all the decks in Quizlet one at a time