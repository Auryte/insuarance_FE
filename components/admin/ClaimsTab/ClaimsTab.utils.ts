import { SelectFilters } from '@/types/adminTypes';
import { SearchFormInput } from './ClaimsTab';

export const formDataChecked = (formData: SearchFormInput) =>
  formData.selectStatus === SelectFilters.allClaims
    ? { ...formData, selectStatus: '' }
    : { ...formData };
