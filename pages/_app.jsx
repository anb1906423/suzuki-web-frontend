import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script'
import { useEffect } from 'react'
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Layout>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <Head>
        <link rel="icon" href="https://suzuki.com.vn/templates/suzukivietnam/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
