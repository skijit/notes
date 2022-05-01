Anki Flashcard App
========

## Basics
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
  - If there are no other cards to show, Anki will show Learning cards before their full delay.  You can change this with `Preferences>Scheduling>Learn Ahead Limit` (probably a good idea)
