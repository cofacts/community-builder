Cofacts Community Builder
=======

[![CI test](https://github.com/cofacts/community-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/cofacts/community-builder/actions/workflows/ci.yml)

Tools that help community building.

Discussion: https://g0v.hackmd.io/@mrorz/B1X4EkJcU#New-idea-Social-media-toolkit

## Development

```
# Install dependency, initialize .env file for development
$ npm install
$ cp .env.sample .env.local

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
