import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Switch,
  Paper,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Add as AddIcon } from '@mui/icons-material';
import type { Product, Category } from '../../types';
import { getProduct, createProduct, updateProduct, getCategories, createCategory } from '../../services/api';

interface ProductFormProps {
  isEdit?: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string(),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .typeError('Price must be a number'),
  stock_quantity: Yup.number()
    .required('Stock quantity is required')
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .typeError('Stock must be a number'),
  category_id: Yup.number().required('Category is required'),
  status: Yup.string().required('Status is required'),
});

const ProductForm: React.FC<ProductFormProps> = ({ isEdit = false }) => {
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const navigate = useNavigate();

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      setIsCreatingCategory(true);
      const newCategory = await createCategory({ name: newCategoryName.trim() });
      setCategories([...categories, newCategory]);
      formik.setFieldValue('category_id', newCategory.id.toString());
      setNewCategoryName('');
      setIsCategoryDialogOpen(false);
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const formik = useFormik<Partial<Product>>({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
      category_id: 0,
      status: 'active',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEdit && id) {
          await updateProduct(parseInt(id), values);
        } else {
          await createProduct(values as Omit<Product, 'id'>);
        }
        navigate('/products');
      } catch (error) {
        console.error('Error saving product:', error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData] = await Promise.all([
          getCategories(),
          isEdit && id ? getProduct(parseInt(id)) : Promise.resolve(null),
        ]);

        setCategories(categoriesData);

        if (isEdit && id) {
          const product = await getProduct(parseInt(id));
          formik.setValues({
            ...product,
            category_id: product.category_id,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h5" component="h1">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box display="grid" gap={3}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Product Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formik.values.description || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              inputProps={{ step: '0.01', min: '0' }}
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />

            <TextField
              fullWidth
              id="stock_quantity"
              name="stock_quantity"
              label="Stock Quantity"
              type="number"
              inputProps={{ min: '0' }}
              value={formik.values.stock_quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.stock_quantity && Boolean(formik.errors.stock_quantity)}
              helperText={formik.touched.stock_quantity && formik.errors.stock_quantity}
            />
          </Box>

          <Box display="grid" gridTemplateColumns="1fr auto" gap={2} alignItems="flex-end">
            <FormControl fullWidth error={formik.touched.category_id && Boolean(formik.errors.category_id)}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category_id"
                name="category_id"
                value={formik.values.category_id || ''}
                label="Category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category_id && formik.errors.category_id && (
                <FormHelperText>{formik.errors.category_id}</FormHelperText>
              )}
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setIsCategoryDialogOpen(true)}
            >
              New
            </Button>
          </Box>

          <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={formik.values.status || ''}
              label="Status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="out_of_stock">Out of Stock</MenuItem>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <FormHelperText>{formik.errors.status}</FormHelperText>
            )}
          </FormControl>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/products')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} />
              ) : isEdit ? (
                'Update Product'
              ) : (
                'Create Product'
              )}
            </Button>
          </Box>
        </Box>
      </form>
      {/* Add Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onClose={() => setIsCategoryDialogOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateCategory()}
            disabled={isCreatingCategory}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCategoryDialogOpen(false)} disabled={isCreatingCategory}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateCategory} 
            color="primary" 
            variant="contained"
            disabled={!newCategoryName.trim() || isCreatingCategory}
          >
            {isCreatingCategory ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductForm;