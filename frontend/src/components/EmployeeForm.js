import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployeeById, updateEmployee } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    department: ''
  });
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const departmentData = await getAllDepartments();
        setDepartments(departmentData);

        if (id) {
          const employeeData = await getEmployeeById(id);
          setEmployee({
            firstName: employeeData.firstName || '',
            lastName: employeeData.lastName || '',
            email: employeeData.email || '',
            age: employeeData.age ? employeeData.age.toString() : '',
            department: employeeData.department || ''
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const employeeData = {
        ...employee,
        age: parseInt(employee.age) || 0
      };

      if (id) {
        await updateEmployee(id, employeeData);
      } else {
        await addEmployee(employeeData);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If loading, show centered spinner
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>

      <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' } }}>
        <TextField
          label="First Name *"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Last Name *"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Email *"
          name="email"
          type="email"
          value={employee.email}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Age *"
          name="age"
          type="number"
          value={employee.age}
          onChange={handleChange}
          required
          fullWidth
        />

        <FormControl fullWidth required sx={{ marginBottom: '1rem' }}>
          <InputLabel>Department *</InputLabel>
          <Select
            name="department"
            value={employee.department}
            onChange={handleChange}
            label="Department *"
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.name}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: '1rem',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
          disabled={isLoading}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
