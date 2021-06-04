Iterable Model and API
================

- Sources
  - [User Guides](https://support.iterable.com/hc/en-us/categories/200402689-User-Guides)
  - [Terms you Should Know](https://support.iterable.com/hc/en-us/articles/205480305-Terms-you-should-know-)
  - [Events](https://support.iterable.com/hc/en-us/articles/205614175)
  - [Managing Custom Events](https://support.iterable.com/hc/en-us/articles/115002065083-Managing-Custom-Events-)
  - [Workflow Overview](https://support.iterable.com/hc/en-us/articles/205480265-Workflows-Overview-)

## Users
- AKA Subscribers AKA Contacts
- Every user in your iterable system has a profile of fields that are updated as you send API updates OR as the user interacts with the emails
- To see profile, go to Audience -> Contact Lookup
  - Profile Section `Available User Fields` in the profile shows system and custom data associated with the user
    - Custom data has to be upserted through the API
  - Profile Section `Events` has all the events (and their data) associated with the user
  - Other less interesting Profile Sections
    - List Membership
    - Channel Preferences
- You can import users in csv files
- There is a designated API for changing a contact's email

## Events
- Are associated with a user
- Can be system or custom
- Examples of system events include: (Email bounce, email click, email unsubscribe, etc)
- You should send custom events to Iterable if:
  - They Trigger a WF
  - You can segment with them
- Custom Event types can be explicitly granted any/none of these permissions:
  - Allowed into System
  - Saved to associated user profile
  - Trigger Workflow
- YOu can update a custom event:
  - you can pass a string `id` field to the `POST /events/track` and it will update if exists
  - id has to be globally unique - not just within the given event type
- Events can be viewed in 2 places
  - User Profile
  - Insight -> Log -> Events
- YOu can refer to events (and their custom data) in Workflows, if they triggered that WF

## Lists
- Static
  - fixed membership
  - can be created through:
    - importing a csv
    - defining a segmentation query whose results go in your list
    - the API: create list with `POST /api/lists` and update users with `POST /api/lists/subscribe` 
- Dynamic
  - basically built off a segmentation query
  - two useful properties to base your query from are: `Contact Property` and `Custom Events` <- since these are two places the data is collected
- List Colums **IMPORTANT**
  - Lists are just storing the email address
  - The columns are just the associated values in the User Profile
    - So you won't see variation between column values in 2 lists for the same user


## Workflows
- has 3 node types:
  - triggers
  - filters
  - actions
- advanced options let you:
  - prevent the same user from entering a WF > 1x
  - prevent the same user from entering a WF > 1x simultaneously
- triggers (there are lots)
  - API call `POST /api/workflows/triggerWorkflow`
  - Triggered by another WF
  - Various system events (ecommerce, (un)subscribe, email opened, etc)
  - Scheduled Recurring List: ~cronjob for each item in list
  - Subscribed to List
    - Triggers when users added to static list
    - When you create the list, you need to specify 'Send List Membership & Field Change Events to Trigger Workflow'
  - User Profile Field updated
    - You specify the field
    - Works from Import or API
    - Even if the value is the same as the old, it will trigger
  - Custom Event

## Misc
- Blast Campaign vs Triggered Campaign
  - Blast Campiagn is a periodical mass email / marketing campaign that goes out to people on a list.
  - Triggered Campaign is the same except the send is initiated by some user action (an event)
- Channel - apply to different (email) message types and are (un)subscribed separately
- You can personalize your templates with data feeds of type:
  - JSON
  - RSS
  - XML
- Email Templates support handlebards notation, including control-flow constructs/regexp/etc
- Segmentation
  - customized groupings of users based on their characteristics.
  - can be very general or specific
- Webhooks
  - This is how you trigger a call to a 3rd party system (rest call) 
- Environment
  - Each Project is a separate environment

