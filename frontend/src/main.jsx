import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import Aos from 'aos'

Aos.init()
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
  </PersistGate>
  </Provider>
)
