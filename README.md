```
  import { useTheme } from '../useTheme';

  export default function ChangeTheme() {
    const [theme, { setTheme }] = useTheme();

    const handleTheme = () => {
      setTheme(theme => theme === 'light' ? 'dark' : 'light');
    }

    return (
      <button onClick={handleTheme}>
        Change theme
      </button>
    );
  }
```
```
  import { ThemeProvider } from './useTheme';
  import ChangeTheme from './ChangeTheme';

  export default function App() {

    return (
      <>
        <ThemeProvider>
        {/* 
          // Defaults
          <ThemeProvide defaultTheme="system" themes={['light', 'dark', 'system']} storageKey="theme"> 
        */}
          <ChangeTheme />
        </ThemeProvider>
      </>
    );
  }
```