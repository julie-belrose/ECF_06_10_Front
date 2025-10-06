import React from 'react';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';
import GenericList from './GenericList';

const EmployeeList = () => {
  const columns = [
    { field: 'firstName', label: 'First Name' },
    { field: 'lastName', label: 'Last Name' },
    { field: 'email', label: 'Email' },
  ];

  const searchableFields = ['firstName', 'lastName', 'email'];

  return (
    <GenericList
      title="Employees"
      columns={columns}
      searchableFields={searchableFields}
      fetchData={getAllEmployees}
      deleteService={deleteEmployee}
      addRoute="/add-employee"
      editRoute="/edit-employee/:id"
      searchPlaceholder="Search employees by name or email"
      requireLogin={true}
    />
  );
};

export default EmployeeList;