export {};

interface MutationObserverMock extends MutationObserver {
  trigger(mutations: Partial<MutationRecord>[]): void;
}

declare global {
  namespace NodeJS {
    interface Global {
      config: object;
      MutationObserver: object;
    }
  }
  interface Window {
    dataLayer: {
      event: string;
      [key: string]: string | number;
    }[];
    config: {
      env: 'test-1' | 'dev' | 'production';
      iam: {
        clientId: string;
        oauthDomain: string;
      };
      apiServices: {
        [key: string]: string;
      };
      clientDomain: string;
      previewDomain: string;
      customDomain: {
        ip: string;
        cname: string;
      };
      tekoProductConfigs?: {
        mockTerminals: any[];
      };
      tracker?: {
        appId?: string;
        host?: string;
        jsFile?: string;
      };
      facebook?: {
        pageId: string;
        appId: string;
      };
      googleReCaptchaKey?: string;
      phongvuMerchantId?: number;
      maintenance?: {
        isMaintaining: boolean;
      };
      turnOnAppSwitcher?: boolean;
    };
    _mutation_observers: MutationObserverMock[];
  }
  function track(param1?: string, param2?: any, param3?: any): () => void;
}
