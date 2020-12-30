# www.linksbek.nl

[![Netlify Status](https://api.netlify.com/api/v1/badges/9f4ea26d-4757-4401-96c8-451f04504dd2/deploy-status)](https://app.netlify.com/sites/linksbek-nl/deploys)
![Nightly build](https://github.com/xtreamwayz/www.linksbek.nl/workflows/Nightly%20build/badge.svg)

## Create a new post

```bash
$ git switch -c
$ hugo new posts/2020/2020-12-31.md
$ git commit -am "feat: 2020-12-31"
$ gh pr create -t "feat: 2020-12-31" -b "" -l "feat"
```

## Development

```bash
$ make build
$ make serve
```

## Resources

- https://gohugo.io/documentation/
- https://mmark.miek.nl/post/syntax/
