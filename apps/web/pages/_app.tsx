import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Layout from '../components/admin/Layout';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Funding Database Admin</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default CustomApp;
