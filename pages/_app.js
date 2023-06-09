import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteGuard from '../RouteGuard';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <RouteGuard>
      <ToastContainer />
      {getLayout(<Component {...pageProps} />)}
    </RouteGuard>
  );
}

export default MyApp;
