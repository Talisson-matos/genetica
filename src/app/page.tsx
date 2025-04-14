import { Header } from '@/components/Header';
import './styles/globals.css';
import { Footer } from '@/components/Footer';
import { Aside } from '@/components/Aside';
import TextContent from '@/components/TextContent';




export default function Home() {
  return (
    <>     
      <Header />      
        <Aside sections={[]} />
        <TextContent />         
      <Footer />
    </>
  );
}
