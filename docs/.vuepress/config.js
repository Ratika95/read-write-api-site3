/**
 * VuePress config file: `docs/.vuepress/config.js`.
 * Documentation: https://vuepress.vuejs.org/config/.
 */

const markdown_it_toc = require('markdown-it-toc');
const markdown_it_katex = require('markdown-it-katex');
const markdown_it_footnote = require('markdown-it-footnote');
const markdown_it_container = require('markdown-it-container');
const markdown_it_anchor = require('markdown-it-anchor'); // https://github.com/valeriangalliat/markdown-it-anchor

const create_sidebar = () => {
  return [
    {
      title: 'Version 3.1.2',
      path: '/v3.1.2/profiles/read-write-data-api-profile',
      collapsable: false,
      sidebarDepth: 1,
      children: [
        {
          title: 'Profiles',
          path: '/v3.1.2/profiles/',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/v3.1.2/profiles/account-and-transaction-api-profile',
            '/v3.1.2/profiles/aggregated-polling-api-profile',
            '/v3.1.2/profiles/callback-url-api-profile',
            '/v3.1.2/profiles/confirmation-of-funds-api-profile',
            '/v3.1.2/profiles/event-notification-api-profile',
            '/v3.1.2/profiles/event-notification-subscription-api-profile',
            '/v3.1.2/profiles/file-payments-api-profile',
            '/v3.1.2/profiles/payment-initiation-api-profile',
            '/v3.1.2/profiles/real-time-event-notification-api-profile',
          ]
        },
        {
          title: 'Resources and Data Models',
          path: '/v3.1.2/resources-and-data-models/',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/v3.1.2/resources-and-data-models/aisp/',
            '/v3.1.2/resources-and-data-models/pisp/',
            '/v3.1.2/resources-and-data-models/cbpii/',
            '/v3.1.2/resources-and-data-models/event-notifications/',
          ]
        },
        {
          title: 'References',
          path: '/v3.1.2/references/',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/v3.1.2/references/domestic-payment-message-formats',
            '/v3.1.2/references/namespaced-enumerations',
          ]
        },
      ]
    },
  ];
}

const create_nav = () => {
  return [
    // We currently don't want an nav at the top.
    // {
    //     text: 'Versions',
    //     items: [
    //         {
    //             text: 'Version 3.1.2',
    //             link: '/v3.1.2/',
    //         },
    //     ]
    // }
  ]
};

const create_dev_server = () => {
  // https://cli.vuejs.org/config/#devserver
  // https://webpack.js.org/configuration/dev-server/
  return {
    // https://webpack.js.org/configuration/dev-server/#devserverclientloglevel
    clientLogLevel: 'info',
    // https://webpack.js.org/configuration/dev-server/#devservercompress
    compress: true,
    // https://webpack.js.org/configuration/dev-server/#devserveroverlay
    overlay: {
      warnings: false,
      errors: false,
    },
    // https://webpack.js.org/configuration/dev-server/#devserveropen
    open: 'Google Chrome',
    // https://webpack.js.org/configuration/dev-server/#devserverwatchcontentbase
    watchContentBase: true,
  };
}

module.exports = {
  base: '/read-write-api-site2/',
  title: 'OBIE Read/Write API Standards',
  description: 'Read/Write API Standards',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      }
    ],
  ],
  themeConfig: {
    logo: 'favicon.png',
    lastUpdated: 'Last Updated',
    sidebar: create_sidebar(),
    nav: create_nav(),
    sidebarDepth: 1,
    displayAllHeaders: false,
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: {
      permalink: true,
    },
    // options for markdown-it-toc
    toc: {
      includeLevel: [
        1,
      ],
    },
    // https://vuepress.vuejs.org/plugin/option-api.html#extendmarkdown
    extendMarkdown: (md) => {
      // use more markdown-it plugins!
      // md.set({ breaks: true });
      md.use(markdown_it_toc);
      md.use(markdown_it_katex);
      md.use(markdown_it_footnote);
      md.use(markdown_it_container);
      md.use(markdown_it_anchor);
    },
  },
  // https://vuepress.vuejs.org/plugin/option-api.html#extendmarkdown
  extendMarkdown: (md) => {
    // use more markdown-it plugins!
    // md.set({ breaks: true });
    md.use(markdown_it_toc);
    md.use(markdown_it_katex);
    md.use(markdown_it_footnote);
    md.use(markdown_it_container);
    md.use(markdown_it_anchor);
  },
  // https://vuepress.vuejs.org/plugin/option-api.html#chainmarkdown
  chainMarkdown: (config) => {
    return config;
  },
  plugins: [
    // https://vuepress.vuejs.org/plugin/official/plugin-back-to-top.html
    '@vuepress/back-to-top',
    // https://vuepress.vuejs.org/plugin/official/plugin-nprogress.html
    '@vuepress/nprogress',
    // https://vuepress.vuejs.org/plugin/official/plugin-search.html
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 30,
        // Ideally we want all the search results but the container rendering the
        // search results does not have scrollbars so all the results are not displayed.
        // searchMaxSuggestions: Number.MAX_SAFE_INTEGER,
      },
    ],
  ],
  cache: false,
  // These settings configures the server that is started when you do `yarn docs:dev`.
  // With the current configuration settings, if you open Google Chrome DevTools after navigating
  // to the site, it will display any compilation warnings/errors related to Markdown amongst other things.
  devServer: create_dev_server(),
  // https://cli.vuejs.org/config/#css-sourcemap
  css: {
    sourceMap: true,
  },
  // https://cli.vuejs.org/config/#runtimecompiler
  runtimeCompiler: true,
  // https://vuepress.vuejs.org/config/#chainwebpack
  chainWebpack: (config, isServer) => {
    // Inline fonts and images so we don't do another fetch for them.
    // If we set `limit` to zero, all the fonts and images are inlined.
    // Explanation can be found in:
    // * https://cli.vuejs.org/guide/webpack.html#replacing-loaders-of-a-rule
    // * https://github.com/vuejs/vue-cli/issues/3215

    config.module.rule('fonts').use('url-loader').tap((opts) => {
      const options = Object.assign(opts, { limit: 0 });
      return options;
    });

    config.module.rule('images').use('url-loader').tap((opts) => {
      const options = Object.assign(opts, { limit: 0 });
      return options;
    });
  },
  // https://vuepress.vuejs.org/config/#evergreen
  // This will disable ES5 transpilation and polyfills for IE, and result in faster builds and smaller files.
  // Set to true, if we want to support IE.
  evergreen: false,
};
