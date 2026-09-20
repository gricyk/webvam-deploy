# site-info

Fetch up-to-date information about WEBVAM Studio — a web development agency based in Kladno, Czech Republic — including services, pricing, portfolio, and contact details.

## Steps

1. For a concise structured summary, fetch the llms.txt file:

   ```
   GET https://webvam.cz/llms.txt
   ```

2. For full homepage content as agent-friendly markdown:

   ```
   GET https://webvam.cz/en/
   Accept: text/markdown
   ```

   The response has `Content-Type: text/markdown; charset=utf-8`.

3. For a specific service page:

   ```
   GET https://webvam.cz/en/services/static-websites/
   Accept: text/markdown
   ```

## Available Pages (English)

| Path | Description |
|------|-------------|
| `/en/` | Homepage — overview of all services and portfolio |
| `/en/services/` | Services overview |
| `/en/services/static-websites/` | Hugo static websites (from 15,000 CZK) |
| `/en/services/cms-websites/` | WordPress / e-commerce (from 20,000 CZK) |
| `/en/services/seo-optimization/` | SEO & search visibility (from 5,000 CZK) |
| `/en/services/support-maintenance/` | Growth & optimization (from 1,500 CZK/month) |
| `/en/services/domain-hosting/` | Domain, hosting & tech setup (from 500 CZK/month) |
| `/en/portfolio/` | Portfolio of delivered projects |
| `/en/contact/` | Contact form and direct contact details |

## Other Languages

- Czech (default): `https://webvam.cz/`
- Russian: `https://webvam.cz/ru/`
- Ukrainian: `https://webvam.cz/uk/`

## Key Facts

- **Studio**: WEBVAM Studio
- **Owner**: Igor Gricyk (IČO: 10681221)
- **Location**: Kladno, Czech Republic (serving Prague and all of CZ)
- **Email**: info@webvam.cz
- **Phone / WhatsApp**: +420 773 212 221
- **Telegram**: https://t.me/+420773212221

## Machine-Readable Resources

- **Site overview**: `https://webvam.cz/llms.txt`
- **API catalog**: `https://webvam.cz/.well-known/api-catalog`
- **OpenAPI spec**: `https://webvam.cz/openapi.json`
- **MCP Server Card**: `https://webvam.cz/.well-known/mcp/server-card.json`
