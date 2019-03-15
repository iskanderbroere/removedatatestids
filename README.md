# Steps to reproduce
- npm run build
- compare client and server bundle (search for test `testattribute` in `.nuxt/`)
- data-test attribute is expected to be removed in both, but is only removed in the server bundle