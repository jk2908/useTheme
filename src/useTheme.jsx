import { createContext, useContext, createEffect, createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const storageKey = props.storageKey ?? 'theme';
  const themes = props.themes ?? ['system', 'light', 'dark'];
  const defaultTheme = props.defaultTheme ?? 'system';

  function createLocalSignal(initialState) {
    const [state, setState] = createSignal(initialState);

    if (localStorage[storageKey]) {
      setState(JSON.parse(localStorage[storageKey]));
    }

    createEffect(() => (localStorage[storageKey] = JSON.stringify(state())));

    return [state, setState];
  }

  function initialState() {
    if (isServer) return;
    const isStored = JSON.parse(localStorage.getItem(storageKey));

    return themes.find(theme => isStored === theme) ?? defaultTheme;
  }

  const [theme, setTheme] = createLocalSignal(initialState());

  const store = [theme, { setTheme: theme => setTheme(theme) }];

  createEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if ((theme() === 'system' && prefersDark.matches) || theme() === 'dark') {
      root.dataset.theme = 'dark';
      root.style.colorScheme = 'dark';
    } else {
      root.dataset.theme = theme();
      root.style.colorScheme = 'light';
    }
  });

  return <ThemeContext.Provider value={store}>{props.children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);