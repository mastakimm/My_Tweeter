import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@/_services/provider/ThemeProvider.jsx";
import {AuthProvider} from "@/_services/provider/AuthProvider.jsx";
import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

import { QueryClient } from 'react-query';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
          <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools client={queryClient} initialIsOpen={false}/>

              <ThemeProvider>
                  <AuthProvider>
                      <App/>
                  </AuthProvider>
              </ThemeProvider>
          </QueryClientProvider>
      </Router>
  </React.StrictMode>
)
