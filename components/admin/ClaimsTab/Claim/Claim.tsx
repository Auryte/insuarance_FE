import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, MenuItem } from '@mui/material';

import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

// Contexts
import { useSnackbar } from '@/contexts/SnackbarContext';

// Types
import { SnackbarType } from '@/types/snackbar';
import { Claim } from '@/types/adminTypes';
import { PlanType } from '@/types/insurance';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Api
import { updateClaim } from '@/pages/api/claimsApi';
import { updatePlanYear } from '@/pages/api/planApi';

// Components
import FormInput from '@/components/shared/FormInput/FormInput';
import SelectInput from '@/components/shared/SelectInput/SelectInput';
import DatePickerInput from '@/components/shared/DatePickerInput/DatePickerInput';
import { PopupAlert } from '@/components/shared/PopupAlert/PopupAlert';
import MuiButton from '@/components/shared/MuiButton/MuiButton';

// Styles
import { theme } from '@/styles/theme';
import {
  gridBoxWrapper,
  formBoxWrapper,
  boxStylesAlternative,
  boxStyles,
  gridWrapper,
} from '@/styles/styled';

export type ClaimFormInputs = {
  consumer: string;
  phone: string;
  date: string;
  plan: string;
  amount: number;
};

const ConsumerClaim: FC<Claim> = props => {
  const { amount, consumer, id, number, plan, planID, startDate, changeViewToClaims } = props;

  let status = props.status;

  const verifiedDate = new Date(startDate);
  const year = verifiedDate.getFullYear();
  const month = verifiedDate.getMonth() + 1;
  const day = verifiedDate.getDate() < 10 ? `0${verifiedDate.getDate()}` : verifiedDate.getDate();

  const claimData = {
    consumer: consumer.firstName + ' ' + consumer.lastName,
    phone: consumer.phone,
    date: new Date(
      Date.UTC(
        verifiedDate.getFullYear(),
        verifiedDate.getMonth(),
        verifiedDate.getDate(),
        0,
        0,
        0,
      ),
    ).toISOString(),
    plan: plan.type,
    amount,
  };

  const { handleSubmit, control, setValue, setError, formState } = useForm<ClaimFormInputs>({
    defaultValues: claimData,
  });

  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<ClaimFormInputs>();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [editIsClicked, setEditIsClicked] = useState(false);
  const [fieldIsDisabled, setFieldIsDisabled] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [previousDateInput, setPreviousDateInput] = useState(claimData.date);
  const [previousPlanInput, setPreviousPlanInput] = useState(claimData.plan);
  const [previousAmountInput, setPreviousAmountInput] = useState(claimData.amount);
  const { handleErrors } = useErrorHandler();

  useEffect(() => {
    if (status === 'pending') {
      setButtonIsDisabled(false);
    }
  }, []);

  const handleOnSubmit = (data: ClaimFormInputs) => {
    setFormData(data);
    setPreviousDateInput(data.date);
    setPreviousPlanInput(data.plan);
    setPreviousAmountInput(data.amount);
  };

  const sendForm = async () => {
    try {
      await updateClaim(id, {
        amount: Number(formData?.amount),
        planID,
        startDate: formData?.date,
        status,
      });
      if (claimData.plan !== formData?.plan) {
        await updatePlanYear(
          {
            name: plan.name,
            startDate: plan.startDate,
            endDate: plan.endDate,
            contributions: plan.contributions,
            payrollFrequency: plan.payrollFrequency,
            type: formData?.plan as PlanType,
          },
          plan.employerId,
          planID,
        );
      }

      showSnackbar('Successfully updated.', SnackbarType.success);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  const handleApprove = function (ev: React.MouseEvent): void {
    setDialogMessage('Are you sure you want to approve this claim?');
    setOpenDialog(true);
  };

  const handleDeny = function (ev: React.MouseEvent): void {
    setDialogMessage('Are you sure you want to deny this claim?');
    setOpenDialog(true);
  };

  const handleEditToggle = function (ev: React.MouseEvent): void {
    setEditIsClicked(true);
    setFieldIsDisabled(false);
  };

  const handleSubmitClick = function (ev: React.MouseEvent): void {
    setDialogMessage('Are you sure you want to submit?');
    setOpenDialog(true);
  };

  const handleCancel = function (ev: React.MouseEvent): void {
    setValue('date', previousDateInput);
    setValue('plan', previousPlanInput);
    setValue('amount', previousAmountInput);
    setFieldIsDisabled(true);
    setEditIsClicked(false);
  };

  const handleDialogConfirm = async function () {
    if (dialogMessage === 'Are you sure you want to approve this claim?') {
      status = 'approved';
      try {
        await updateClaim(id, { amount, planID, startDate, status });

        showSnackbar('Successfully updated.', SnackbarType.success);
        changeViewToClaims?.(undefined);
      } catch (error) {
        if (error instanceof AxiosError) {
          handleErrors(error, setError);
        }
      }
    } else if (dialogMessage === 'Are you sure you want to deny this claim?') {
      status = 'denied';
      try {
        await updateClaim(id, { amount, planID, startDate, status });

        showSnackbar('Successfully updated.', SnackbarType.success);
        changeViewToClaims?.(undefined);
      } catch (error) {
        if (error instanceof AxiosError) {
          handleErrors(error, setError);
        }
      }
    } else if (dialogMessage === 'Are you sure you want to submit?') {
      sendForm();
      setFieldIsDisabled(true);
      setEditIsClicked(false);
    }

    setOpenDialog(false);
  };

  const handleDialogRefuse = (): void => setOpenDialog(false);

  const now = dayjs().toISOString();

  return (
    <Box sx={gridBoxWrapper}>
      <Grid container item sx={{ ...gridWrapper, mt: -3 }}>
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: theme.typography.fontWeightMedium }}
        >
          Claim number: {number}
        </Typography>
        <MuiButton
          variant="outlined"
          sx={{ width: 'fit-content', px: 9, ml: 0, my: 3 }}
          onClick={() => changeViewToClaims?.(undefined)}
        >
          Back to All Claims
        </MuiButton>
      </Grid>
      <Box component="form" noValidate onSubmit={handleSubmit(handleOnSubmit)} sx={formBoxWrapper}>
        <Box
          sx={{
            ...boxStylesAlternative,
            '&::before': { ...boxStyles['&::before'], content: `"Detail"` },
          }}
        >
          <Grid container spacing={3}>
            <FormInput control={control} name="consumer" disabled type="text" />
            <FormInput control={control} name="phone" disabled type="text" />
            <Grid item xs={6}>
              <DatePickerInput
                label="Date of Service"
                name="date"
                control={control}
                value={startDate}
                disabled={fieldIsDisabled}
                onChange={(date: Date) => {
                  const verified = new Date(date);
                  const newDate = new Date(
                    Date.UTC(
                      verified.getFullYear(),
                      verified.getMonth(),
                      verified.getDate(),
                      0,
                      0,
                      0,
                    ),
                  ).toISOString();

                  setValue('date', newDate);
                }}
                minDate={plan.startDate}
                maxDate={plan.endDate > now ? now : plan.endDate}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectInput
                name="plan"
                control={control}
                labelId="plan-type"
                label="Plan Type"
                disabled={fieldIsDisabled}
              >
                <MenuItem value={PlanType.dental}>Dental</MenuItem>
                <MenuItem value={PlanType.medical}>Medical</MenuItem>
              </SelectInput>
            </Grid>
            <FormInput control={control} name="amount" disabled={fieldIsDisabled} type="number" />
            <Button
              variant="contained"
              size="medium"
              disabled={buttonIsDisabled}
              onClick={handleEditToggle}
              sx={{ width: '125px', alignSelf: 'flex-end', ml: 'auto' }}
            >
              Edit
            </Button>
          </Grid>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'right', mt: 5 }}>
          {!editIsClicked ? (
            <>
              <Button
                variant="contained"
                size="medium"
                disabled={buttonIsDisabled}
                onClick={handleApprove}
                sx={{ width: '125px' }}
              >
                Approve
              </Button>
              <PopupAlert
                isOpen={openDialog}
                message={dialogMessage}
                handleConfirm={handleDialogConfirm}
                handleClose={handleDialogRefuse}
              />
              <Button
                variant="contained"
                size="medium"
                disabled={buttonIsDisabled}
                onClick={handleDeny}
                sx={{ ml: 2, width: '125px' }}
              >
                Deny
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                onClick={handleSubmitClick}
                sx={{ width: '125px' }}
              >
                Submit
              </Button>
              <PopupAlert
                isOpen={openDialog}
                message={dialogMessage}
                handleConfirm={handleDialogConfirm}
                handleClose={handleDialogRefuse}
              />
              <Button
                variant="contained"
                size="medium"
                onClick={handleCancel}
                sx={{ ml: 2, width: '125px' }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ConsumerClaim;
