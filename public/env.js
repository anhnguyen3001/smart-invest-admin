/*
 * Define default environment variables of the application.
 * You can customize these values by overriding them to public/configs/env-local.js (create this file if not exist).
 * Don't forget to uncomment the env-local.js <script> tag in index.html.
 * To enable tracking, replace tracker.appId with your app ID in env-local.js.
 */

window.config = {
  env: 'dev',
  administratorEmail: 'anh.lt@teko.vn',
  iam: {
    clientId: '32af2a3b5d7c4a55804f2bbc498c03ea',
    oauthDomain: 'https://oauth-marketplace.dev.tekoapis.net',
  },
  apiServices: {
    pageManagement: 'https://pm-bff.dev.tekoapis.net',
    builderBff: 'https://builder-bff.dev.tekoapis.net',
    marketBff: 'https://market-bff.dev.tekoapis.net/api',
    upload: 'https://files.dev.tekoapis.net',
    iam: 'https://id-admin.develop.tekoapis.net/api/v1.0',
    identity: 'https://identity.develop.tekoapis.net/api',
  },
  tracker: {
    // appId: '1837e4f6-58d8-445d-a765-4cfdf579cbd2',
    // host: 'https://tracking.tekoapis.com',
    // jsFile: 'https://cdn.tekoapis.com/tracker/dist/v2/tracker.full.min.js',
    appId: '2ce37a59-adb2-4bd1-919f-fe6edd6e10a8',
    host: 'https://tracking.tekoapis.com',
    jsFile: 'https://cdn.tekoapis.com/tracker/dist/v2/tracker.full.min.js',
  },
  clientDomain: 'landing.dev.teko.vn',
  previewDomain: 'https://preview.landing.dev.teko.vn',
  customDomain: {
    ip: '103.161.38.150',
    cname: 'kdc-dev.landingbuilder.vn',
  },
  tekoProductConfigs: {
    mockTerminals: [
      { name: 'Vnshop Desktop Web', code: 'vnshop' },
      {
        name: 'Vnshop Mobile Web',
        code: 'VNS_OLN_WEB_0001',
      },
    ],
  },
  facebook: {
    pageId: '109046775149375',
    appId: '5035000756595321',
  },
  maintenance: {
    isMaintaining: false,
  },
  // googleReCaptchaKey: '6LePAgQgAAAAACleVtyhfwOh1jxQwup8gAiayYNE',
};
