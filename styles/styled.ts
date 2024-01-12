import styled from '@emotion/styled';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Alert, TableRow } from '@mui/material';

import { theme } from './theme';

export const mainAdminPortalWrapper = {
  width: { md: '80%', lg: '65%' },
  margin: '20px auto',
  height: 'fit-content',
};
export const StyledAlert = styled(Alert)(() => ({
  backgroundColor: '#FDEDED',
  '& .MuiAlert-icon': {
    color: 'red',
  },
}));

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 48,
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: `${theme.palette.divider}`,
  },
}));

export const StyledTableRowAlternative = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 248,
    },
  },
};

export const formBoxWrapper = {
  mt: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const formControlWrapper = {
  width: '20%',
  textAlign: 'left',
  m: 2,
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '25%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '25%',
  },
};

export const inputWrapper = {
  width: '20%',
  m: 2,
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '20%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '20%',
  },
};

export const tabBaseStyles = {
  minWidth: '50%',
  pr: '35%',
};

export const gridBoxWrapper = {
  width: '100%',
  minHeight: '85vh',
  height: 'fit-content',
  textAlign: 'left',
  p: 3,
};

export const gridWrapper = {
  alignItems: 'baseline',
  justifyContent: 'space-between',
  paddingBottom: '32x',
  width: '100%',
};

export const headingWrapper = {
  padding: '32px 0 ',
  fontWeight: '700',
};

export const tableRowHeading = {
  textAlign: 'left',
  p: 2,
  backgroundColor: theme.palette.action.hover,
};

export const boxStyles = {
  bgcolor: theme.palette.background.paper,
  mt: 6,
  position: 'relative',
  border: `thin solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: {
    xs: 'fit-content',
    sm: 'fit-content',
    md: '152px',
    lg: '104px',
    xl: '104px',
  },
  borderRadius: '6px',
  '&::before': {
    content: `"Search Criteria"`,
    position: 'absolute',
    top: '-16px',
    left: '16px',
    backgroundColor: '#fff',
    padding: '0 8px',
  },
};

export const boxStylesAlternative = {
  ...boxStyles,
  mt: 5,
  px: 3,
  py: 6,
  justifyContent: 'right',
  alignItems: 'flex-end',
  flexDirection: 'column',
  height: {},
  '&::before': { ...boxStyles['&::before'], content: `"User Information"` },
};

export const selectTableCell = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: `${theme.palette.divider}`,
  },
  width: '25%',
};

export const employerPortalLayoutWrapper = {
  width: { md: '80%', lg: '65%' },
  margin: '20px auto',
  minHeight: '696px',
  height: 'fit-content',
  padding: '16px',
};

export const navigationWrapper = {
  width: '100%',
  minHeight: '160px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
};

export const navigationButtonsWrapper = {
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  flexDirection: {
    xs: 'column',
    sm: 'row',
  },
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const imageWrapper = {
  p: 2,
  display: 'flex',
  alignSelf: 'left',
  width: '100%',
  mx: 1,
  '> img': {
    height: {
      sx: 200,
      md: 80,
    },
    width: 'auto',
    objectFit: 'contain',
  },
};

export const enrollmentsBoxStyles = {
  bgcolor: theme.palette.background.paper,
  mt: 6,
  position: 'relative',
  border: `thin solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'end',
  width: '100%',
  minHeight: '400px',
  height: {
    xs: 'fit-content',
    sm: 'fit-content',
    md: 'fit-content',
    lg: 'fit-content',
    xl: 'fit-content',
  },
  borderRadius: '6px',
  '&::before': {
    content: `"Enrollments"`,
    position: 'absolute',
    top: '-16px',
    left: '16px',
    backgroundColor: '#fff',
    padding: '0 8px',
  },
};
export const modalFormWrapper = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '300px',
};

export const manageRulesWrapper = {
  ...gridBoxWrapper,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const manageRuleGroup = (label: string) => ({
  ...boxStyles,
  padding: '1rem',
  height: {},
  '&::before': { ...boxStyles['&::before'], content: `"${label}"` },
});
