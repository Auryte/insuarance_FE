import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Components
import SelectInputDropdown from './SelectInputDropdown/SelectInputDropdown';
import ClaimsInput from './ClaimsInput/ClaimsInput';
import ClaimsTable from './ClaimsTable/ClaimsTable';
import ConsumerClaim from '@/components/admin/ClaimsTab/Claim/Claim';

// Api
import { getClaims } from '@/pages/api/claimsApi';

// Styles
import { Paper, Grid, Box, Button } from '@mui/material';
import { gridBoxWrapper, boxStyles } from '@/styles/styled';

// Utils
import { formDataChecked } from './ClaimsTab.utils';

// Types
import { Claim } from '@/types/adminTypes';

export interface SearchFormInput {
  claimNumber: string;
  employer: string;
  selectStatus: string;
}

const defaultValues = {
  claimNumber: '',
  employer: '',
  selectStatus: '',
};

const ClaimsTab: FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [formResult, setFormResult] = useState<SearchFormInput>(defaultValues);
  const [claimsCount, setClaimsCount] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const { handleSubmit, reset, control, setError, formState } = useForm<SearchFormInput>({
    defaultValues: defaultValues,
  });

  const { handleErrors } = useErrorHandler();

  const getData = async (
    formData: SearchFormInput | undefined,
    currentPage: number,
    rows: number,
  ) => {
    try {
      setLoading(true);
      const { data, metadata } =
        (await getClaims({
          ...formData,
          page: currentPage,
          rowsPerPage: rows,
        })) || {};
      if (data && metadata && metadata[0]) {
        setClaims(data);
        setClaimsCount(metadata[0].numberOfDocuments);
      } else {
        setClaims([]);
        setClaimsCount(0);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  useEffect(() => {
    getData(formResult, page + 1, rowsPerPage);
  }, [selectedClaim]);

  const handleOnSubmit = async (formData: SearchFormInput): Promise<void> => {
    try {
      getData(formDataChecked(formData), 1, rowsPerPage);
      setFormResult(formDataChecked(formData));
      setPage(0);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  const handleRowsPerPageChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = parseInt(event.target.value, 10);
    const valueUpdated = value === -1 ? claimsCount : value;
    getData(formResult, 1, valueUpdated);
    setRowsPerPage(value);
    setPage(0);
  };

  const handlePageChange = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    pageNumber: number,
  ) => {
    getData(formResult, pageNumber + 1, rowsPerPage);
    setPage(pageNumber);
  };

  const handleClaimsClick = (claim: Claim) => {
    setSelectedClaim(claim);
  };

  return (
    <Paper sx={{ width: '100%', height: 'fit-content' }}>
      {!selectedClaim ? (
        <Box sx={gridBoxWrapper}>
          <Box component="form" noValidate onSubmit={handleSubmit(handleOnSubmit)} sx={boxStyles}>
            <Grid container item xs={12} md={12} justifyContent="space-around">
              <ClaimsInput control={control} name="claimNumber" type="text" />
              <ClaimsInput control={control} name="employer" type="text" />
              <SelectInputDropdown name="selectStatus" control={control} />
              <Button variant="contained" type="submit" size="medium" sx={{ m: 2 }}>
                Search
              </Button>
            </Grid>
          </Box>
          <ClaimsTable
            claims={claims}
            claimsCount={claimsCount}
            loading={loading}
            onClick={handleClaimsClick}
            onRowsChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            page={page}
          />
        </Box>
      ) : (
        <ConsumerClaim {...selectedClaim} changeViewToClaims={claim => setSelectedClaim(claim)} />
      )}
    </Paper>
  );
};

export default ClaimsTab;
