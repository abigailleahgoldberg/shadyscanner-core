import '../styles/globals.css';
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('../components/ChatWidget'), { ssr: false });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ChatWidget />
    </>
  );
}
