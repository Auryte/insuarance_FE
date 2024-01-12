import React, { FC, useState, MouseEvent, useContext } from 'react';
import { AxiosError } from 'axios';

//Components
import EmployerTabTitle from '../EmployerTabTitle/EmployerTabTitle';

// Styles
import MuiButton from '@/components/shared/MuiButton/MuiButton';
import { manageRuleGroup, manageRulesWrapper } from '@/styles/styled';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

// Contexts
import ViewsContext, { ViewsContextData } from '@/contexts/AdminViewsContext';
import { AuthContext, IAuthContext } from '@/contexts/AuthContext';
import EmployerContext, { EmployerContextData } from '@/contexts/EmployerContext';

// Hooks
import { useSnackbar } from '@/contexts/SnackbarContext';
import useErrorHandler from '@/hooks/useErrorHandler';

// APIs
import { updateEmployerSetup } from '@/pages/api/employerApi';

// Types
import { MainViews } from '@/types/adminTypes';
import { SnackbarType } from '@/types/snackbar';

// Utils
import { sleep } from '@/utils/helpers';
import { timeout } from '@/utils/timeout';

const ManageRules: FC = () => {
  const { handleErrors } = useErrorHandler();
  const { open, showSnackbar } = useSnackbar();
  const { user } = useContext<IAuthContext>(AuthContext);
  const { employer, saveEmployer } = useContext<EmployerContextData>(EmployerContext);
  const { setViewName } = useContext<ViewsContextData>(ViewsContext);
  const [isAbleToAddConsumers, setIsAbleToAddConsumers] = useState<boolean>(
    employer?.addConsumers ? true : false,
  );
  const [isAbleToClaimFilling, setIsAbleToClaimFilling] = useState<boolean>(
    employer?.claimFilling ? true : false,
  );

  const handleOnSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user || !employer) return;

    const { id: employerID } = employer;
    try {
      const updatedEmployer = await updateEmployerSetup(employerID, {
        addConsumers: isAbleToAddConsumers,
        claimFilling: isAbleToClaimFilling,
      });
      showSnackbar('Rules updated.', SnackbarType.success);
      saveEmployer(updatedEmployer);
      await sleep(timeout);
    } catch (err) {
      if (err instanceof AxiosError) {
        handleErrors(err);
        await sleep(timeout);
      }
    }

    redirect();
  };

  const redirect = () => setViewName(MainViews.administration);

  return (
    <Box component={'form'} sx={manageRulesWrapper}>
      <Box>
        <EmployerTabTitle />
        <Box sx={manageRuleGroup('Employer Data Management')}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              p: 3,
            }}
          >
            <Typography sx={{ alignSelf: 'center', justifySelf: 'end' }}>Add Consumers</Typography>
            <RadioGroup row name="employer-management">
              <FormControlLabel
                value={true}
                control={<Radio checked={isAbleToAddConsumers} />}
                label="Allow"
                onClick={() => setIsAbleToAddConsumers(true)}
              />
              <FormControlLabel
                value={false}
                control={<Radio checked={!isAbleToAddConsumers} />}
                label="Prevent"
                onClick={() => setIsAbleToAddConsumers(false)}
              />
            </RadioGroup>
          </Box>
        </Box>
        <Box sx={manageRuleGroup('Consumer Data Management')}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              p: 3,
            }}
          >
            <Typography sx={{ alignSelf: 'center', justifySelf: 'end' }}>Claim Filling</Typography>
            <RadioGroup row name="consumer-management">
              <FormControlLabel
                value={true}
                control={<Radio checked={isAbleToClaimFilling} />}
                label="Allow"
                onClick={() => setIsAbleToClaimFilling(true)}
              />
              <FormControlLabel
                value={false}
                control={<Radio checked={!isAbleToClaimFilling} />}
                label="Prevent"
                onClick={() => setIsAbleToClaimFilling(false)}
              />
            </RadioGroup>
          </Box>
        </Box>
      </Box>
      <Box sx={{ ml: 'auto', width: 'fit-content' }}>
        <MuiButton sx={{ mr: 3 }} onClick={redirect}>
          Cancel
        </MuiButton>
        <MuiButton type="submit" onClick={handleOnSubmit} disabled={Boolean(open)}>
          Submit
        </MuiButton>
      </Box>
    </Box>
  );
};

export default ManageRules;
