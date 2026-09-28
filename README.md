# oYCLo.github.io

Personal academic homepage of Chenglei Yu — <https://oyclo.github.io>

Plain HTML + CSS, no build step: GitHub Pages serves the repository root as-is.

## Structure

```
index.html               page content: About, News, Publications, Experience
assets/css/style.css     all styling (colours, fonts, spacing are CSS variables at the top;
                         dark palette under :root[data-theme="dark"])
assets/js/main.js        light/dark toggle (choice saved in localStorage) + BibTeX show / copy
assets/img/profile.jpg   portrait (4:5, 480x600)
assets/img/pubs/         paper thumbnails (WebP, ~720 px wide)
favicon.svg, favicon-32.png, apple-touch-icon.png
.nojekyll                tells GitHub Pages to skip Jekyll
```

## Common edits

- **News**: add a new `<li>` at the top of the News list in `index.html`.
- **New paper**: copy one `<li class="pub">` block in `index.html`, then edit venue, title, authors,
  TL;DR, links and BibTeX. Add the class `is-first` for first / co-first author papers
  (light highlight). Put the thumbnail in `assets/img/pubs/`.
- **Footer**: update "Last updated".

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy

The repository must be named `oYCLo.github.io`. Push to `main`, then in
*Settings → Pages* choose *Deploy from a branch → main / (root)*.
The site appears at <https://oyclo.github.io> within a minute or two.
