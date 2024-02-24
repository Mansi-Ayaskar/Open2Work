import { useQuery } from '@tanstack/react-query';
import { getRegisteredEmployees } from '../api/use-employee-api';

const useGetEmployees = () => {
  return useQuery({
    queryKey: 'employees',
    queryFn: getRegisteredEmployees(),
    enabled: false
  });
};

export default useGetEmployees;
