import React from 'react'
import { Outlet } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Search from './components/common/Search';

const Root = () => {
  return (
    <>
      <AppLayout>
        <main>
          <Search />
          <Outlet />
        </main>
      </AppLayout>
    </>
  );
}

export default Root;
