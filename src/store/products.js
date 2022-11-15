import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  getProducts: [],
  addProduct: ["item"],
  updateProduct: ["item"],
  deleteProduct: ["id"],
  deleteProducts: ["ids"],
  loading: [],
});

const initialState = {
  productsList: [],
  loading: false,
};

const getProducts = (state = initialState, action) => {
  return {
    ...state,
  };
};

const addProduct = (state = initialState, action) => {
  console.log("addProduct")
  return {
    ...state,
    productsList: state.productsList.concat(action.item),
  };
};
const deleteProduct = (state = initialState, action) => {
  return {
    ...state,
    productsList: state.productsList.filter((a) => a.id !== action.id),
  };
};
const deleteProducts = (state = initialState, action) => {
  return {
    ...state,
    productsList: state.productsList.filter((a) => !action.ids.includes(a.id)),
  };
};
const updateProduct = (state = initialState, action) => {
  const index = state.productsList.findIndex((a) => a.id === action.item.id);
  if (index >= 0) {
    return {
      ...state,
      productsList: Object.assign([...state.productsList], { [index]: action.item }),
    };
  }
  return {
    ...state,
    productsList: state.productsList.concat(action.item),
  };
};

export default createReducer(initialState, {
  [Types.GET_PRODUCTS]: getProducts,
  [Types.ADD_PRODUCT]: addProduct,
  [Types.UPDATE_PRODUCT]: updateProduct,
  [Types.DELETE_PRODUCT]: deleteProduct,
  [Types.DELETE_PRODUCTS]: deleteProducts,
});
