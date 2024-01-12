import React, { FC, useEffect } from 'react';
import { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// Components
import EnrollMentDialogTitle from './EnrollMentDialogTitle';
import SelectInput from '@/components/shared/SelectInput/SelectInput';
import MuiButton from '@/components/shared/MuiButton/MuiButton';
import FormInput from '@/components/shared/FormInput/FormInput';

// Api
import { createEnrollment, updateEnrollment } from '@/pages/api/enrollmentApi';

// Contexts
import { useSnackbar } from '@/contexts/SnackbarContext';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Utils
import { enrollmentValidation, isEnroll } from './EnrollmentsDialogForm.utils';

// Styles
import { modalFormWrapper } from '@/styles/styled';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  MenuItem,
  Typography,
} from '@mui/material';

// Types
import { Enrollment, EnrollmentsDialogProps, EnrollmentsFormInputs } from '@/types/enrollment';
import { PlanYear } from '@/types/insurance';
import { SnackbarType } from '@/types/snackbar';

const EnrollmentsDialogForm: FC<EnrollmentsDialogProps> = ({
  enrollments,
  enrollment,
  handleCancelModal,
  handleChange,
  open,
  plans,
  onClose,
}) => {
  const { handleSubmit, reset, control, setError, formState } = useForm<EnrollmentsFormInputs>({
    defaultValues: {
      planName: '',
      election: 0,
    },
    resolver: yupResolver(enrollmentValidation),
  });
  const { handleErrors } = useErrorHandler();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    enrollment
      ? reset({
          planName: enrollment.plan.name,
          election: enrollment.election || 0,
        })
      : reset({
          planName: '',
          election: 0,
        });
  }, [enrollment, reset]);

  const generateSelectOptions = (): JSX.Element[] => {
    const choosePlansOrEnrollments: Enrollment[] | PlanYear[] = plans.length ? plans : enrollments;
    return choosePlansOrEnrollments.map((enroll: Enrollment | PlanYear) => {
      const name = isEnroll(enroll) ? enroll.plan.name : enroll.name;
      return (
        <MenuItem key={enroll.id} value={name} onClick={() => handleChange(enroll)}>
          {name}
        </MenuItem>
      );
    });
  };

  const handleOnSubmit = async (data: EnrollmentsFormInputs) => {
    try {
      const { election } = data;
      if (enrollment) {
        const requiredData = {
          planID: enrollment.planID,
          election,
        };
        enrollment.id
          ? await updateEnrollment(enrollment.consumerID, enrollment.id, requiredData)
          : await createEnrollment(enrollment.consumerID, requiredData);
      }
      showSnackbar('Enrollments updated successfully.', SnackbarType.success);
      onClose();
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  const handleOnCancel = () => {
    reset();
    handleCancelModal();
  };

  return (
    <Dialog open={open} onClose={handleOnCancel} data-testid="enrollment-dialog">
      <EnrollMentDialogTitle onClose={handleOnCancel}>
        Add or Update enrollment
      </EnrollMentDialogTitle>
      <Divider />
      <DialogContent sx={{ maxWidth: '480px' }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleOnSubmit)}
          sx={modalFormWrapper}
        >
          <SelectInput labelId="planName" label="Plan" name="planName" control={control}>
            {generateSelectOptions()}
          </SelectInput>
          <FormInput control={control} name="election" type="number" required />
          <Typography>Contribution: {enrollment?.plan.contributions} $</Typography>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <MuiButton onClick={handleOnCancel}>Cancel</MuiButton>
            <MuiButton type="submit">Submit</MuiButton>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentsDialogForm;
