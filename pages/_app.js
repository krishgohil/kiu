import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/index.css'
import '../styles/feed.css'
import '../styles/requests.css'
import '../styles/comments.css'
import '../styles/profile.css'
import '../styles/searchscreen.css'
import '../styles/test.css'
import '../styles/products.css'
import '../styles/post.css'
import '../styles/imageCropDialog.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.css'

import { AuthWrapper, YtWrapper, FeedWrapper, GeneralWrapper } from '../context/index'; // import based on where you put it
import { useEffect } from 'react';
import { host } from '../host';
import Auth from '../components/Auth';
import 'swiper/css'
import 'swiper/swiper.min.css'
import 'swiper/css/pagination'
function MyApp({ Component, pageProps }) {

  return (
    <AuthWrapper>
      <GeneralWrapper>
        <YtWrapper>
          <FeedWrapper>
            <Auth></Auth>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FeedWrapper>
        </YtWrapper>
      </GeneralWrapper>
    </AuthWrapper>


  )
}

export default MyApp
