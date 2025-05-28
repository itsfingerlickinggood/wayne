import React from 'react';
import { RouteObject } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Market from './pages/Market';
import WayneEnterprises from './pages/WayneEnterprises';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'portfolio',
        element: <Portfolio />
      },
      {
        path: 'market',
        element: <Market />
      },
      {
        path: 'enterprises',
        element: <WayneEnterprises />
      },
      {
        path: '*',
        element: <Dashboard />
      }
    ]
  }
];

export default routes;