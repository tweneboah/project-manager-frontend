import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Divider } from "@material-ui/core";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import bg from "../../images/bg.jpg";
import project from "../../images/project.jpg";
import FooterComponent from "../Footer/FooterComponent";
const useStyles = makeStyles((theme) => {
  return {
    [theme.breakpoints.up("sm")]: {
      firstContainerDesktop: {
        minHeight: "70vh",
        backgroundImage: `linear-gradient(135deg, #50A68480 30%, #115E6780 90%), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-90px"
      }
    },

    [theme.breakpoints.down("sm")]: {
      firstContainerDesktop: {
        minHeight: "70vh",

        background: `linear-gradient(301deg, rgba(6,41,6,0.99) 27%, rgba(80,231,199,1) 68%, rgba(0,212,255,1) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-90px"
      }
    },
    secondContainer: {},

    btn1: {
      marginRight: "10px"
    },
    child1: {
      background: "green",
      flexGrow: 1,
      margin: "2px"
    },
    child2: {
      background: "red",
      flexGrow: 2
    },
    child3: {
      [theme.breakpoints.up("md")]: {
        background: "red",
        flexGrow: 1,
        margin: "10px"
      }
    },

    desktopChildlen: {
      [theme.breakpoints.up("md")]: {
        background: "#602115",
        flexGrow: 1,
        margin: "10px",
        marginTop: "-50px",
        textAlign: "center",
        padding: "10px",
        color: "white",
        boxShadow: "3px 8px 6px -3px black"
      }
    },

    mobileChildlen: {
      [theme.breakpoints.down("md")]: {
        background: "#602115",
        flexGrow: 1,
        margin: "10px",
        marginTop: "-50px",
        textAlign: "center",
        padding: "10px",
        color: "white",
        boxShadow: "3px 8px 6px -3px black"
      }
    },

    desktopChildlenImage: {
      [theme.breakpoints.up("md")]: {
        background: "red",
        flexGrow: 1,
        margin: "10px",
        marginTop: "-50px",
        textAlign: "center",
        padding: "10px"
      }
    },
    mobileChildren: {
      [theme.breakpoints.down("md")]: {
        background: "#3A7C7F",
        flexGrow: 1,
        margin: "10px",
        marginTop: "-50px",
        textAlign: "center",
        padding: "10px",
        marginBottom: "150px"
      }
    },
    mobileImages: {
      [theme.breakpoints.down("md")]: {
        marginBottom: "40px"
      }
    },
    childrenImages: {
      border: "1px solid white",
      borderRadius: "50%",
      height: "150px",
      width: "150px",
      marginTop: "-90px"
    },
    title: {
      fontSize: "1.8rem",
      margin: "9px"
    },
    childButton: {
      margin: "20px",
      border: "2px solid red"
    },
    callToAction: {
      [theme.breakpoints.up("md")]: {
        background: "#0E7C7B",
        height: "10rem"
      }
    }
  };
});

const Home = () => {
  const classes = useStyles();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(135deg, #A86041 30%, #115E6780 70%), url(${project})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
      <Grid
        className={`${classes.firstContainerDesktop}`}
        container
        direction="column"
        justify="center"
        alignItems="center">
        <Grid>
          <h1
            style={{
              fontFamily: "Bree Serif",
              fontSize: "3.2rem",
              color: "#f5f6fa"
            }}>
            Keep {""} Track of your Project{" "}
          </h1>
        </Grid>
        <Grid item container direction="row" justify="center">
          <Grid>
            <Button
              variant="contained"
              style={{
                padding: "15px",
                fontSize: "15px",
                marginBottom: "90px",
                background: "#f76a8c",
                color: "white"
              }}>
              Get Started
            </Button>
          </Grid>
          <Grid>
            <Button
              color="secondary"
              variant="outlined"
              style={{
                border: "1px solid yellow",
                padding: "15px",
                fontSize: "15px",
                marginBottom: "90px",
                marginLeft: "20px",
                color: "white"
              }}>
              Get Quotes
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* CONTENT */}
      <Grid
        container
        direction="row"
        justify="space-around"
        className={classes.secondContainer}>
        <Grid
          item
          md={4}
          sm={12}
          className={`${classes.desktopChildlen} ${classes.mobileChildren}`}>
          <div>
            <div>
              <AccessibilityIcon className={classes.childrenImages} />
            </div>
            <div>
              <Typography
                style={{ fontFamily: "Bree Serif", fontSize: "2rem" }}>
                What This App can Do for you
              </Typography>
              <Divider
                style={{ border: "1px solid white", marginBottom: "10px" }}
              />
            </div>

            <div>
              <Typography style={{ fontSize: "1.2rem", color: "#D7D8B8" }}>
                The main purpose for this app is to keep track your of expenses,
                progress, duration of any kind of project that you are doing.
                This App bride the gap of tust between the project owner and the
                person taking care of the undergoing project. The target users
                of this app include the following...
              </Typography>
            </div>

            <div>
              <Button
                style={{
                  border: "1px solid #9AA841",
                  color: "white",
                  margin: "20px",
                  padding: "10px"
                }}
                variant="outlined">
                Read More
              </Button>
            </div>
          </div>
        </Grid>

        <Grid
          item
          md={4}
          sm={12}
          className={`${classes.desktopChildlen} ${classes.mobileChildren}`}>
          <div>
            <div>
              <SwapCallsIcon className={classes.childrenImages} />
            </div>
            <div>
              <Typography
                style={{ fontFamily: "Bree Serif", fontSize: "2rem" }}>
                Request for Customized Software
              </Typography>
              <Divider
                style={{ border: "1px solid white", marginBottom: "10px" }}
              />
            </div>

            <div>
              <Typography style={{ fontSize: "1.2rem", color: "#D7D8B8" }}>
                With dedicated and experienced developers, our aim is to listen
                to our clients voice to deliver good services to promote their
                business. What kind of app do you need? been educational, social
                and business web app, we get you covered at affordable price
              </Typography>
            </div>

            <div>
              <Button
                style={{
                  border: "1px solid #9AA841",
                  color: "white",
                  margin: "20px",
                  padding: "10px"
                }}
                variant="outlined">
                Read More
              </Button>
            </div>
          </div>
        </Grid>

        <Grid
          item
          md={4}
          sm={12}
          className={`${classes.desktopChildlen} ${classes.mobileChildren}`}>
          <div>
            <div>
              <AirplanemodeActiveIcon className={classes.childrenImages} />
            </div>
            <div>
              <Typography
                style={{ fontFamily: "Bree Serif", fontSize: "2rem" }}>
                Customer Support
              </Typography>
              <Divider
                style={{ border: "1px solid white", marginBottom: "10px" }}
              />
            </div>

            <div>
              <Typography style={{ fontSize: "1.2rem", color: "#D7D8B8" }}>
                When it comes to customer support we have dedicated customer
                care services department who are ready to respond to your
                queries. We have two Branches, Atonsu-Kumasi-Ghana and
                China-Qansu Province. Our Team will take you through in service
                training about how to use the app and they ready to respond to
                your future question. We also have whatsapp Group for our
                customers.
              </Typography>
            </div>

            <div>
              <Button
                style={{
                  border: "1px solid #9AA841",
                  color: "white",
                  margin: "20px",
                  padding: "10px"
                }}
                variant="outlined">
                Read More
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* Call to Action */}
      <Grid
        className={classes.callToAction}
        direction="row"
        justify="center"
        alignItems="center"
        container>
        <Grid item>
          <Typography
            style={{
              color: "#FFF6DD",
              fontSize: "1.5rem",
              marginRight: "20px"
            }}>
            Do you want to try for free?
          </Typography>
        </Grid>
        <Grid item>
          <form className={classes.root} noValidate autoComplete="off">
            <input
              placeholder="Enter your Email"
              style={{
                height: "50px",

                textAlign: "center",
                fontSize: "1.2rem",
                background: "#FFF6DD",
                borderRadius: "40px"
              }}
            />
          </form>
        </Grid>
      </Grid>
      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default Home;
