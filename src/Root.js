import React from 'react'
import { Outlet } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

const Root = () => {
  return (
    <>
      <AppLayout>
        <main className='py-10'>
          <Outlet />
        </main>
      </AppLayout>
    </>
  );
}

export default Root;
