import Link from 'next/link';
import React, { useState, MouseEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { AxiosError } from 'axios';
// Components
import MuiButton from '@/components/shared/MuiButton/MuiButton';
// Hooks
import { useSnackbar } from '@/contexts/SnackbarContext';
import useErrorHandler from '@/hooks/useErrorHandler';
// API
import { updateEmployerSetup } from '@/pages/api/employerApi';
// Styles
import { boxStyles, gridBoxWrapper } from '@/styles/styled';
// Types
import { SnackbarType } from '@/types/snackbar';
// Utils
import { sleep } from '@/utils/helpers';
import { timeout } from '@/utils/timeout';
// Contexts
import { AuthContext } from '@/contexts/AuthContext';

const SetupPage = () => {
  const [isCustomize, setIsCustomize] = useState<boolean>(false);
  const [isAllow, setIsAllow] = useState<boolean>(true);
  const { handleErrors } = useErrorHandler();
  const { open, showSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const redirect = () => router.push('/employer/employees');

  const handleOnSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isCustomize) {
      if (!user) return;
      const { employerID } = user;

      try {
        await updateEmployerSetup(employerID, { claimFilling: isAllow });
        showSnackbar('Setup updated', SnackbarType.success);
        await sleep(timeout);
      } catch (err) {
        if (err instanceof AxiosError) {
          handleErrors(err);
          await sleep(timeout);
        }
      }
    }

    redirect();
  };

  return (
    <Box
      component={'form'}
      sx={{
        ...gridBoxWrapper,
        px: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          ...boxStyles,
          p: 3,
          mt: 3,
          height: {},
          '&::before': { ...boxStyles['&::before'], content: `"Consumer Data Management"` },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            <Typography>Claim Filling</Typography>
            <RadioGroup row name="setting-type" defaultValue={'administration'}>
              <FormControlLabel
                value="administration"
                control={<Radio />}
                label="Administrator default"
                onClick={() => setIsCustomize(false)}
              />
              <FormControlLabel
                value="customize"
                control={<Radio />}
                label="Customize"
                onClick={() => setIsCustomize(true)}
              />
            </RadioGroup>
          </Box>
          <RadioGroup
            row
            name="setting"
            defaultValue={true}
            sx={{
              marginLeft: 'auto',
            }}
          >
            <FormControlLabel
              value={true}
              onClick={() => setIsAllow(true)}
              disabled={isCustomize ? false : true}
              control={<Radio />}
              label="Allow"
            />
            <FormControlLabel
              value={false}
              onClick={() => setIsAllow(false)}
              disabled={isCustomize ? false : true}
              control={<Radio />}
              label="Prevent"
            />
          </RadioGroup>
        </Box>
      </Box>
      <Box sx={{ mt: 5, ml: 'auto', width: 'fit-content' }}>
        <Link href={'/employer/employees'}>
          <MuiButton sx={{ mr: 3 }}>Cancel</MuiButton>
        </Link>
        <MuiButton type="submit" onClick={e => handleOnSubmit(e)} disabled={Boolean(open)}>
          Submit
        </MuiButton>
      </Box>
    </Box>
  );
};

export default SetupPage;
