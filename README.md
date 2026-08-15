# Ariel Amar Law Office — Landing Page

Free, static, Google-indexable rebuild of the original Lovable landing page
(https://trustworthy-legal-hub.lovable.app/). No build step, no framework —
plain HTML/CSS/JS that any free static host can serve.

## Structure

| Path | Page |
|---|---|
| `index.html` | Hebrew home page (RTL, default) |
| `en/index.html` | English home page |
| `fr/index.html` | French home page |
| `accessibility/`, `en/accessibility/`, `fr/accessibility/` | Accessibility statements (required by Israeli law) |
| `assets/` | Stylesheet, JS, logo (original + 256px), hero photo |
| `sitemap.xml`, `robots.txt` | Search engine files |
| `404.html` | Not-found page |

## SEO features (better than the original)

- **Real per-language URLs** with `hreflang` alternates — Google indexes all three
  languages (the original's JS-only language switch is invisible to crawlers).
- **Structured data**: `LegalService` + `FAQPage` JSON-LD on every home page —
  eligible for FAQ rich results in Google.
- Per-language titles, meta descriptions, Open Graph and Twitter cards.
- `sitemap.xml` with hreflang annotations, `robots.txt`.
- Fast: ~500 KB total, static files, no JS framework.

## Deployed URL

All absolute URLs (canonical, hreflang, Open Graph, JSON-LD, sitemap, robots)
are set to `https://natana3-prog.github.io/ariel-law`. If the site later moves
to a custom domain, search-and-replace that base URL everywhere (PowerShell,
from the project root):

```powershell
Get-ChildItem -Recurse -Include *.html,*.xml,*.txt | ForEach-Object {
  (Get-Content $_.FullName -Raw) -replace 'https://natana3-prog\.github\.io/ariel-law', 'https://NEW-DOMAIN' |
    Set-Content $_.FullName -Encoding utf8
}
```

Also update the two `/ariel-law/` paths in `404.html` if the repo name changes.

## Free hosting options

1. **GitHub Pages** (recommended): create a repo, push these files, enable
   Pages (Settings → Pages → Deploy from branch → main). Free, reliable,
   indexable, supports custom domains.
2. **Cloudflare Pages / Netlify**: drag-and-drop the folder or connect the repo.

## Getting into Google search

1. Deploy, then update the placeholder domain (above).
2. Open [Google Search Console](https://search.google.com/search-console),
   add the site as a property (verify via the HTML-tag method: paste the meta
   tag it gives you into each page's `<head>`, or use DNS if you own a domain).
3. Submit `sitemap.xml` and use "URL Inspection → Request indexing" for the
   home page. New sites typically appear in results within days to a few weeks.
4. Optional but valuable for a law office: create a
   [Google Business Profile](https://business.google.com) and link this site —
   it usually drives more local search traffic than the website itself.

## Maintenance notes

- The hero photo is `assets/hero-bg.jpg`; the logo is `assets/logo.png`
  (original 1024px, used for social sharing) and `assets/logo-256.png`
  (page display + favicon). Replace files to update branding.
- The accessibility widget stores its state in `localStorage` under
  `a11y-settings`, same as the original site.
- Update the copyright year in the three page footers each January.
