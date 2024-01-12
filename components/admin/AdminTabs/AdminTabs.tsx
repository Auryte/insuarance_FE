import React, { useContext, useState, SyntheticEvent } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

// Contexts
import ViewsContext from '@/contexts/AdminViewsContext';
import { EmployerProvider } from '@/contexts/EmployerContext';

// Types
import { MainViews, TabPanelProps, TabsProps } from '@/types/adminTypes';

// Components
import EmployerTab from '../EmployerTab/EmployerTab';
import ClaimsTab from '../ClaimsTab/ClaimsTab';
import { PlanYearProvider } from '@/contexts/PlanYearContext';

// Styles
import { mainAdminPortalWrapper, tabBaseStyles } from '@/styles/styled';
import MuiButton from '@/components/shared/MuiButton/MuiButton';
import { AuthContext } from '@/contexts/AuthContext';

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { logout } = useContext(AuthContext);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const { setViewName } = useContext(ViewsContext);
  const handleClick = () => {
    setViewName(MainViews.employerSearch);
  };

  const tabsProps: TabsProps[] = [
    {
      label: 'Employer',
      sx: tabBaseStyles,
      onClick: handleClick,
    },
    {
      label: 'Claims',
      sx: tabBaseStyles,
    },
  ];

  return (
    <Box sx={mainAdminPortalWrapper}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'right' }}>
        <MuiButton variant="outlined" size="medium" sx={{ mb: 2 }} onClick={logout}>
          Logout
        </MuiButton>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ width: '100%' }}
        >
          {tabsProps.map((props, i) => (
            <Tab {...a11yProps(i)} {...props} key={i} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <PlanYearProvider>
          <EmployerTab />
        </PlanYearProvider>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <ClaimsTab />
      </TabPanel>
    </Box>
  );
};
export default AdminTabs;
