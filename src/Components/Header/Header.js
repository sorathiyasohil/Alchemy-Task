import { AppBar, Button, Container, Toolbar } from "@mui/material";
import React from "react";
import logo from "../../assets/logo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const lightTheme = createTheme({
  palette: {
    secondary: {
      main: "#fff",
    },
  },
});

export default function Header() {
  const navigate = useNavigate();
console.log(window.location.pathname,"j")
  return (
    <ThemeProvider theme={lightTheme}>
      <AppBar position="static" color="secondary">
        <Container maxWidth="xl">
          <div className="appBar-container">
            <Toolbar disableGutters>
              <img src={logo} alt="logo" className="nav-logo" />
            </Toolbar>
            <div>
              {window.location.pathname === "/add-product" ? (
                <Button
                  variant="contained"
                  className="product-btn"
                  onClick={() => navigate("/")}
                >
                   Product List
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="product-btn"
                  onClick={() => navigate("/add-product")}
                >
                  Add Product
                </Button>
              )}
            </div>
          </div>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
