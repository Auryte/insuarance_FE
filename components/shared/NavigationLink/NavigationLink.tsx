import React, { FC } from 'react';
import Link from 'next/link';

// Styles
import { Button } from '@mui/material';
import { theme } from '@/styles/theme';

// Types
import { NavigationLinkProps } from '@/types/navigation';
import { UserRole } from '@/types/user';

const NavigationLink: FC<NavigationLinkProps> = ({ href, text, router }) => {
  const newHref =
    router.pathname === `/${UserRole.employer}`
      ? router.pathname + href
      : `/${UserRole.employer}${href}`;
  const isActive = router.asPath === newHref;
  const activeColor = isActive ? { backgroundColor: theme.palette.primary.dark } : {};
  return (
    <>
      <Link href={newHref} legacyBehavior passHref replace>
        <Button
          variant="contained"
          size="medium"
          sx={{ backgroundColor: activeColor, width: 200, m: 1 }}
        >
          {text}
        </Button>
      </Link>
    </>
  );
};

export default NavigationLink;
