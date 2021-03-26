import React from "react";
import Container from "@material-ui/core/Container";
import { createMuiTheme, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ThemeProvider } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: theme.spacing(3),
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: theme.spacing(3),
    padding: "0 30px",
  },
}));

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: orange[500],
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minHeight: 50,
      },
    },
  },

  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Content />
  </ThemeProvider>
);

const Content = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={8}>
          <Typography>Logo</Typography>
        </Grid>
        <Grid item xs={4} container spacing={2}>
          <Grid item>
            <Typography>Nav Items</Typography>
          </Grid>
          <Grid item>
            <Typography>Nav Items</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" className={classes.root}>
        Primary
      </Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
    </Container>
  );
};

export default App;
