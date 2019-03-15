import pkg from './package'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Build configuration
   */
  build: {
    loaders: {
      vue: {
        compilerOptions: {
          modules: [
            {
              // strip data-test ids on elements in prod
              // this currently bugs out for the client bundle
              preTransformNode(astEl) {
                const { attrsMap, attrsList } = astEl
                const tagAttributesForTesting = ['test', 'test-id']
                tagAttributesForTesting.forEach(attribute => {
                  const dataAttr = `data-${attribute}`
                  if (attrsMap[dataAttr]) {
                    delete attrsMap[dataAttr]
                    const index = attrsList.findIndex(x => x.name === dataAttr)
                    attrsList.splice(index, 1)
                  }
                })
                return astEl
              }
            }
          ]
        }
      }
    }
  }
}
