CRM Basics
===============

## Core Concepts
- **C**ustomer **R**elationship **M**anagement
- Manage
  - `Leads`: People interested in your business
  - `Customers`
- Goal
  - Improve customer relationships through:
    - Retention
    - Acquisition
  - Convert: Leads -> Customers -> Loyal Advocates
- Benefits of implementing (soon):
  - Better Data Organization
    - Leads
    - Contacts
    - Customers
  - Enhanced Communication
    - Reminders
    - Email templates
  - Share info
    - With sales team
  - Catch All Leads
    - Embed Web to Lead forms to push those to the CRM
  - Reporting
    - Track whether sales team is meeting their goals

- Track
  - Prospect
  - Sales
  - Customers
- Workflow (Salesforce Centric)
  - `Leads`
    - Prospects gathered through:
      - Web Form Submissions
      - Business Card
      - Misc
  - `Opportunity`
    - When a lead is ready to discuss:
      - Pricing
      - Scope
      - Delivery Dates
    - Called "Lead Conversion"
    - SF creates a corresponding `Account`:
      - Company Name, Industry, Number of Employees, Location
    - Associated with each Account:
      - `Contact`  (many)
        - Name, title, phone, email
      - `Opportunity` (many)  (= the sale that you're working on)
        - Product, Amount, Decision makes
      - `Cases`
        - service records for you customers
      
  - `Accounts`
  - `Contacts`

- Productivity Tool
  - Automation
  - IMprove quantity
- Analytics Tool
  - IMprove quality (e.g. marketing ROI, close rate, case resolution time, customer satisfaction)

https://www.youtube.com/watch?v=SZQ2DN8TtV4
Salesforce vs Dynamics
- Salesforce
  - NetSuite and SF are SAS
  - Ecosystem of 3rd party add-ons for gaps or industry-specific needs
    - More options than Dynamics CRM
  - lots of moving parts / integration
    - you need a robust IT capability set to manage this
    - not so great for smaller organizations due to the complexity
  - Other Pros
    - Dashboard flexibility
    - "Trailheads" training are good
    - Mobile Interface
    - Gmail integration
    - Online Communities
    - Industry Verticals and Marketplace
  - Weaknesses
    - Pricing: more expensive than Dynamics CRM
    - APEX code language for customization
    - No static lists
- Dynamics
  - Good balance between small and large corporation (SMB's)
  - Features:
    - Pipeline mgmt
    - forecasting
    - managing leads
    - lead flows
    - customer service
    - AI for next steps
    - follow-up recommendation
    - integration with LinkedIn, other MS products including Excel, Teams, PowerBI
    - integration with "ClickDimensions" (additional fee)
      - Digital Marketing Automation
      - Email campaigns
      - Manage Events
      - Website to CRM integration
    - lots on partner choices for getting, installing products
    - Dashboards

  - Has good 3rd party ecosystem
  - Weaknesses
    - Configuration is a pain and Not totally opinionated about process
    - Limited OOTB Data Model (e.g. Campaign Hierarchy) though there are usually workarounds
    - Limited options for non-profits
  - Limited "Team Members License"
    - See all data, but only change 3 record types:
      - Contacts
      - Activities
      - Notes
  

  - 2:34   https://www.youtube.com/watch?v=SZQ2DN8TtV4

  
## CRM Goals
- 

## Scope


## Key Players

### SalesForce

### Microsoft Dynamics

## Organizaional Considerations

- CRM vs ERP
  - THere are overlaps
  - CRM goals
    - increase sales
    - improve customer relationships
    - connect w prospects
    - ensure quality service
  - CRM is looking outward
  - CRM lets you
    - Improve response time
    - Pursue new leads
    - Marketing Campaigns
    - Streamline sales proces
    - Analyze purchasing patterns
    - Ensure quality customer service
    - Automate repetitive tasks
  - ERP
    - Looks inward
    - Goals
      - Efficiency of business processes
      - Reducing costs, increasing visibility, streamlining visibility
  - CRM will boost sales, while ERP will reduce the cost of each unit
  - CRM's are cheaper than ERP's
  - At scale:
    - CRM's are good for SMB's who are focused on scaling sales
    - ERP's are good for larger organizations looking to implement efficiencies
  - Company Evolution
    - Typically start with CRM, then move to compatible ERP 

- CRM basics
  - Good for automating, codifying, streamlining business process
  - Spend less on return customers than new customers
  - Front Line of Business
    - Sales
    - Marketing 
    - Customer Service
  - Core Modelling
    - Account (B2B or B2C)
      - Contact
        - Activities
        - Opportunities
        - Help Desk
        - Products
        - Vendors
    - Leads
  - Prioritizing Leads
  - Data Quality is important
    - Deduping contacts
  - Campaigns are applied to Leads
    - You'll have many campaigns at once
    - Campaigns can be through multiple channels: 
      - Email
      - Phone
      - Online advertisements
      - Etc.
  - Other Features:
    - Segmentation
      - Identifying markets
    - Pipeline tracking
    - Document upload
    - Analytics 
- Sales vs Marketing vs Advertising
  - Marketing: Determining what consumers want (strategy)
  - Advertising: Communication mechanics/channels
  - Sales: Closing Deals

- CRM: Hosted vs On-Prem
  - Pricing schemes:
    - Per seat
    - high end: usually $40/month/user
  - Multiple Feature Tiers
  - Pay per storage
  - Third party plugins


- Decision Process for Custom CRMS
  - Best option:
    - Existing OTB Features
  - As Customization Needs increase, it becomes less clear:
    - Developer vs a CRM configurer (E.G. Salesforce Expert)
    - 
  - Consider Opportunity Costs

- Zoho
  - Free for 3 or less userss

## Thoughts on Custom CRM's
- Prevailing logic is it's usually best to buy rather than develop for reasons of TCO
- What is the most valuable oomponent in a CRM?
  - Data
    - YES, especially in a data-centric organization bc you want to be able to leverage all data and this requires a strong data integration strategy 
  - BL (incl. CRUD, Validation, WF)
    - YES.  And this needs to be encapsulated in API's for reasons of portability, durability
  - UI
    - NO WAY.
    - UX is not a priority bc you have internal customers.  You can train them.  They don't have a choice.
    - The UI's should always be as dumb as possible- that way important functionality lives in BL layers
    - If they're dumb, they're easy to implement (heck, even no-code solutions might be acceptable)
- What are the most difficult part of a CRM implementation
  - Data
    - No.  These are pretty straightforward models.
  - BL
    - YES- this is the most complicated.
    - Existing CRM's use this as an extensibility point, but this is a typically an inferior tool to having full control and direct data access.
      - Diminishing marginal returns as you put more resources into customization
  - UI
    - NO WAY
- Are the most valuable pieces the integrations, add-ons?
  - Analytic Tool Integration (e.g. PowerBI, Tableaux, etc)?
  - Data Integrations (e.g. to 3rd party systems like LinkedIn?)
  - Functionality Add-ons (e.g. INdustry verticals)
- CRM has a nucleus of a simple data model and all these surrounding functionalities:
  - BL
  - Integrations
- But locking that core data in a properietary system is expensive
- Does it make sense that COTS are monoliths?
  - And if they're not, does that undercut their value proposition?
  - Do they propagate an architecture which is a long-term liablity for a data-centric organization?

## Sources
https://www.youtube.com/watch?v=hnEQq7kNFWo
https://www.youtube.com/watch?v=SZQ2DN8TtV4
https://www.youtube.com/watch?v=sTHZtJoPiuQ
https://www.gartner.com/en/sales/insights/sales-technologies
https://www.gartner.com/en/documents/3999054-ignition-guide-for-building-the-modern-crm-sales-technol