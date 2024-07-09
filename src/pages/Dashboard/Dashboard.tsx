import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageProps } from '@web/components/ProtectedRoute';
import Layout from '@web/components/Layout';
import SideLeft from '@web/components/SideLeft';
import List from './List';

const Dashboard: React.FC<PageProps> = ({ currentUser }) => (
  <Layout sideLeft={<SideLeft currentUser={currentUser} />}>
    <Routes>
      <Route path="/" element={<List />} />
    </Routes>
  </Layout>
);
export default Dashboard;
