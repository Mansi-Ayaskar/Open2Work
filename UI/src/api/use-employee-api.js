import axiosClient from './api-service';

const getRegisteredEmployees = () => {
  return axiosClient.get(
    // 'getAllRegisteredEmployees?key_skills=java&location=Ahmedabad'
    'getAllRegisteredEmployees'
  );
};

export { getRegisteredEmployees };
