Cofacts Community Builder
=======

[![Build Status](https://travis-ci.org/cofacts/community-builder.svg?branch=master)](https://travis-ci.org/cofacts/community-builder)

Tools that help community building.

Discussion: https://g0v.hackmd.io/@mrorz/B1X4EkJcU#New-idea-Social-media-toolkit

## Development

```
# Install dependency
$ npm install

# Start dev server
$ npm start
```

Other scripts include:

- `npm run lint`: Runs eslint
- `npm run lint:fix`: Runs eslint and handle fixable errors
- `npm run typecheck`: Checks Typescript types

Lint and check is also invoked in Travis.

## Deployment

In `.travis.yml` we have configured an automatic deploy to `gh-pages` branch.

If you want to maintain a fork and deploy to your own `gh-pages`, follow [these steps](https://docs.travis-ci.com/user/deployment/pages/)
to setup `GITHUB_TOKEN` environment variable in your Travis project.
