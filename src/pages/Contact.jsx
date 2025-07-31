import { useState } from 'react';
import './styles/Contact.css';
import MiniLoader from '../components/Loader/MiniLoader';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');


  const sanitize = (value) =>
    value.replace(/<[^>]*>?/gm, '').replace(/script/gi, '');

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = '¿Sin nombre? ¿Sos un fantasma? 👻';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Sin email no puedo enviarte memes 😢';
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.email)) {
      newErrors.email = 'Ese email parece salido de un teclado roto...';
    }

    if (!form.message.trim()) {
      newErrors.message = '¿Un mensaje vacío? Sospechoso...';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Un poquito más de entusiasmo, ¿no? 😅';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: sanitize(value) }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };
    const successMessagesPool = [
        name => `¡Gracias ${name}! Te responderé pronto 🚀`,
        name => `¡Mensaje recibido ${name}! Ahora ya sé que existís 😎`,
        name => `¡${name}, tu mensaje llegó! En breve tendrás señales de vida.`,
    ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Aquí va la lógica futura de envío al backend
    console.log('Enviando mensaje:', form);
    const randomMessage = successMessagesPool[Math.floor(Math.random() * successMessagesPool.length)];
    setSuccessMessage(randomMessage(form.name.trim()));

    setSuccess(true);
    setForm({ name: '', email: '', message: '' });
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
        setSuccess(true);
        setIsSubmitting(false);
    }, 1000); // simula envío

  };

  return (
    <section className="contact-section">
      <h1>Contacto</h1>
      <p>Completá el formulario y prometo leerlo con atención. O al menos hacer como que sí. 😄</p>
        {success && <div className="success-msg fade-in">{successMessage}</div>}


      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label>
          Nombre:
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name  && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>
          Mensaje:
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className={errors.message ? 'input-error' : ''}
          />
          { errors.message && <span className="error">{errors.message}</span>}
        </label>
        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando' : 'Enviar mensaje ✉️'}
            {isSubmitting && <MiniLoader />}
        </button>


      </form>
    </section>
  );
}
