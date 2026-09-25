import s from '@/components/home/home.module.css';
import About from '@/components/home/About';
import Explore from '@/components/home/Explore';
import Experience from '@/components/home/Experience';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <main className={s.page}>
      <About />
      <Explore />
      <Experience />
      <Footer />
    </main>
  );
}
