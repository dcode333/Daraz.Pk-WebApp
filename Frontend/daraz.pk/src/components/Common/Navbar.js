import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MoreIcon from "@mui/icons-material/MoreVert";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../Redux_Store/Slices/userSlice";
import { clearAuthToken } from "../../Redux_Store/Slices/authTokenSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const user = useSelector((state) => state.authToken.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            dispatch(clearUser());
            dispatch(clearAuthToken());
          }}
        >
          Sign Out
        </MenuItem>
      ) : (
        <Box>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/login");
            }}
          >
            Sign In
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/register");
            }}
          >
            Sign up
          </MenuItem>
        </Box>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/cart")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ShoppingCartCheckoutIcon />
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box position="sticky" sx={{ flexGrow: 1, zIndex: 1, marginBottom: 10 }}>
      <AppBar sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <Box
            onClick={() => navigate("/")}
            component="img"
            sx={{
              height: 35,
              width: 150,
              marginLeft: 5,
            }}
            alt="daraz.pk"
            src="https://icms-image.slatic.net/images/ims-web/3ae67ef5-e5f6-42c3-9a40-993ef9a7bfae.png"
          />
          <Search
            style={{
              width: "70%",
              marginLeft: "5%",
              backgroundColor: "#F7F7F7",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "gray" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              sx={{ color: "gray" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              sx={{ color: "black", marginRight: 15 }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartCheckoutIcon />
            </IconButton>
            <a href="https://www.daraz.pk/mobile-apps?spm=a2a0e.pdp.header.dewallet.11edBAnFBAnFWb">
              <Box
                component="img"
                sx={{
                  height: 45,
                  width: 188,
                  marginLeft: 5,
                }}
                alt="daraz.pk"
                src="https://icms-image.slatic.net/images/ims-web/7a379e2e-4b65-4617-9188-94e0c768cd9d.png"
              />
            </a>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: "black" }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{ color: "black" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
