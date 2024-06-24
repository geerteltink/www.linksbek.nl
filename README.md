# www.linksbek.nl

![Nightly build](https://github.com/xtreamwayz/www.linksbek.nl/workflows/Nightly%20build/badge.svg)

## Create a new post

```bash
# create from template
./add-post.sh 2023-10-24

# merge
./add-post.sh 2023-10-24 --mr
```

## Code

Image

```md
<figure>
  {% image "./src/images/name.jpg", "Description" %}
</figure>
```

Image with link

```md
<figure>
  <a href="https://example.com">
    {% image "./src/images/name.jpg", "Description" %}
  </a>
  <figcaption>
    The Caption
  </figcaption>
</figure>
```

Gallery

```md
<div class="image-gallery">
  {% image "./src/images/name.jpg", "Description" %}
  {% image "./src/images/name.jpg", "Description" %}
  {% image "./src/images/name.jpg", "Description" %}
</div>
```

## Development

```bash
npm install
npm run serve
```
