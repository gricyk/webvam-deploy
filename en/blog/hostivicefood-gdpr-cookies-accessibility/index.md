# A Claude skill audited a Czech fast-food website for GDPR, the AI Act and accessibility: no cookie banner needed

An EU compliance audit of a two-page WordPress site: 6 issues under GDPR, ePrivacy and accessibility, zero cookies, and why no cookie banner was needed.


I manage the website of [hostivicefood.cz](https://hostivicefood.cz), a fast-food kiosk in Hostivice near Prague: burgers, grilled chicken, borscht and pelmeni. WordPress, the Divi theme, two pages: home and menu. No forms, no cart, no user accounts. It looks like there is nothing to check under European law.

To find out whether that is true, I ran the site through my open-source Claude skill [eu-web-compliance](https://github.com/gricyk/claude-skill-eu-web-compliance). Below is what it found, what turned out to be a false alarm, and what changed after the fixes. This is not legal advice, it is an engineering write-up.

## The skill: five areas of EU law and three rules

A Claude Skill is a folder with instructions and scripts. Claude loads it when a task matches its description. My skill checks a website against five areas of EU law: the GDPR, ePrivacy (cookies), the AI Act, the Digital Services Act, and accessibility (WCAG, the European Accessibility Act).

I built it around three rules:

- **Never invent legal citations.** Anything the skill has not verified in the current session is marked `VERIFY`, and deadlines and the status of laws are checked with a web search and dated.
- **First decide whether a rule applies at all.** The DSA, the EAA and the public-sector Web Accessibility Directive have thresholds, and a small kiosk usually falls below them.
- **Never touch the site without a plan and the owner's approval.**

It ships with checklists, document templates and `scan.py`, a scanner built only on the Python standard library that looks for trackers, third-party resources, forms and basic accessibility issues.

## The audit in five steps

1. **Context.** Who operates the site (a sole trader in Czechia), what the site does, what data it collects. The skill took part of this from the site footer, I answered the rest.
2. **Scanner** over the saved pages.
3. **Browser.** Cookies and `Set-Cookie`, localStorage, every request to other domains before any interaction, axe-core, text contrast over photos, keyboard navigation at 375 px.
4. **Server**, read-only: WP-CLI, hosting panel settings, logs.
5. **Law.** Searches on the status of the Digital Omnibus, the EU-US Data Privacy Framework, and Czech rules on cookies and customer reviews, each with the date checked.

## Six problems found

**No privacy policy.** WordPress had an unpublished draft from 2023: the default template about comments and Gravatar, neither of which the site has. Meanwhile the server logs every visitor's IP address and had kept those logs for 20 months, because log rotation was set by file size rather than by time.

**Google Fonts loaded from Google's servers** on the first page load. It was the only third-party host on the site, and for the sake of three fonts every visitor's IP address went to a third party. In 2022 the Munich Regional Court (LG München I) found this unlawful. That ruling does not bind Czech courts, but the argument is clear: the same fonts work just as well from your own server.

**Outdated server operating system.** The version had reached the end of standard support and was no longer getting security updates. Under the GDPR that is an Article 32 question (security of processing). Fixed.

**WordPress odds and ends:** a 24 MB `wordpress-6.1.1.zip` was publicly downloadable from the site root, `/?author=1` revealed the administrator's login name, and two unconfigured analytics and pop-up plugins were still installed.

**The processor chain.** The site belongs to the kiosk owner, and I look after the server as its administrator. The skill matched the site's IP address to the provider's autonomous system, found that the provider is a US company with a data centre in the EU, and asked the right question: who is whose processor. Under GDPR Article 28 we need a contract between us. None of this is visible in the code. We did have the contract.

**Accessibility:**

- pinch zoom disabled on phones (`user-scalable=0` in the viewport tag that Divi outputs);
- a white heading and grey subheading placed directly on a photo, with no overlay;
- buttons with white text on a gold background, 2.52:1;
- the mobile menu button is a `div` that keyboard users cannot reach, with `outline: none` on focus;
- Facebook, X and Instagram icons linking to `#`.

**Reviews: a false alarm.** The menu page shows four customer reviews with first names. That falls under consumer law: since 2023 Czech sellers must explain how they check that reviews come from real customers. The skill put this in a separate "out of scope" section and drew no legal conclusions. The reviews are genuine, so this one is fine.

## What is not needed: a cookie banner, the AI Act, the DSA and the EAA

**Not a single cookie.** `document.cookie` is empty, there are no cookies in the response headers, and localStorage is empty too. So **no cookie banner is needed**, and the skill said so explicitly: do not add one. A banner "just in case" over nothing only gets in the visitor's way.

**The AI Act does not apply.** There are no AI features, and marketing copy is not text "on matters of public interest" under Article 50(4). We wrote the copy ourselves anyway.

**The DSA does not apply:** comments are closed and there is no user-generated content.

**The EAA does not apply:** delivery orders go through Foodora, there is no e-commerce on the site itself, and the operator is a microenterprise. So accessibility here is WCAG good practice, not a legal obligation.

## Fixes: fonts, a mu-plugin, logs, a privacy policy

After the report the skill proposed a plan, and I approved each item separately. Before any change: a backup of the database and `wp-content`. I did not delete files, I moved them to a quarantine folder that is not reachable from the internet.

- **Fonts served locally.** Google Fonts switched off in Divi. Variable woff2 files (latin and latin-ext only, 520 KB) live in `uploads` and load via `@font-face`.
- **One mu-plugin**, about 100 lines, rolled back by deleting the file:
  - a viewport that allows zoom;
  - a 55% dark overlay on the hero photo;
  - higher-contrast button and footer colours;
  - a visible focus indicator;
  - `role="button"`, `tabindex` and Enter/Space handling for the mobile menu;
  - 404 for author pages.
- **Clean-up:** the WordPress archive, unused plugins and an old copy of the theme moved to quarantine. Comments closed by default.
- **Logs:** rotated daily, 90 files kept.
- **Social icons** with empty links removed.
- **A privacy policy** in Czech, published and linked from the footer: logs kept 90 days, emails 12 months, hosting and processors named explicitly. The new page immediately picked up two accessibility issues from the theme: pale blue links (2.74:1) and a table that scrolls sideways on phones without keyboard access. I fixed both in the same mu-plugin.

## Before and after: zero third-party hosts and zero contrast violations

![Hero section on a phone before the fixes](/images/blog/hostivicefood/hero-375-before@2x.jpg)
![Hero section on a phone after: dark overlay and white subheading](/images/blog/hostivicefood/hero-375-after@2x.jpg)

![Contact section before: white text on gold buttons, grey operator details](/images/blog/hostivicefood/contact-section-before@2x.jpg)
![Contact section after](/images/blog/hostivicefood/contact-section-after@2x.jpg)

![Mobile menu opened with the keyboard, focus visible](/images/blog/hostivicefood/mobile-menu-open-focus-after@2x.jpg)

*I reproduced the "before" state on the live page by switching off the fix styles.*

| Check | Before | After |
|---|---|---|
| Third-party hosts on page load | fonts.googleapis.com, fonts.gstatic.com | none |
| Cookies | none | none |
| axe-core, home page (rules / nodes) | 7 / 25 | 4 / 5 |
| axe-core, contrast violations | 15 | 0 |
| axe-core, menu page (rules / nodes) | 6 / 11 | 3 / 3 |
| Zoom on phones | disabled | allowed |
| Mobile menu with keyboard | unreachable | opens with Enter |
| Heading over photo, 375 px, 10th percentile contrast | 1.92 (required 3:1) | 7.57 |
| Subheading over photo, 375 px | 1.39 (required 4.5:1) | 5.10 |
| `/?author=1` | reveals login name | 404 |
| Log retention | 20 months | 90 days |

## Four measurement mistakes

**axe-core cannot see text over images.** It puts the contrast of a heading over a photo under "incomplete", and hardly anyone reads that section. The skill measures differently: it draws the photo on a canvas with the same `background-size` and `background-position`, applies the overlay, and computes contrast for every pixel under the text. Compare the 10th percentile with the requirement, not the average: the average over a dark photo looks fine, while letters over a bright patch stay unreadable.

**Parallax lies when you resize.** My first mobile numbers were off: I changed the window width without reloading, and Divi positions the parallax background with a `transform` that it only recalculates on scroll. The right way is to reload the page at each width. I corrected the report and added the step to the skill's checklist.

**A calculation in the plan is not a measurement.** In the plan I sized the overlay for white text. After the fix, measuring showed that the subheading was actually grey and still failed. Only measuring again caught it.

**A small thing that ate time.** `?w=320` in WordPress is not a harmless cache-busting parameter, it is the week number for archives. The page duly returned a 404.

## Next: a new site instead of patching the old one

The site is outdated, and we will rebuild it completely by the end of 2026. That is why I did not fix the remaining axe findings, heading order and the missing `<main>` in the theme template: there is no point patching them in the old template. I will check the new version with the same skill before launch.

## Takeaway: the browser and the server found more than reading the code

Even a two-page site without forms had things to fix. The main findings came not from the scanner or the code, but from the browser and the server: real requests, real logs, the real provider. Just as valuable, the skill named what the site does not need: a cookie banner, DSA forms and an accessibility statement.

The skill is open source under the [Apache 2.0 licence](https://github.com/gricyk/claude-skill-eu-web-compliance) and works in Claude Code and claude.ai. If you run it on your own site and find where it gets things wrong, please open an issue.


---

## Contact

- Email: [info@webvam.cz](mailto:info@webvam.cz)
- Phone / WhatsApp: [+420 773 212 221](https://wa.me/+420773212221)
- Telegram: [Telegram](https://t.me/+420773212221)

---

## Language versions

- Česky: [https://webvam.cz/blog/hostivicefood-gdpr-cookies-pristupnost/](https://webvam.cz/blog/hostivicefood-gdpr-cookies-pristupnost/)

- Русский: [https://webvam.cz/ru/blog/hostivicefood-gdpr-cookies-dostupnost/](https://webvam.cz/ru/blog/hostivicefood-gdpr-cookies-dostupnost/)

- English: [https://webvam.cz/en/blog/hostivicefood-gdpr-cookies-accessibility/](https://webvam.cz/en/blog/hostivicefood-gdpr-cookies-accessibility/)

