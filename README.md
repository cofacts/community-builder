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
- `npm run codegen`: After changing GraphQL query, run this to update Typescript types

Lint and check is also invoked in Github actions.

### Connecting to production API instead of staging

If you want to connect to production API server during development, you can follow these steps to route all API requests to production API server:

1. Add `"proxy": "https://api.cofacts.tw"` to package.json
2. Change `REACT_APP_API_URL` to `http://localhost:3000/` in `.env.local`


## Deployment

In `.github/workflows/build-and-deploy.yml` we have configured an automatic deploy to `gh-pages` branch.

If you want to maintain a fork and deploy to your own `gh-pages`, follow [these steps](https://github.com/peaceiris/actions-gh-pages)
to setup `GITHUB_TOKEN` environment variable in your Github repository.
