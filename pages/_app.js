import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/index.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import { AuthWrapper, useAppContext, YtWrapper } from '../context/index'; // import based on where you put it
import { useEffect } from 'react';
import { host } from '../host';
import Auth from '../components/Auth';

// import 'swiper/modules/pagination/pagination.min.css'

function MyApp({ Component, pageProps }) {

  return (
    <AuthWrapper>
      <YtWrapper>
        <Auth></Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </YtWrapper>
    </AuthWrapper>


  )
}

export default MyApp
