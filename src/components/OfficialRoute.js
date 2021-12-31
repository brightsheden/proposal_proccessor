import React from 'react';
import Layout from './Layout';
import Home from '../../screens/Home';
import NewProposalScreen from '../screens/NewProposalScreen';
import ProposalScreen from '../screens/ProposalScreen';

const OfficialRoutes = {
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/create',
            element: <NewProposalScreen/>
        },
        {
            path: '/proposals/:id',
            element: <ProposalScreen/>
        }
    ]
}

export default OfficialRoutes;