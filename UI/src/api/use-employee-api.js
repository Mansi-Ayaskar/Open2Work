import axiosClient from './api-service';

export const getRegisteredEmployees = async () => {
  const res = await axiosClient.get(
    // 'getAllRegisteredEmployees?key_skills=java&location=Ahmedabad'
    'getAllRegisteredEmployees'
  );
  return await res.data;
};

export const registerEmployee = async (employeeInfo) => {
  const res = await axiosClient.post('registerEmployee', employeeInfo);
  return await res.data;
};
