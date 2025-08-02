import { useTheme } from '../../context/ThemeContext';
import '../styles/ThemeToggle.css';

export default function ThemeToggle() {
  const { changeRandomTheme } = useTheme();

  return (
    <button className="magic-theme-btn" onClick={changeRandomTheme} title="¡Cambia el tema!">
      🪄
    </button>
  );
}
