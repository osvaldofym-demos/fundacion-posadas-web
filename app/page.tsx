// app/page.tsx
import { getHomePageData } from '@/lib/strapi';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ImpactMessage from '@/components/ImpactMessage';
import BentoGrid from '@/components/BentoGrid';
import Iniciativas from '@/components/Iniciativas';
import Donation from '@/components/Donation';
import TaxSection from '@/components/TaxSection';
import Newsletter from '@/components/Newsletter';
import About from '@/components/About';
import Footer from '@/components/Footer';

export const revalidate = 60; // Revalidar cada 60 segundos

export default async function HomePage() {
  // Obtener datos de Strapi
  const data = await getHomePageData();

  return (
    <>
      <Header
  logoBlanco={data.configuracion?.logoBlanco}
  logoColor={data.configuracion?.logoColor}
  textosSitio={data.textosSitio}
      />
      
      <main>
        <Hero slides={data.heroSlides} />
        
<ImpactMessage configuracion={data.configuracion} />
        
        <BentoGrid
          stats={data.stats}
          testimonio={data.testimonios[0]}
        />
        
        <Iniciativas iniciativas={data.iniciativas} />
        
        <Donation montos={data.configuracion?.montosDonacion} />
        
        <TaxSection />
        
        <TaxSection />
<Newsletter textosSitio={data.textosSitio} />
<About textosSitio={data.textosSitio} />
        
        <About textosSitio={data.textosSitio} />
      </main>
      
      <Footer />
    </>
  );
}
