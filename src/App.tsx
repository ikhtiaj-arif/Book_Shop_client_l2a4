
import { ConfigProvider } from 'antd'
import MainLayout from './components/layout/MainLayout'
// import { theme } from "tailwindcss"

function App() {


  return (
    <ConfigProvider
    // theme={{
    //   token: {
    //     colorPrimary: theme.colors.primary, // Set Ant Design primary color to Tailwind primary
    //     colorSuccess: theme.colors.green, // Match Tailwind success colors
    //     colorError: theme.colors.red, // Match Tailwind error colors
    //     colorWarning: theme.colors.yellow, // Match Tailwind warning colors
    //     colorInfo: theme.colors.blue, // Match Tailwind info colors
    //   },
    // }}
    >
      <MainLayout />
    </ConfigProvider>
  )
}

export default App
