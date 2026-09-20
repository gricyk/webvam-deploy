# AI visibility for your website

The layer that gets you recommended by ChatGPT, Gemini and Perplexity: llms.txt, markdown versions of every page, Schema.org JSON-LD and an MCP server card.


## Search moved, and your website hasn't noticed

Your customer no longer types "web design Prague" into Google and works through ten tabs. They ask ChatGPT, Gemini or Perplexity in a full sentence, and get one answer with two or three specific recommendations. The click to your site comes afterwards, if at all.

The difference from Google matters. Google waits for the page to render and runs your JavaScript. Language-model crawlers mostly don't: they fetch the HTML, take the text out of it, and look for facts they can verify: company name, registration number, prices, region, contact details. If those aren't there, they simply say nothing about your company.

## What we build into the site

1. **`llms.txt`**: a single page written for language models. Who you are, what you do, what it costs, where you operate, how to reach you. No navigation, no banners, just facts.
2. **A markdown version of every page.** The site answers the `Accept: text/markdown` header with clean text and no HTML. The model doesn't have to unpick your layout or burn half its context window on tags.
3. **Schema.org JSON-LD.** Organisation, place of business, services, prices, breadcrumbs. Information a machine reads as data rather than as a sentence in a paragraph.
4. **An MCP server card in `.well-known`, plus agent skills.** A description telling an AI agent how to work with your site, so your customer's agent can find your price list or contact details on its own.
5. **Static pages, no JavaScript.** The content sits in the HTML on first load. There is nothing for a crawler to render and nothing for it to miss. Side effect: PageSpeed 95–100.
6. **Hreflang for every language.** The model can tell which language version belongs to which customer and serves the right one.

## Check it on this very site

You don't have to take our word for it. Open [/en/llms.txt](/en/llms.txt) and the [MCP server card](/.well-known/mcp/server-card.json), this is exactly the layer we'll build for you. Any page on this site can also be fetched as markdown; just send the `Accept: text/markdown` header.

## What it costs

On a new website the whole layer is part of the build, there's nothing extra to pay. On an existing site the price depends on what it's built with, so write to us, we'll look at your site and give you a figure. Looking is free.

## Who benefits most

Businesses a customer picks after comparing several suppliers: trades and construction, legal and accounting services, real estate, car repair, medical practices, short-term accommodation. Anywhere someone asks "who would you recommend", because that is precisely the question people now put to a machine.


---

## Contact

- Email: [info@webvam.cz](mailto:info@webvam.cz)
- Phone / WhatsApp: [+420 773 212 221](https://wa.me/+420773212221)
- Telegram: [Telegram](https://t.me/+420773212221)

---

## Language versions

- Česky: [https://webvam.cz/sluzby/ai-viditelnost/](https://webvam.cz/sluzby/ai-viditelnost/)

- Русский: [https://webvam.cz/ru/uslugi/vidimost-v-ii/](https://webvam.cz/ru/uslugi/vidimost-v-ii/)

- Українська: [https://webvam.cz/uk/posluhy/vydymist-u-shi/](https://webvam.cz/uk/posluhy/vydymist-u-shi/)

- English: [https://webvam.cz/en/services/ai-visibility/](https://webvam.cz/en/services/ai-visibility/)

