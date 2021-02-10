import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
//import { LogInUser } from "../../reducers/actions/RoleActions";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { colors } from "@material-ui/core";
//import { useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

//const BackgroundColor = colors.grey[50];

//TODO: Get The Logo
function Image() {
  return <AssignmentIcon fontSize="" />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    transform: "scale(1.6)",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    marginTop: theme.spacing(12),
    paddingTop: "0rem",
    backgroundColor: colors.lightBlue[50],
    padding: "1rem",
    boxShadow: "0px 0rem 1rem 2rem rgba(225,245,254, 1)",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const [AlertOpen, openAlert] = useState(false);

  //  const dispatch = useDispatch();

  document.body.style =
    "background: linear-gradient(to right, #f64f29, #FEA880, #a0e5bc, #59F3E5, #01e2e9);";

  return (
    <div className={classes.page}>
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Collapse in={AlertOpen}>
            <Box
              borderRadius={50}
              p={2}
              bgcolor={email ? "success.main" : "error.main"}
              color={email ? "success.contrastText" : "error.contrastText"}
            >
              {email && (
                <span>
                  Password Recovery has been sent to the email &apos;{email}
                  &apos;
                </span>
              )}
              {!email && <span>Please provide an email</span>}
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  openAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Collapse>

          <Collapse in={!AlertOpen}>
            <Avatar className={classes.avatar}>
              <Image />
            </Avatar>
          </Collapse>
          <Typography component="div" variant="h2">
            Issue Register
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
                openAlert(false);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={
                () => {}
                /* HasAgreedToTerms() ? LogInUser(email, dispatch) : SetAgreement(false);
                }*/
              }
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                {/*TODO: Forgotten Password
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      openAlert(true);
                    }}
                  >
                    Forgot password?
                </Link>*/}
              </Grid>
              <Grid item>
                {/*TODO: Registering*/}
                {/* <Link href="#" variant="body2">
                    Apply For Registration
                </Link>*/}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
