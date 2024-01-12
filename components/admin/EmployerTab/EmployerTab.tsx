import React, { FC, useContext } from 'react';

// Contexts
import ViewsContext from '@/contexts/AdminViewsContext';

// Components
import AddUpdateEmployer from './AddUpdateEmployer/AddUpdateEmployer';
import EmployerSearch from './EmployerSearch/EmployerSearch';
import EmployerManagement from './EmployerManagement/EmployerManagement';
import ManagePlans from '@/components/admin/EmployerTab/ManagePlans/ManagePlans';
import ManageYearPlan from '@/components/admin/EmployerTab/ManagePlanYear/ManagePlanYear';
import ManageUsers from './ManageUsers/ManageUsers';
import ManageRules from './ManageRules/ManageRules';

// Styles
import { Paper } from '@mui/material';
interface MainViewsProps {
  [name: string]: JSX.Element;
}

const EmployerTab: FC = () => {
  const { viewName } = useContext(ViewsContext);

  const mainViews: MainViewsProps = {
    employerSearch: <EmployerSearch />,
    addUpdateEmployer: <AddUpdateEmployer />,
    administration: <EmployerManagement />,
    manageProfile: <AddUpdateEmployer />,
    manageUsers: <ManageUsers />,
    manageUser: <div>Add/update user</div>,
    manageRules: <ManageRules />,
    managePlans: <ManagePlans />,
    managePlanYear: <ManageYearPlan />,
  };

  return <Paper sx={{ width: '100%', height: 'fit-content' }}>{mainViews[viewName]}</Paper>;
};

export default EmployerTab;
