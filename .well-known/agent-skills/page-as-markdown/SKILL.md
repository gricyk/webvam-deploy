# page-as-markdown

Retrieve any WEBVAM Studio page as clean, token-efficient markdown instead of HTML by using HTTP content negotiation.

## Steps

1. Add the `Accept: text/markdown` request header to any GET request to `webvam.cz`:

   ```
   GET https://webvam.cz/{path}/
   Accept: text/markdown
   ```

2. The server responds with:
   - `Content-Type: text/markdown; charset=utf-8`
   - `Vary: Accept` (so the result can be cached separately from HTML)

3. Parse the markdown response directly — no HTML stripping needed.

## Examples

```
GET https://webvam.cz/en/
Accept: text/markdown
→ 200 OK  Content-Type: text/markdown; charset=utf-8
```

```
GET https://webvam.cz/en/services/static-websites/
Accept: text/markdown
→ 200 OK  Content-Type: text/markdown; charset=utf-8
```

```
GET https://webvam.cz/ru/
Accept: text/markdown
→ 200 OK  Content-Type: text/markdown; charset=utf-8  (Russian content)
```

## Notes

- Every page on the site supports this negotiation — homepage, service pages, portfolio, contact
- Markdown responses are pre-generated at build time; there is no runtime conversion overhead
- Without `Accept: text/markdown`, the server returns standard HTML (default browser behaviour is unaffected)
- The `Vary: Accept` header ensures caches serve each format to the right client type
