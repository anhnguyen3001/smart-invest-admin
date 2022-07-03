/*
 * Define default environment variables of the application.
 * You can customize these values by overriding them to public/configs/env-local.js (create this file if not exist).
 * Don't forget to uncomment the env-local.js <script> tag in index.html.
 * To enable tracking, replace tracker.appId with your app ID in env-local.js.
 */

window.config = {
  env: 'dev',
  administratorEmail: 'nguyenhoanganh12000@gmail.com',
  apiServices: {
    smartInvestBff: 'http://localhost:8081/v1',
    builderBff: 'https://builder-bff.dev.tekoapis.net',
    marketBff: 'https://market-bff.dev.tekoapis.net/api',
    upload: 'https://files.dev.tekoapis.net',
    iam: 'https://id-admin.develop.tekoapis.net/api/v1.0',
    identity: 'https://identity.develop.tekoapis.net/api',
  },
};
