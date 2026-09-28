# MarlerZ1 Portfolio v2

Static GitHub Pages portfolio.

No backend, database, Node.js, npm, or build step is required.

## Add images to a project

Put images into:

`img/projects/`

Then edit `config.js`:

```js
media: [
  { type: "image", src: "img/projects/swords-01.jpg" },
  { type: "image", src: "img/projects/swords-02.jpg" },
  { type: "image", src: "img/projects/swords-03.jpg" },
],
```

The visitor can switch between them with the left/right arrows.

## Add a YouTube video

Add it to the same `media` array:

```js
media: [
  { type: "image", src: "img/projects/swords-01.jpg" },
  { type: "youtube", src: "https://www.youtube.com/watch?v=VIDEO_ID" },
],
```

You can also use:

```js
{ type: "youtube", src: "VIDEO_ID" }
```

Images and YouTube videos can be mixed in any order.

Example:

```js
media: [
  { type: "image", src: "img/projects/render-01.jpg" },
  { type: "youtube", src: "https://youtu.be/VIDEO_ID" },
  { type: "image", src: "img/projects/render-02.jpg" },
],
```

The arrows switch between all media items.

## Add another project

Copy the example project object in `config.js`.

You only need to edit:
- title
- short
- description
- media
- tags
- links

## Public email

Replace:

`email: "YOUR_EMAIL_HERE"`

in `config.js`.

## Publishing

For `MarlerZ1.github.io`, put these files in the repository root and push to the `main` branch.

GitHub Pages remains fully static.
