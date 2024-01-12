import React, { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

// Components
import EnrollmentsDialogForm from '../EnrollmentsDialogForm/EnrollmentsDialogForm';
import MuiButton from '@/components/shared/MuiButton/MuiButton';

// Contexts
import { AuthContext } from '@/contexts/AuthContext';

// Api
import { getPlanYears } from '@/pages/api/planApi';
import { getConsumer } from '@/pages/api/userApi';
import { getEnrollments } from '@/pages/api/enrollmentApi';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Styles
import {
  navigationButtonsWrapper,
  selectTableCell,
  StyledTableCell,
  StyledTableRowAlternative,
} from '@/styles/styled';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from '@mui/material';

// Types
import { Enrollment } from '@/types/enrollment';
import { PlanYear } from '@/types/insurance';

// Utils
import { filterNotUsedPlans, getName } from './EnrollmentsTable.utils';
import { isEnroll } from '../EnrollmentsDialogForm/EnrollmentsDialogForm.utils';

const EnrollmentsTable: FC = () => {
  const router = useRouter();
  const { consumerId } = router.query;
  const { getUser } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrollment, setEnrollment] = useState<Enrollment>();
  const [plans, setPlans] = useState<PlanYear[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const { handleErrors } = useErrorHandler();

  const getData = async () => {
    try {
      setIsLoading(true);
      const result = await getEnrollments(consumerId);
      setEnrollments(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        handleErrors(error);
      }
    }
  };

  const getConsumerName = async () => {
    try {
      const user = await getConsumer(consumerId);
      setName(getName(user));
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error);
      }
    }
  };

  useEffect(() => {
    if (consumerId) {
      getData();
      getConsumerName();
    }
  }, [consumerId, isReloading]);

  const handleAddButtonClick = async () => {
    try {
      setEnrollment(undefined);
      setIsOpen(true);
      const user = getUser();
      if (user) {
        const result = await getPlanYears(user.employerID);
        setPlans(filterNotUsedPlans(result, enrollments));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error);
      }
    }
  };

  const handleUpdateClick = (enroll: Enrollment) => {
    setEnrollment(enroll);
    setIsOpen(true);
  };

  const handleCancelModal = () => {
    setIsOpen(false);
    setPlans([]);
  };

  const handleChange = (value: Enrollment | PlanYear) => {
    setEnrollment({
      id: isEnroll(value) ? value.id : null,
      consumerID: consumerId,
      planID: isEnroll(value) ? value.planID : value.id,
      election: isEnroll(value) ? value.election : null,
      plan: isEnroll(value) ? value.plan : value,
    });
  };

  const onSubmitClose = () => {
    setIsReloading(prevValue => !prevValue);
    setIsOpen(false);
    setPlans([]);
  };

  const enrollmentsNotFoundRow = (
    <StyledTableRowAlternative>
      <StyledTableCell colSpan={7} sx={{ cursor: 'auto' }}>
        No enrollments found
      </StyledTableCell>
    </StyledTableRowAlternative>
  );

  return (
    <>
      <TableContainer sx={{ mt: 5, mx: 1, width: 'calc(100% - 16px)', textAlign: 'left' }}>
        <Box sx={navigationButtonsWrapper}>
          <Typography>
            <Box component="span" fontWeight="bold">
              {name}{' '}
            </Box>
            Enrollments
          </Typography>
          <MuiButton onClick={handleAddButtonClick} sx={{ width: 'fit-content', mb: 4 }}>
            Add New Enrollment
          </MuiButton>
        </Box>
        <Table size="small" data-testid="table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Plan</StyledTableCell>
              <StyledTableCell>Election</StyledTableCell>
              <StyledTableCell>Contribution</StyledTableCell>
              <StyledTableCell>Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments.length === 0 && !isLoading && enrollmentsNotFoundRow}
            {!isLoading &&
              enrollments.map(enroll => (
                <StyledTableRowAlternative key={enroll.id}>
                  <StyledTableCell style={{ width: 480 }} sx={{ cursor: 'auto' }}>
                    {enroll.plan.name}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 200 }} align="left" sx={{ cursor: 'auto' }}>
                    {enroll.election}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 200 }} align="left" sx={{ cursor: 'auto' }}>
                    {enroll.plan.contributions}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => handleUpdateClick(enroll)}
                    sx={selectTableCell}
                    align="left"
                  >
                    Update
                  </StyledTableCell>
                </StyledTableRowAlternative>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EnrollmentsDialogForm
        enrollments={enrollments}
        enrollment={enrollment}
        handleCancelModal={handleCancelModal}
        handleChange={handleChange}
        open={isOpen}
        plans={plans}
        onClose={onSubmitClose}
      />
    </>
  );
};

export default EnrollmentsTable;
