import React from 'react';
import { Toaster } from 'sonner'
import Layout from "./layouts/Layout";
import "@fontsource/source-sans-pro";

function App() {
  return (
    <div className='bg-gray-100'>
      <Toaster richColors position="top-center"/>
      <Layout />
    </div>
  )
};

export default App;
