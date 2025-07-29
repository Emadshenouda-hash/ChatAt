import '../styles/global.scss';
import '../styles/colors.css';
import '../lib/i18n';

import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';  // <-- Import your Breadcrumb here

export default function App({ Component, pageProps }) {
  return (
    <>
      <Breadcrumb />    {/* <-- Add Breadcrumb here */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
