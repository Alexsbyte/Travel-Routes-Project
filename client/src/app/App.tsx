import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { createTheme, MantineProvider,  } from '@mantine/core';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import store from './store/store';


export function App() {
  const theme = createTheme({
    colors: {
      primary: [
        "#E3F2FD",
        "#BBDEFB",
        "#90CAF9",
        "#64B5F6",
        "#42A5F5",
        "#2196F3",
        "#1E88E5",
        "#1976D2",
        "#1565C0",
        "#0D47A1",
      ],
    },

    primaryColor: 'primary',
    headings: {
      sizes: {
        h1: { fontSize: '32px', fontWeight: '700' },
        h2: { fontSize: '28px', fontWeight: '600' },
        h3: { fontSize: '24px', fontWeight: '500' },
        h4: { fontSize: '20px', fontWeight: '400' },
      },
    },
    radius: { sm: "8px", md: "12px", lg: "16px" },
  });

  return (
    <Provider store={store}>
    <MantineProvider theme={theme} >
      <RouterProvider router={router} />
    </MantineProvider>
    </Provider>
  );
}
