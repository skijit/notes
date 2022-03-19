Marketing Email Notes
======================

## Email Authentication

- 3 Technologies work together:
  - SPF
  - DKIM
  - DMARC

### SPF
- Sender Policy Framework
- Designed to prevent email spoofing
- Admin of the sending domain publishes the list of IP addresses (in a DNS entry) which can send mail on behalf of the given domain.
- When a mailserver receives email, it will query a fixed DNS entry in the send email's domain and validate whether the sending server is on the SPF list.
- For the specific DNS SPF tagging format, see [open-spf.org](https://open-spf.org) for more information
- It also has more fine-grain rules ("mechanisms") for dispositioning emails, E.G. pass, fail, softFail, etc.

### DKIM
- Domain Keys Identified Mail
- Designed to prevent someone tampering with the content of the email
- All outgoing mail is signed with a private key
- The public key is published to a DNS entry
- The receiving server will test the signed mail by using the public key (accesible through a DNS query)

### DMARC
- Allows a domain owner to publish disposition rules for recipients to enact when they receive a mail which doesn't align with SPF or DKIM
- The policy is published as a DNS entry
- You can also add a configuration to your DMARC rules which tell recipients to publish statistics on the mail they've received from your domain and the dispositions (per your DMARC rules) that have been applied.  Called 'Forensic' and 'Aggregation' reports.
  - Forensic reports are just the individual emails dispositioned to FAIL
- [Dmarc.org](https://dmarc.org)

## Tips to Improve Email Deliverability
- The goal is to improve the number of mails that land in the Inbox rather than the Spam folder
- For Gmail, there is a much higher probability that your email lands in the 'Promotions' tab when:
  - You send from a 3rd party marketing tool (e.g. MailChimp)
  - Your email contains commercial information
  - (But that's still better than landing in Spam)
- **Sender Reputation** is a key concept: It's a score maintained by email processing servers (e.g. gmail, microsoft, etc.) which will influence how they handle your email.  For example, a low reputation score increases the liklihood of your mail going to spam or getting buried in Promotions.

### Purge your email lists regularly
- Called 'List Hygeine'
- You only want to send to emails which are valid and deliverable
- Also, you should remove people from your lists that haven't engaged with your emails in (for example) 6 months
  - "Re-engagement Campaigns" are common for these scenarios
  - You send 2-4 emails stating
    - we haven't heard from you
    - click this button if you want to continue to receive email
    - if not, we'll take you off our email list
- Use an Email Validation Service (e.g. Debounce) to purge your list
  - Will tell you emails which are invalid, undeliverable, bounced, etc.
  - If you send to a list with bad emails, your Sender Reputation will be affected.

### Use Double Opt-In
- After the user subscribes, send them an email to confirm their subscription
- Also encourage them to "White List" your email by dragging them from the Promotion folder into Inbox

### Avoid Spam Trigger Words
- E.G. Free, Guaranteed, 100%, Bargain, Prize, Satisfaction, Order Now, Investment, Amazing, Income, Risk Free, etc.
- Don't use all caps, watch your grammar, and don't use too many exclamation points

### Verify your sender domain
- Use SPF, DKIM, and DMARC

### Follow the CAN-SPAM Act rules
- A [US FTC policy](https://www.ftc.gov/tips-advice/business-center/guidance/can-spam-act-compliance-guide-business)-- but it's pretty simple guidelines
  - Don't hide the unsubscribe link
  - Don't use deceptive subject lines (relative to content)
  - Identify the message as an ad
  - Tell recipients where you're located
  - Honor opt-out requests promptly

### Don't ever buy email leads
- They're cold and they haven't opted-in

### Don't put too many links in your email
- This can cause them to go straight to promotions folder
- Keep it to a minimum

### Send emails on a regular basis
- By being consistent on your timing, you're sending a positive signal to the mail servers

## Email Deliverability Best Practices
- Filtering from the mail servers is incredibly complex now.  There might be > 4000 machine learning algorithms applied to each email.
- Transactional vs Marketing Emails
  - Transactional emails are sent to a single individual that complete a process the recipient has started
  - Marketing emails are sent to a a group, based on events from the sender
- Transactional emails are handled differently by the email filtering algorithms (much less filtering)
- Transactional emails are more oriented around the benefit of the recipient
- Best Practices
  - Make sure you're following the law about email (e.g. Germany requires double opt-in, etc.)
  - Tiny Changes can have a big affect
    - When you change something as small as your subdomain that you send from (e.g. from newsletter.example.com to newsletters.example.com), it can have a profound affect on your deliverability
    - Filters will fingerprint the emails based on link contents
  - Purge bad lists, contacts, sources
  - Use A/B Testing
  - Send to smaller segments
  - Read 'Email Marketing Rules' by Chad White
- SUnset Policy- purge from a list if no engagement after some period of time
- ESP: Email Service Provider
- [Blacklists](https://www.rackaid.com/blog/email-blacklists/) (don't get on these)
  - Composite Blocking List (CBL)
  - Spamhaus Block List (SBL)
  - XBL Exploits Block List (XBL)
  - Spamcop
  - [Surbl](http://www.surbl.org/)
- Your email service provider needs to have functionality to let you know when people mark your email as spam
- Simplest version of reputation = (how many people open and click your mail) / (how many people unsubscribe or mark as spam)
- When you click 'Show Original' in gmail, you see all e headers and full processing log
- Email Warm Up
  - When you start sending to a new list, you should start with small segments at first bc it takes the filters time to adjust to your new big list
  - The filters need time to adjust to your servers and your recipients
- Just a few which mark you as spam is going to affect your deliverability
- If you dont get confirmation, you're 92% likely to have deliverability issue
- One of the best things you can do is send to less people... get a much better open percentage

## Questions
- What about spamassassin
- What about "smart hosts"
- Difference in sending to a list or to one person from an ESP (check marketing vs transactional rates)
- What are the most important email headers
