// ** React Imports
import ReactDOM from 'react-dom';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

// ** Redux Imports
import { store } from './redux/store';
import { Provider } from 'react-redux';

// ** ThemeColors Context
import ability from './configs/acl/ability';
import { AbilityContext } from './utility/context/Can';
import { ThemeContext } from './utility/context/ThemeColors';

// ** ThemeConfig
import themeConfig from './configs/themeConfig';

// ** Toast
import { Toaster } from 'react-hot-toast';

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner';

// ** Ripple Button
import './@core/components/ripple-button';

// ** PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx.min';

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** React Hot Toast Styles
import '@core/scss/react/libs/react-hot-toasts/react-hot-toasts.scss';

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css';
import './@core/scss/core.scss';
import './assets/scss/style.scss';
import App from './App';

// ** Service Worker
import * as serviceWorker from './serviceWorker';
import Maintenance from 'modules/maintenance/view/Maintenance';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            {window?.config?.maintenance?.isMaintaining ? (
              <Maintenance />
            ) : (
              <App />
            )}
            <Toaster
              position={themeConfig.layout.toastPosition as any}
              toastOptions={{ className: 'react-hot-toast' }}
            />
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if ((module as any).hot) {
  (module as any).hot.accept();
}
