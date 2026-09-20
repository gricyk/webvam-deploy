# AI viditelnost webu

Vrstva, díky které vás doporučí ChatGPT, Gemini i Perplexity: llms.txt, markdown verze každé stránky, Schema.org JSON-LD a karta MCP serveru.


## Vyhledávání se přesunulo a váš web o tom neví

Zákazník už nenapíše do Googlu „tvorba webu Kladno" a neprochází deset odkazů. Zeptá se ChatGPT, Gemini nebo Perplexity celou větou, a dostane jednu odpověď se dvěma třemi konkrétními doporučeními. Klik na váš web přijde až potom, pokud vůbec.

Rozdíl proti Googlu je zásadní. Google si na vykreslení stránky počká a JavaScript spustí. Roboti jazykových modelů většinou ne: stáhnou HTML, vezmou z něj text a hledají v něm fakta, která si dokážou ověřit: název firmy, IČO, ceny, region, kontakt. Když je nenajdou, o vaší firmě prostě nic neřeknou.

## Co na webu uděláme

1. **`llms.txt`**: jedna stránka psaná pro jazykové modely. Kdo jste, co děláte, za kolik, kde působíte, jak vás kontaktovat. Žádná navigace, žádné bannery, jen fakta.
2. **Markdown verze každé stránky.** Web umí na hlavičku `Accept: text/markdown` vrátit čistý text bez HTML. Model tak nemusí luštit rozložení stránky a nespotřebuje polovinu kontextu na značky.
3. **Schema.org JSON-LD.** Organizace, provozovna, služby, ceny, drobečková navigace. Údaje, které stroj přečte jako data, ne jako větu v odstavci.
4. **Karta MCP serveru v `.well-known` a agent skills.** Popis, který AI agentovi řekne, jak s vaším webem pracovat. Agent zákazníka si tak sám najde ceník nebo kontakt.
5. **Statika bez JavaScriptu.** Obsah je v HTML hned při prvním načtení. Crawler nic nedopočítává a nic mu neunikne. Vedlejší efekt: PageSpeed 95–100.
6. **Hreflang pro každý jazyk.** Model pozná, která jazyková verze patří kterému zákazníkovi, a nabídne tu správnou.

## Ověřte si to na tomhle webu

Nemusíte nám věřit. Otevřete si [/llms.txt](/llms.txt) a [kartu MCP serveru](/.well-known/mcp/server-card.json), přesně tuhle vrstvu postavíme i vám. Kterákoli stránka tohohle webu se navíc dá stáhnout jako markdown, stačí poslat hlavičku `Accept: text/markdown`.

## Kolik to stojí

U nového webu je celá vrstva součástí dodávky, neplatíte za ni zvlášť. U existujícího webu záleží na tom, na čem stojí, ozvěte se a řekneme vám to po krátkém pohledu na váš web, zdarma.

## Pro koho to dává smysl

Nejvíc pro firmy, které si zákazník vybírá po srovnání několika dodavatelů: řemesla a stavby, právní a účetní služby, reality, autoservisy, ordinace, ubytování. Tedy všude tam, kde se člověk ptá „koho byste doporučil", protože přesně tuhle otázku dnes lidé pokládají stroji.


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

