import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Hero3D.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero3D() {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const figura1 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5),
      new THREE.MeshStandardMaterial({ color: 0xff0055 })
    );
    figura1.position.set(0, 0, 0);
    scene.add(figura1);

    const figura2 = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.5, 1),
      new THREE.MeshStandardMaterial({ color: 0x2299ff })
    );
    figura2.position.set(-4, 0, -8);
    scene.add(figura2);

    const figura3 = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
      new THREE.MeshStandardMaterial({ color: 0x00ff99 })
    );
    figura3.position.set(6, 0, -10);
    scene.add(figura3);

    const figures = [figura1, figura2, figura3];
    const texts = [text1Ref, text2Ref, text3Ref];

    const targetPosition = new THREE.Vector3();
    const currentPosition = new THREE.Vector3(0, 2, 6);
    const lookAtTarget = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3();

    const animate = () => {
      requestAnimationFrame(animate);

      camera.position.lerp(currentPosition, 0.05);
      currentLookAt.lerp(lookAtTarget, 0.05);
      camera.lookAt(currentLookAt);

      figures.forEach((f, i) => {
        f.rotation.x += 0.002 * (i + 1);
        f.rotation.y += 0.003 * (i + 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=6000',
      scrub: true,
      pin: true,
      onUpdate: self => {
        const progress = self.progress;
        const index = Math.floor(progress * 3);
        const p = progress * 3 - index;

        const start = figures[index] ? figures[index].position : figures[0].position;
        const end = figures[index + 1] ? figures[index + 1].position : figures[index].position;

        targetPosition.lerpVectors(start, end, p);
        currentPosition.set(targetPosition.x + 5, 2, targetPosition.z + 6);
        lookAtTarget.copy(targetPosition);

        texts.forEach((ref, i) => {
          const visible = i === index;
          gsap.to(ref.current, {
            opacity: visible ? 1 : 0,
            filter: visible ? 'blur(0px)' : 'blur(8px)',
            transform: visible ? 'translateY(0)' : 'translateY(-20px)',
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ height: '600vh', position: 'relative' }}>
      <div
        ref={containerRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: '30%',
          left: '10%',
          width: '80%',
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: '500',
          fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
          letterSpacing: '0.05em',
          zIndex: 10,
          lineHeight: 1.3,
          textShadow: '0 0 20px rgba(255, 255, 255, 0.15)',
        }}
      >
        <div ref={text1Ref} style={{ position: 'absolute', opacity: 1 }}>
          👨‍💻 Soy Jordi, desarrollador fullstack.
        </div>
        <div ref={text2Ref} style={{ position: 'absolute', opacity: 0 }}>
          🎨 El frontend es la capa visual interactiva.
        </div>
        <div ref={text3Ref} style={{ position: 'absolute', opacity: 0 }}>
          🧠 El backend conecta, guarda y procesa todo.
        </div>
      </div>
    </div>
  );
}
