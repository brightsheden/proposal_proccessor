//import { useRoutes } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

import OfficialRoutes from './OfficialRoute';

const Routes = () => {
    return useRouteMatch([OfficialRoutes])
}

export default Routes;