# klbm9999.github.io

Source for the personal website of K.L. Bhanu Moorthy, published at https://klbm9999.github.io/.

The site is built with [Astro](https://astro.build) as static HTML with plain CSS and no client-side framework.
GitHub Actions builds, checks and deploys it to GitHub Pages on every push to `main`.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/data/profile.ts` | Facts that change over time: roles and dates, availability, target roles, links, skills |
| `src/data/site.ts` | The GoatCounter site code; no analytics script is emitted while it is empty |
| `src/content/work/` | One Markdown file per Selected work item |
| `src/content/papers/` | One Markdown file per paper; `featured: true` gives a paper its own block |
| `src/content/projects/` | One Markdown file per project; set `visible: false` to hide one |
| `src/content/writing/` | One Markdown file per post |
| `src/content.config.ts` | The typed schema for every collection |
| `public/resume.pdf` | The resume served at `/resume.pdf` |

## Publishing a post

A post with `status: coming-soon` shows its title and teaser on the home page with no link.
To publish it, write the body below the front matter, set `status: published` and add a `published:` date.
The post then gets its own page at `/writing/<file-name>/` and the home page links to it.

## Commands

The Node version is pinned in `.nvmrc`.

```sh
npm ci                # install the pinned dependencies
npm run dev           # local server with live reload
npm run build         # type check, then build into dist/
npm run check         # internal link check and HTML validation of dist/
```

`node scripts/render-images.ts` regenerates `public/og.png`, `public/favicon.ico` and `public/apple-touch-icon.png`.
Run it after changing `public/favicon.svg` or the name or headline in `src/data/profile.ts`, and commit the results.
