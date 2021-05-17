Analyzing Traffic Source
======================


- 'Attribution' in digital marketing is the analysis of how effective various sources/campaigns (e.g. ads on a particular site, emails with links, etc.) are in achieving your goal
- A big part of that is identifying the source of traffic to your site
- Referrer (or referer) header is the original way to track the source of a link
- But there are lots of scenarios where it can fail:
  - Many smartphone apps (email, social media, messenger, video players, etc.)
  - A bookmarked link
  - A rel=”noreferrer” HTML tag present in the source <a href> link. For WordPress version 4.7.4 and newer,   - this is enabled by default
  - The visitor is behind a proxy server that removes the referral
  - Linked clicked within an email
  - Redirection from an https://-based website to a link that’s http://
  - Links in documents such as PDF, Microsoft Word, PowerPoint, etc.
  - A website visitor has an ad blocker plugin that purposely blocks the referral
  - A spider, bot, or tool (i.e., “curl” or “wget”) that clicks on the link
- utm parameters provide an alernative and enhanced view of traffic sources
  - it's a schema / convention for url query parameters which are understood by analysis tools like GA
    - UTM stands for "Urchin Tracking Module" and urchin was the company that eventually became (acquired by) Google (Analytics)
  - since it's parameters, it's totally opt-in model
  - essentially, you just customize the links for each of your campaign to include this data
  - sometimes using a bit-shortening service like bit.ly is a nice way to reduce the noise
- Parameters 
  - Medium: (utm_medium)
    - Organic Traffic (non-paid traffic from search engines)
    - CPC/PPC (paid traffic from search engines)
    - Referral (a link from another website)
    - Email (link from an online email tool such as Hotmail or Gmail)
    - Social (link from a social media site)
    - None (direct traffic)
  - Source:
    - The actual originating URI (utm_source)
  - Campaign (utm_campaign)
  - Content (utm_content)
    - used for A/B testing
  - Term (utm_keyword)
    - for paid search, this denotes the keyword(s) or term(s) that were effective
- [Great source](https://larryludwig.com/utm-parameters/)
