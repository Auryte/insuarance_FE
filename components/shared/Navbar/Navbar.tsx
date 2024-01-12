import React from 'react';
import { useRouter } from 'next/router';

// Components
import NavigationLink from '../NavigationLink/NavigationLink';

// Styles
import { Box } from '@mui/material';
import { navigationButtonsWrapper } from '@/styles/styled';

// Utils
import { navigationRoutes } from '@/utils/navigationRoutes';

const Navbar = () => {
  const router = useRouter();

  return (
    <Box sx={navigationButtonsWrapper}>
      {navigationRoutes.map(({ linkName, path }) => (
        <NavigationLink key={linkName} href={path} text={linkName} router={router} />
      ))}
    </Box>
  );
};

export default Navbar;
