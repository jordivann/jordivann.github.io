import { themes } from '../data/themes';

export function applyTheme(themeKey = 'default') {
  const theme = themes[themeKey];
  if (!theme) return;
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
