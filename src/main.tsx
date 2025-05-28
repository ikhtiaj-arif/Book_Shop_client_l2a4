import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme-provider.tsx'
import { persistor, store } from './redux/store.ts'
import router from './routes/Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>,
)
