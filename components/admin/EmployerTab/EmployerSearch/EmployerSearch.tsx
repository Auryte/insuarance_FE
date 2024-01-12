import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { AxiosError } from 'axios';

// Contexts
import ViewsContext from '@/contexts/AdminViewsContext';
import EmployerContext from '@/contexts/EmployerContext';

// Styles
import { gridBoxWrapper } from '@/styles/styled';

// Types
import { MainViews } from '@/types/adminTypes';
import { Employer, EmployerSearchQuery } from '@/types/employer';

// Components
import EmployerSearchForm from './EmployerSearchForm/EmployerSearchForm';
import EmployerListTable from './EmployerListTable/EmployerListTable';
import ListPagination from '@/components/shared/ListPagination/ListPagination';

// Api
import { apiEndPoints } from '@/constants/constants';
import { localClient } from '@/utils/axiosInstance';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

const EmployerSearch: FC = () => {
  const { setViewName } = useContext(ViewsContext);
  const { saveEmployer } = useContext(EmployerContext);

  const { handleErrors } = useErrorHandler();

  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<EmployerSearchQuery>({ name: '', code: '' });
  const [employersCount, setEmployersCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);

  const handleAddNewEmployerClick = () => {
    setViewName(MainViews.addUpdateEmployer);
    saveEmployer(undefined);
  };

  const getEmployers = async () =>
    await localClient.get(`${apiEndPoints.getEmployers}?page=${page}&limit=${limit}`, {
      params: searchParams,
    });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getEmployers();
      const result = response.data.data;
      if (result.length > 0) {
        const countEmployers = response.data.metadata[0].numberOfDocuments;
        setEmployersCount(countEmployers);
      }
      setEmployers(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        handleErrors(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams, page, limit]);

  const checkSearchParamas = (name: string, code: string): void => {
    setSearchParams({ name, code });
    setPage(1);
  };

  const handleChangePage = (newPage: number): void => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const employerClickHandler = (employer: Employer) => {
    setViewName(MainViews.administration);
    saveEmployer(employer);
  };

  return (
    <Box sx={gridBoxWrapper}>
      <Box sx={{ position: 'relative', pr: 3, pb: 2 }}>
        <Button
          sx={{ position: 'absolute', right: 0 }}
          variant="contained"
          size="medium"
          onClick={handleAddNewEmployerClick}
        >
          Add New Employer
        </Button>
      </Box>
      <EmployerSearchForm checkSearchParamas={checkSearchParamas} />
      <EmployerListTable
        loading={loading}
        employers={employers}
        employerClickHandler={employerClickHandler}
      />
      <ListPagination
        count={employersCount}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        limit={limit}
      />
    </Box>
  );
};

export default EmployerSearch;
