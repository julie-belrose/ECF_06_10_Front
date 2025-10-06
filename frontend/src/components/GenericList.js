import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

const GenericList = ({
  title,
  data,
  columns,
  searchableFields,
  onDelete,
  addRoute,
  editRoute,
  fetchData,
  deleteService,
  searchPlaceholder,
  isLoading = false,
  requireLogin = true,
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState(data || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(isLoading);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!requireLogin);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Check login status
  useEffect(() => {
    if (requireLogin) {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setShowSnackbar(true);
      }
    }
  }, [navigate, requireLogin]);

  // Fetch data if logged in and fetchData function is provided
  useEffect(() => {
    if (isLoggedIn && fetchData) {
      const loadData = async () => {
        setLoading(true);
        try {
          const result = await fetchData();
          setItems(result);
        } catch (error) {
          console.error(`Error fetching ${title.toLowerCase()}:`, error);
        }
        setLoading(false);
      };
      loadData();
    } else if (!requireLogin && data) {
      setItems(data);
    }
  }, [isLoggedIn, fetchData, title, data, requireLogin]);

  // Update items when data prop changes
  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    setDeletingItemId(id);
    try {
      if (deleteService) {
        await deleteService(id);
      }

      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);

      if (onDelete) {
        onDelete(id, updatedItems);
      }
    } catch (error) {
      console.error(`Error deleting ${title.toLowerCase().slice(0, -1)}:`, error);
    }
    setDeletingItemId(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredItems = items.filter(item => {
    if (!searchableFields || searchableFields.length === 0) {
      return true;
    }

    return searchableFields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    navigate('/login', { replace: true });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const renderCellContent = (item, column) => {
    if (column.render) {
      return column.render(item);
    }
    return item[column.field];
  };

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Snackbar
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 9 }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          You must be logged in to access the {title.toLowerCase()}.{' '}
          <span
            onClick={handleLoginRedirect}
            style={{
              color: '#3f51b5',
              textDecoration: 'underline',
              cursor: 'pointer',
              transition: 'color 0.1s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#f57c00')}
            onMouseLeave={(e) => (e.target.style.color = '#3f51b5')}
          >
            Login
          </span>
        </Alert>
      </Snackbar>

      <h2>{title}</h2>

      {addRoute && (
        <Button
          variant="contained"
          component={Link}
          to={addRoute}
          sx={{ marginBottom: '1rem' }}
        >
          Add {title.slice(0, -1)}
        </Button>
      )}

      <TextField
        label={searchPlaceholder || `Search for a ${title.toLowerCase().slice(0, -1)}`}
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '1rem', width: '100%' }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field || column.label}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.field || column.label}>
                      {renderCellContent(item, column)}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editRoute && (
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={editRoute.replace(':id', item.id)}
                        sx={{ marginRight: '0.5rem', marginBottom: '0.25rem' }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(item.id)}
                      sx={{ marginBottom: '0.25rem' }}
                      disabled={deletingItemId === item.id}
                      startIcon={deletingItemId === item.id ? <CircularProgress size={20} /> : null}
                    >
                      {deletingItemId === item.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default GenericList;