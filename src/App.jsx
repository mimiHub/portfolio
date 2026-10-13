import { Header, Footer } from '@/layouts';
import Hero from '@/features/hero/Hero';
import Skills from '@/features/skills/Skills';
import Projects from '@/features/projects/Projects';
import Contact from '@/features/contact/Contact';
import { NAV_ITEMS } from '@/data/nav';

export default function App() {
  return (
    <>
      <Header items={NAV_ITEMS} />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
