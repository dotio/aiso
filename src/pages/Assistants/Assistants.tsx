import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageProps } from '@web/components/ProtectedRoute';

import Layout from '@web/components/Layout';
import SideLeft from '@web/components/SideLeft';

import List from './List';
import Show from './Show';
import Add from './Add';
import Edit from './Edit';

const Assistants: React.FC<PageProps> = ({ currentUser }) => {
  return (
    <Layout sideLeft={<SideLeft currentUser={currentUser} />}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:assistantId/*" element={<Show />} />
        <Route path="/:assistantId/edit" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Layout>
  );
};

export default Assistants;
