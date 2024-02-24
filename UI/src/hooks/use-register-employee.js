import { useQuery } from '@tanstack/react-query';
import {
  getRegisteredEmployees,
  registerEmployee
} from '../api/use-employee-api';

const useRegisterEmployees = (employeeInfo) => {
  // const [mutate, { isLoading, isError, error }] = useMutation(updateUser);

  return useMutation({
    queryKey: ['employeeInfo'],
    queryFn: async () => registerEmployee(employeeInfo),
    enabled: true
  });
};

export default useGetEmployees;
