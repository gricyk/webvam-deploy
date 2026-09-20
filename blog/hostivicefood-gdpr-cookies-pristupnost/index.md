# Web rychlého občerstvení: co skill pro Claude našel podle GDPR, ePrivacy, AI Act, DSA a pravidel přístupnosti a proč nebyla potřeba cookie lišta

Rozbor webu rychlého občerstvení podle GDPR, ePrivacy, AI Act, DSA a pravidel přístupnosti: 6 problémů, žádné cookies a proč nebyla potřeba cookie lišta.


Spravuji web [hostivicefood.cz](https://hostivicefood.cz). Je to stánek s rychlým občerstvením v Hostivicích u Prahy: burgery, grilované kuře, boršč a pelmeně. WordPress, šablona Divi, dvě stránky: úvodní a jídelní lístek. Žádné formuláře, košík ani uživatelské účty. Zdá se, že z pohledu evropského práva tu není co kontrolovat.

Abych zjistil, jestli to platí, prověřil jsem web svým open-source skillem [eu-web-compliance](https://github.com/gricyk/claude-skill-eu-web-compliance) pro Claude. Níže popisuji, co našel, co se ukázalo jako planý poplach a co se po opravách změnilo. Nejde o právní poradenství, ale o technický rozbor.

## Skill: pět oblastí práva EU a tři pravidla

Claude Skill je složka s instrukcemi a skripty. Claude ji načte, když úloha odpovídá jejímu popisu. Můj skill kontroluje web podle pěti oblastí práva EU: GDPR, ePrivacy (cookies), AI Act, Digital Services Act a přístupnost (WCAG, European Accessibility Act).

Postavil jsem ho na třech pravidlech:

- **Nevymýšlet si odkazy na předpisy.** Vše, co skill v aktuální relaci neověřil, označí `VERIFY`, a lhůty a stav předpisů ověřuje vyhledáváním a zapisuje k nim datum.
- **Nejdřív zjistit, jestli se předpis vůbec uplatní.** DSA, EAA i směrnice o přístupnosti webů veřejného sektoru mají prahy a malý stánek pod ně většinou nespadá.
- **Nesahat na web bez plánu a souhlasu vlastníka.**

Součástí jsou checklisty, šablony dokumentů a `scan.py`: skener postavený jen na standardní knihovně Pythonu hledá trackery, zdroje třetích stran, formuláře a základní problémy s přístupností.

## Kontrola v pěti krocích

1. **Kontext.** Kdo web provozuje (OSVČ, Česko), co web dělá a jaké údaje sbírá. Část skill převzal z patičky webu, na zbytek jsem odpověděl já.
2. **Skener** nad uloženými stránkami.
3. **Prohlížeč.** Cookies a `Set-Cookie`, localStorage, všechny požadavky na cizí domény ještě před jakoukoli interakcí, axe-core, kontrast textu na fotografii, ovládání klávesnicí při šířce 375 px.
4. **Server**, jen pro čtení: WP-CLI, nastavení hostingového panelu, logy.
5. **Právo.** Vyhledání aktuálního stavu Digital Omnibus, EU-US Data Privacy Framework a českých pravidel pro cookies a recenze, vždy s datem ověření.

## Co se našlo: šest problémů

**Chyběly zásady ochrany osobních údajů.** Ve WordPressu ležel nepublikovaný koncept z roku 2023: výchozí šablona o komentářích a Gravataru, které web vůbec nemá. Server přitom zapisuje IP adresu každého návštěvníka do logů a uchovával je 20 měsíců, protože rotace logů byla nastavená podle velikosti souborů, ne podle času.

**Google Fonts se načítaly ze serverů Googlu** hned při prvním načtení stránky. Byl to jediný cizí host na webu a kvůli třem písmům odcházela IP adresa návštěvníka třetí straně. Zemský soud v Mnichově (LG München I) to v roce 2022 označil za porušení. Pro Česko toto rozhodnutí závazné není, ale argument je jasný: stejná písma fungují i z vlastního serveru.

**Zastaralý operační systém serveru.** Verze skončila ve standardní podpoře a bezpečnostní aktualizace nechodily. Podle GDPR jde o otázku článku 32 (zabezpečení zpracování). Opraveno.

**Drobnosti ve WordPressu:** z kořene webu šel volně stáhnout `wordpress-6.1.1.zip` o velikosti 24 MB, `/?author=1` prozrazovalo přihlašovací jméno administrátora a v systému zůstaly dva nenastavené pluginy pro analytiku a vyskakovací okna.

**Řetězec zpracovatelů.** Web patří majitelce stánku, server mám na starosti já jako správce. Skill přiřadil IP adresu webu k autonomnímu systému poskytovatele, zjistil, že jde o americkou firmu s datovým centrem v EU, a položil správnou otázku: kdo je čí zpracovatel. Podle článku 28 GDPR mezi námi musí být smlouva. V kódu to vidět není. Smlouvu jsme měli.

**Přístupnost:**

- zakázané přibližování na mobilu (`user-scalable=0` ve viewportu, který vkládá Divi);
- bílý nadpis a šedý podnadpis přímo na fotografii, bez ztmavení;
- tlačítka s bílým textem na zlatém pozadí, kontrast 2,52:1;
- tlačítko mobilního menu je `div`, na který se z klávesnice nedostanete, a při fokusu má `outline: none`;
- ikony Facebooku, X a Instagramu odkazující na `#`.

**Recenze: planý poplach.** Na stránce s jídelním lístkem jsou čtyři recenze se jmény. To už je spotřebitelské právo: od roku 2023 musí prodávající v Česku uvádět, jak ověřuje, že recenze pocházejí od skutečných zákazníků. Skill to zařadil do samostatné části „mimo rozsah“ a právní závěry nedělal. Recenze jsou skutečné, takže je vše v pořádku.

## Co není potřeba: cookie lišta, AI Act, DSA ani EAA

**Ani jedna cookie.** `document.cookie` je prázdné, v hlavičkách odpovědí žádné cookies nejsou a localStorage je také prázdný. **Cookie lišta tedy potřeba není** a skill to napsal výslovně: nepřidávat. Lišta „pro jistotu“ nad prázdným místem návštěvníka jen obtěžuje.

**AI Act se neuplatní.** Web nemá žádné funkce AI a marketingové texty nejsou texty „o záležitostech veřejného zájmu“ podle čl. 50 odst. 4. Texty jsme ostatně psali sami.

**DSA se neuplatní:** komentáře jsou vypnuté a obsah od uživatelů na webu není.

**EAA se neuplatní:** objednávky rozvozu jdou přes Foodoru, na samotném webu se neprodává a provozovatel je mikropodnik. Přístupnost je tu proto doporučením WCAG, ne zákonnou povinností.

## Opravy: písma, mu-plugin, logy, zásady

Po zprávě skill navrhl plán a každý bod jsem schválil zvlášť. Před úpravami jsem zazálohoval databázi a `wp-content`. Soubory jsem nemazal, ale přesouval do karantény, která není dostupná z internetu.

- **Písma lokálně.** V Divi jsou Google Fonts vypnuté. Variabilní soubory woff2 (jen latin a latin-ext, 520 kB) leží v `uploads` a načítají se přes `@font-face`.
- **Jeden mu-plugin** o zhruba 100 řádcích, návrat zpět znamená smazat soubor:
  - viewport, který dovoluje přibližování;
  - ztmavení fotografie o 55 %;
  - kontrastnější barvy tlačítek a patičky;
  - viditelný fokus;
  - `role="button"`, `tabindex` a obsluha kláves Enter a mezerník pro mobilní menu;
  - 404 pro stránky autorů.
- **Úklid:** archiv WordPressu, nepoužívané pluginy a stará kopie šablony šly do karantény. Komentáře jsou ve výchozím stavu vypnuté.
- **Logy:** rotace jednou denně, 90 souborů.
- **Ikony sociálních sítí** s prázdnými odkazy jsou pryč.
- **Zásady ochrany osobních údajů** v češtině jsou zveřejněné a vede na ně odkaz z patičky: logy 90 dní, e-maily 12 měsíců, hosting a zpracovatelé uvedení přímo. Nová stránka hned zdědila ze šablony dva problémy s přístupností: světle modré odkazy (2,74:1) a tabulku, která se na mobilu posouvá do strany bez přístupu z klávesnice. Obojí jsem opravil ve stejném mu-pluginu.

## Před a po: nula cizích hostů a nula chyb v kontrastu

![Úvodní část na mobilu před opravami](/images/blog/hostivicefood/hero-375-before@2x.jpg)
![Úvodní část na mobilu po opravách: ztmavení a bílý podnadpis](/images/blog/hostivicefood/hero-375-after@2x.jpg)

![Kontaktní blok před: bílý text na zlatých tlačítkách, šedé údaje provozovatele](/images/blog/hostivicefood/contact-section-before@2x.jpg)
![Kontaktní blok po opravách](/images/blog/hostivicefood/contact-section-after@2x.jpg)

![Mobilní menu otevřené klávesnicí, fokus je vidět](/images/blog/hostivicefood/mobile-menu-open-focus-after@2x.jpg)

*Stav „před“ jsem na snímcích zrekonstruoval na živé stránce vypnutím stylů s opravami.*

| Kontrola | Před | Po |
|---|---|---|
| Cizí hosty při načtení stránky | fonts.googleapis.com, fonts.gstatic.com | žádné |
| Cookies | žádné | žádné |
| axe-core, úvodní stránka (pravidla / uzly) | 7 / 25 | 4 / 5 |
| axe-core, chyby kontrastu | 15 | 0 |
| axe-core, jídelní lístek (pravidla / uzly) | 6 / 11 | 3 / 3 |
| Přibližování na mobilu | zakázané | povolené |
| Mobilní menu z klávesnice | nedostupné | otevře se klávesou Enter |
| Nadpis na fotografii, 375 px, 10. percentil kontrastu | 1,92 (požadavek 3:1) | 7,57 |
| Podnadpis na fotografii, 375 px | 1,39 (požadavek 4,5:1) | 5,10 |
| `/?author=1` | prozradí přihlašovací jméno | 404 |
| Uchování logů | 20 měsíců | 90 dní |

## Čtyři chyby při měření

**axe-core nevidí text na obrázcích.** Kontrast nadpisu na fotografii zařadí do „incomplete“ a tuhle část většinou nikdo nečte. Skill měří jinak: vykreslí fotografii na canvas se stejným `background-size` a `background-position`, přidá ztmavení a spočítá kontrast pro každý pixel pod textem. S požadavkem se porovnává 10. percentil, ne průměr: průměr přes tmavou fotku vypadá slušně, ale písmena na světlé ploše čitelná nejsou.

**Paralaxa při změně šířky lže.** První čísla pro mobil byla nepřesná: měnil jsem šířku okna bez znovunačtení stránky a Divi posouvá pozadí paralaxy přes `transform`, který přepočítává jen při scrollování. Správně je načíst stránku pro každou šířku znovu. Opravu jsem doplnil do zprávy i do checklistu skillu.

**Výpočet v plánu není měření.** V plánu jsem ztmavení počítal pro bílý text. Po úpravě měření ukázalo, že podnadpis je ve skutečnosti šedý a pořád neprochází. Chybu odhalilo až opakované měření.

**Drobnost, která sežrala čas.** `?w=320` není ve WordPressu nevinný parametr pro obejití cache, ale číslo týdne pro archiv. Stránka poctivě vrátila 404.

## Dál: nový web místo záplatování starého

Web je zastaralý a do konce roku 2026 ho celý předěláme. Zbývající připomínky axe, tedy pořadí nadpisů a chybějící `<main>` v šabloně, jsem proto neopravoval: záplatovat je ve staré šabloně nemá smysl. Novou verzi před spuštěním prověřím stejným skillem.

## Závěr: prohlížeč a server našly víc než čtení kódu

I na webu o dvou stránkách bez formulářů se našlo co opravovat. Hlavní nálezy nepřinesl skener ani čtení kódu, ale prohlížeč a server: skutečné požadavky, skutečné logy, skutečný poskytovatel. Stejně cenné je, že skill pojmenoval, co web nepotřebuje: cookie lištu, formuláře podle DSA ani prohlášení o přístupnosti.

Skill je open source pod [licencí Apache 2.0](https://github.com/gricyk/claude-skill-eu-web-compliance) a funguje v Claude Code i claude.ai. Pokud ho vyzkoušíte na svém webu a najdete, kde se mýlí, založte prosím issue.


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

