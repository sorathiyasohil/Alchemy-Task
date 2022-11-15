import { ArrowBackIosNewRounded } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Creators as ProductDuck } from "../../store/products";
import './ProductForm.css'
import Header from "../../Components/Header/Header";


const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  titleTypo: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
}));

export default function ProductForm(props) {
  const categories = [...Array(10)].map((_, i) => ({
    name: "Category" + (i + 1),
  }));
  const location = useLocation();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    id: null,
    name: "",
    category: "",
    desc: "",
    expiryDate: "",
    price: "",
    discount: 0,
    sellPrice: "",
  });

  useEffect(() => {
    if (location.state && location.state.id) {
      setState(location.state);
    }
  }, [location.state]);

  const handleAddItem = (data) => {
    if (data.id) {
      dispatch(
        ProductDuck.updateProduct({
          ...data,
          sellPrice: data.price - data.price * (data.discount / 100),
        })
        );
      } else {
      dispatch(
        ProductDuck.addProduct({
          ...data,
          id: new Date().getTime(),
          sellPrice: data.price - data.price * (data.discount / 100),
        })
        );
      }
    navigate("/")
  };

  return (
    <>
      <Header/>
      <Container className="product-list-table">
      <Card elevation={3}>
      <CardContent>
      <Grid container>
        <Grid xs={12} className={classes.title}>
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIosNewRounded />
          </IconButton>
          <Typography variant="h5" className={classes.titleTypo}>
            {state.id ? "Update" : "Add"} Product
          </Typography>
        </Grid>
        <Divider />
      </Grid>
      <Formik
        initialValues={state}
        validationSchema={validationSchema}
        onSubmit={(values) => handleAddItem(values)}
        enableReinitialize
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
        }) => (
          <Grid container spacing={3} xs={12} className={classes.container}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.name}
                helperText={errors.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                value={values.name}
                label="Product name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  error={!!errors.category}
                  helperText={errors.category}
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  value={values.category}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                error={!!errors.desc}
                helperText={errors.desc}
                name="desc"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.desc}
                label="Desccription"
                multiline
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
                name="expiryDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.expiryDate}
                type={"date"}
                label="Expiry date"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type={"number"}
                label="Cost price"
                error={!!errors.price}
                helperText={errors.price}
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type={"number"}
                name="discount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.discount}
                label="Discount(%)"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                name="sellPrice"
                value={values.price - values.price * (values.discount / 100)}
                onBlur={handleBlur}
                type={"number"}
                label="Sell price"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <Container
                className={classes.title}
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Button
                  disabled={!isValid}
                  onClick={handleSubmit}
                  variant="contained"
                  type="submit"
                >
                  {state.id ? "Update" : "Add"}
                </Button>
              </Container>
            </Grid>
          </Grid>
        )}
      </Formik>
      </CardContent>
    </Card>
    </Container>
   
    </>
  );
}

const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Please select category"),
    desc: Yup.string().required("Desccription is required"),
    expiryDate: Yup.string().required("Expiry date is required"),
    price: Yup.string().required("Price is required"),
    discount: Yup.string(),
  });
