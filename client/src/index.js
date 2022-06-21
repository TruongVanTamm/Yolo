import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout/Layout';
import './Asset/boxicons-2.1.2/css/boxicons.min.css';
import './sass/index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { DataProvider } from './GlobalState';
const container = document.getElementById('root');
const root = createRoot(container);
function App() {
  return (
    <DataProvider>
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
    </DataProvider>
  );
}
root.render(<App />);
