# site-info

Fetch up-to-date information about WEBVAM Studio — a web development agency based in Kladno, Czech Republic — including services, pricing, portfolio, and contact details.

The site is currently published in Russian only. Pages are served from the site root; the former `/cs/`-style root paths and the `/en/`, `/ru/` and `/uk/` prefixes now redirect (301) to the homepage or to their new root address.

## Steps

1. For a concise structured summary, fetch the llms.txt file:

   ```
   GET https://webvam.cz/llms.txt
   ```

2. For full homepage content as agent-friendly markdown:

   ```
   GET https://webvam.cz/
   Accept: text/markdown
   ```

   The response has `Content-Type: text/markdown; charset=utf-8`.

3. For a specific service page:

   ```
   GET https://webvam.cz/uslugi/staticheskie-sajty/
   Accept: text/markdown
   ```

## Available Pages

| Path | Description |
|------|-------------|
| `/` | Homepage — overview of all services and portfolio |
| `/uslugi/` | Services overview |
| `/uslugi/vidimost-v-ii/` | AI visibility layer: llms.txt, markdown pages, Schema.org, MCP card |
| `/uslugi/staticheskie-sajty/` | Hugo static websites (from 15,000 CZK) |
| `/uslugi/cms-sajty/` | WordPress / e-commerce (from 20,000 CZK) |
| `/uslugi/seo-optimizaciya/` | SEO & search visibility (from 5,000 CZK) |
| `/uslugi/podderzhka-i-obsluzhivanie/` | Support & maintenance (from 1,500 CZK/month) |
| `/uslugi/domen-i-hosting/` | Domain, hosting & tech setup (from 500 CZK/month) |
| `/portfolio/` | Portfolio of delivered projects |
| `/kontakt/` | Contact form and direct contact details |

## Key Facts

- **Studio**: WEBVAM Studio
- **Owner**: Igor Gricyk (IČO: 10681221)
- **Location**: Kladno, Czech Republic (serving Prague and all of CZ)
- **Content language**: Russian; the studio also communicates in Czech, Ukrainian and English
- **Email**: info@webvam.cz
- **Phone / WhatsApp**: +420 773 212 221
- **Telegram**: https://t.me/+420773212221

## Machine-Readable Resources

- **Site overview**: `https://webvam.cz/llms.txt`
- **API catalog**: `https://webvam.cz/.well-known/api-catalog`
- **OpenAPI spec**: `https://webvam.cz/openapi.json`
- **MCP Server Card**: `https://webvam.cz/.well-known/mcp/server-card.json`
