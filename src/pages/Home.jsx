// src/pages/Home.jsx
import Hero3D from '../components/Hero3D'; // versión estable y final
import './styles/Home.css';
// import Hero3DScroll from '../components/Hero3DScroll'; // si querés testear otra versión

export default function Home() {
  return (
    <>
      <section className='section'>
        <Hero3D />

      </section>
      <section className='section'>
        <div className='invitacion'>
          <h1>Sección Final – CTA o Portafolio</h1>

        </div>
      </section>
    </>
  );
}
