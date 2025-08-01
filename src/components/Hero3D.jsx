import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Hero3D.css';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Hero3D() {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0e0e);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 2, 6);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.7, 0.4, 0.85);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const figures = [
      new THREE.Mesh(new THREE.IcosahedronGeometry(1.5), new THREE.MeshStandardMaterial({ color: 0xff0055 })),
      new THREE.Mesh(new THREE.OctahedronGeometry(1.5, 1), new THREE.MeshStandardMaterial({ color: 0x2299ff })),
      new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.3, 100, 16), new THREE.MeshStandardMaterial({ color: 0x00ff99 })),
      new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.4, 16, 100), new THREE.MeshStandardMaterial({ color: 0xffff00 })),
    ];

    const positions = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-4, 0, -8),
      new THREE.Vector3(6, 0, -10),
      new THREE.Vector3(2, -2, -18),
      new THREE.Vector3(2, -6, -22),
    ];

    figures.forEach((f, i) => {
      f.position.copy(positions[i]);
      scene.add(f);
    });

    const dummy = new THREE.Object3D();
    dummy.position.copy(positions[4]);
    scene.add(dummy);

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

      composer.render();
    };

    animate();

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=10000',
      scrub: true,
      pin: true,
      onUpdate: self => {
        const progress = self.progress;
          window.dispatchEvent(new CustomEvent("hero3d-scroll", {
            detail: { progress }
          }));
        const steps = textRefs.length;
        const index = Math.min(Math.floor(progress * steps), steps - 1);
        const p = progress * steps - index;


        const start = positions[index] || positions[positions.length - 1];
        const end = positions[index + 1] || positions[positions.length - 1];

        targetPosition.lerpVectors(start, end, p);
        currentPosition.set(targetPosition.x + 5, targetPosition.y + 2, targetPosition.z + 6);
        lookAtTarget.copy(targetPosition);

        textRefs.forEach((ref, i) => {
          const visible = i === index;
          gsap.to(ref.current, {
            opacity: visible ? 1 : 0,
            filter: visible ? 'blur(0px)' : 'blur(8px)',
            transform: visible ? 'translateY(0)' : 'translateY(-20px)',
            duration: 0.6,
            ease: 'power3.out',
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
    <div style={{ height: '1000vh', position: 'relative', margin: 0, padding: 0 }}>
      <div
        ref={containerRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 1,
          margin: 0,
          padding: 0,
        }}
      />
      <div className="hero3d-text-wrapper">
        <div ref={textRefs[0]} className="hero3d-text t1">
          👨‍💻 Soy <strong>Jordi Van Norden</strong>, programador fullstack con visión creativa y pasión por lo que hago.
        </div>
        <div ref={textRefs[1]} className="hero3d-text t2">
          ⚛️ Desarrollo <strong>frontend</strong> con React, Astro y más. Interfaces modernas y adaptables.
        </div>
        <div ref={textRefs[2]} className="hero3d-text t3">
          🔧 En el <strong>backend</strong>: Node.js, Express, PostgreSQL, seguridad y APIs eficientes.
        </div>
        <div ref={textRefs[3]} className="hero3d-text t4">
          🧩 Escribo código <strong>limpio, escalable y mantenible</strong>. Buenas prácticas como base.
        </div>
        <div ref={textRefs[4]} className="hero3d-text t5">
          🙌 Gracias por <strong>visitar</strong> mi universo creativo.<br />
          <Link to="/about" className="hero3d-btn">Conocer más sobre mí</Link>
        </div>
      </div>
    </div>
  );
}
