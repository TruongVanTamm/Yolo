import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout/Layout';
import './Asset/boxicons-2.1.2/css/boxicons.min.css';
import './sass/index.scss';
import {
  transitions,
  positions,
  types,
  Provider as AlertProvider,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { DataProvider } from './GlobalState';
const container = document.getElementById('root');
const root = createRoot(container);
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  type: types.ERROR,
};
function App() {
  return (
    <AlertProvider
      template={AlertTemplate}
      {...options}
    >
      <DataProvider>
        <Layout></Layout>
      </DataProvider>
    </AlertProvider>
  );
}
root.render(<App />);
