import Router from "./router.jsx";
import './App.css'
import { AppBar } from "./components/appBar.js";
import {QueryClientProvider,QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from 'react-query/devtools'

function App() {
  return (
    <>
     <Router/>
      {/* <ReactQueryDevtools/> */}
    </>
    
  )
}

export default App
