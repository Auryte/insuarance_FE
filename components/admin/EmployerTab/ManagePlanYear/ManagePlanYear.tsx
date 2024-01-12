import { FC, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Grid, MenuItem } from '@mui/material';
import { Dayjs } from 'dayjs';
import { AxiosError } from 'axios';

// Contexts
import ViewsContext from '@/contexts/AdminViewsContext';
import { PlanYearContext } from '@/contexts/PlanYearContext';
import EmployerContext, { EmployerContextData } from '@/contexts/EmployerContext';
import { useSnackbar } from '@/contexts/SnackbarContext';

// Components
import EmployerTabTitle from '@/components/admin/EmployerTab/EmployerTabTitle/EmployerTabTitle';
import DatePickerInput from '@/components/shared/DatePickerInput/DatePickerInput';
import FormInput from '@/components/shared/FormInput/FormInput';
import SelectInput from '@/components/shared/SelectInput/SelectInput';
import MuiButton from '@/components/shared/MuiButton/MuiButton';
import { PopupAlert } from '@/components/shared/PopupAlert/PopupAlert';

// Api
import { createPlanYear, updatePlanYear } from '@/pages/api/planApi';

// Utils
import { planYearValidationSchema } from '@/components/admin/EmployerTab/ManagePlanYear/ManagePlanYear.utils';
import { getLatestDate, getCurrentDate, getISODateFormat } from '@/utils/date';
import { timeout } from '@/utils/timeout';
import { sleep } from '@/utils/helpers';

// Styles
import { boxStyles, boxStylesAlternative, formBoxWrapper, gridBoxWrapper } from '@/styles/styled';

// Types
import { MainViews } from '@/types/adminTypes';
import { PlanType, PayrollFrequency } from '@/types/insurance';
import { SnackbarType } from '@/types/snackbar';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

export type ManagePlanYearInputs = {
  name: string;
  startDate: string | null;
  endDate: string | null;
  contributions: number;
  payrollFrequency: PayrollFrequency;
  type: PlanType;
};

enum ActionButton {
  submit = 'submit',
  cancel = 'cancel',
}

const ManagePlanYear: FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>('');
  const [actionButton, setActionButton] = useState<ActionButton | null>(null);
  const [formData, setFormData] = useState<ManagePlanYearInputs | null>(null);
  const { setViewName } = useContext(ViewsContext);
  const { employer } = useContext<EmployerContextData>(EmployerContext);
  const { planYear } = useContext(PlanYearContext);
  const { handleErrors } = useErrorHandler();
  const { open, showSnackbar } = useSnackbar();
  const { handleSubmit, reset, control, watch, setValue, setError, formState } =
    useForm<ManagePlanYearInputs>({
      defaultValues: planYear || {
        name: '',
        payrollFrequency: undefined,
        contributions: undefined,
        type: undefined,
        startDate: getCurrentDate(),
        endDate: null,
      },
      resolver: yupResolver(planYearValidationSchema),
    });

  const handleOnSubmitForm = (data: ManagePlanYearInputs) => {
    setIsOpenPopup(true);
    setPopupText('This action will send the data');
    setActionButton(ActionButton.submit);
    setFormData({
      ...data,
      contributions: parseInt(data.contributions.toString(), 10),
    });
  };

  const handleOnCancelForm = () => {
    setActionButton(ActionButton.cancel);
    setPopupText('This action will redirects to manage plans page');
    setIsOpenPopup(true);
  };

  const resetForm = async (): Promise<void> => {
    await sleep(timeout);
    reset();
    setViewName(MainViews.managePlans);
  };

  const sendForm = async () => {
    if (!formData || !employer) {
      return;
    }
    try {
      if (!planYear) {
        await createPlanYear(formData, employer.id);
        showSnackbar('Successfully created.', SnackbarType.success);
        await resetForm();
      } else {
        await updatePlanYear(formData, employer.id, planYear.id);
        showSnackbar('Successfully updated.', SnackbarType.success);
        await resetForm();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  const handleConfirmPopup = () => {
    setIsOpenPopup(false);
    if (actionButton === 'submit') {
      sendForm();
    }
    if (actionButton === 'cancel') {
      setViewName(MainViews.managePlans);
    }
  };

  const handleClosePopup = () => setIsOpenPopup(false);

  const startDateValue = watch('startDate');

  return (
    <Box sx={{ ...gridBoxWrapper, display: 'flex', flexDirection: 'column' }}>
      <EmployerTabTitle />
      <Box
        component={'form'}
        noValidate
        onSubmit={handleSubmit(handleOnSubmitForm)}
        sx={formBoxWrapper}
      >
        <Box
          sx={{
            ...boxStylesAlternative,
            '&::before': { ...boxStyles['&::before'], content: `"Plan Year Information"` },
          }}
        >
          <Grid container spacing={5}>
            <FormInput control={control} name="name" required />
            <FormInput control={control} name="contributions" required type="number" />
            <Grid item xs={6}>
              <DatePickerInput
                label="Start Date"
                name="startDate"
                control={control}
                onChange={(date: Dayjs) => {
                  if (
                    watch('endDate')! < getLatestDate(getISODateFormat(date), getCurrentDate())!
                  ) {
                    setValue('endDate', getLatestDate(getISODateFormat(date), getCurrentDate()));
                  }
                  setValue('startDate', getLatestDate(getISODateFormat(date), getCurrentDate()), {
                    shouldValidate: true,
                  });
                }}
                minDate={getCurrentDate()}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePickerInput
                label="End Date"
                name="endDate"
                control={control}
                onChange={(date: Dayjs) => {
                  setValue(
                    'endDate',
                    getLatestDate(getISODateFormat(date), startDateValue || getCurrentDate()),
                    {
                      shouldValidate: true,
                    },
                  );
                }}
                minDate={startDateValue || getCurrentDate()}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectInput
                control={control}
                name="type"
                labelId="plan-type"
                label="Plan Type"
                disabled={Boolean(planYear)}
              >
                <MenuItem value={PlanType.dental}>Dental</MenuItem>
                <MenuItem value={PlanType.medical}>Medical</MenuItem>
              </SelectInput>
            </Grid>
            <Grid item xs={6}>
              <SelectInput
                control={control}
                name="payrollFrequency"
                labelId="plan-payroll-frequency"
                label="Payroll Frequency"
              >
                <MenuItem value={PayrollFrequency.weekly}>Weekly</MenuItem>
                <MenuItem value={PayrollFrequency.monthly}>Monthly</MenuItem>
              </SelectInput>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'right', mt: 5 }}>
          <MuiButton onClick={handleOnCancelForm} data-testid={'cancel-form'}>
            Cancel
          </MuiButton>
          <MuiButton
            disabled={Boolean(open)}
            type="submit"
            sx={{ ml: 2 }}
            data-testid={'submit-form'}
          >
            Submit
          </MuiButton>
        </Box>
      </Box>
      <PopupAlert
        isOpen={isOpenPopup}
        message={popupText}
        handleClose={handleClosePopup}
        handleConfirm={handleConfirmPopup}
      />
    </Box>
  );
};

export default ManagePlanYear;
