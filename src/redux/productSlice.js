import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    // const token = getState().product.token;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aXpAbWFpbC5jb20iLCJleHAiOjE3MzY1Nzc2Nzl9.j6QpcpJSJyQPyMcjpm56QOlH83hj_ex1D6YY8vz_aRE";

    try {
      const response = await fetch("http://localhost:8080/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            {
              getProducts {
                id
                name
                price
                stock
              }
            }
          `,
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data.getProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/deleteProductAsync",
  async (id, { rejectWithValue }) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aXpAbWFpbC5jb20iLCJleHAiOjE3MzY1Nzc2Nzl9.j6QpcpJSJyQPyMcjpm56QOlH83hj_ex1D6YY8vz_aRE";

    try {
      const response = await fetch("http://localhost:8080/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation DeleteProduct($id: ID!) {
              deleteProduct(id: $id)
            }
          `,
          variables: { id },
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProductAsync",
  async ({ id, name, price, stock }, { getState, rejectWithValue }) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aXpAbWFpbC5jb20iLCJleHAiOjE3MzY1ODc0MTR9.2ebxCSn9cuMiNUBplrNYr6XPJXG1C9KNFsZepPoH9J0";

    console.log(id, name, price, stock);
    try {
      const response = await fetch("http://localhost:8080/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation UpdateProduct($id: ID!, $name: String, $price: Float, $stock: Int) {
              updateProduct(id: $id, name: $name, price: $price, stock: $stock) {
                id
                name
                price
                stock
              }
            }
          `,
          variables: { id, name, price, stock },
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data.updateProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProductAsync",
  async ({ name, price, stock }, { getState, rejectWithValue }) => {
    // const token = getState().product.token;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aXpAbWFpbC5jb20iLCJleHAiOjE3MzY1Nzc2Nzl9.j6QpcpJSJyQPyMcjpm56QOlH83hj_ex1D6YY8vz_aRE";

    try {
      const response = await fetch("http://localhost:8080/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation AddProduct($name: String!, $price: Float!, $stock: Int!) {
              addProduct(name: $name, price: $price, stock: $stock) {
                id
                name
                price
                stock
              }
            }
          `,
          variables: { name, price, stock },
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data.addProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch product
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deleteProductAsync
    builder
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add product
    builder
      .addCase(addProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update product
    builder
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;