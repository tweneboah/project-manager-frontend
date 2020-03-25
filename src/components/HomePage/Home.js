import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Divider
} from "@material-ui/core";
import bg from "../../images/bg.jpg";
import project from "../../images/project.jpg";
import FooterComponent from "../Footer/FooterComponent";
const useStyles = makeStyles((theme) => {
  return {
    firstContainer: {
      minHeight: "70vh",
      backgroundImage: `linear-gradient(135deg, #50A68480 30%, #115E6780 90%), url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginTop: "-90px"
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
        background: "pink",
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
        background: "pink",
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
      border: "1px solid green",
      borderRadius: "50%",
      height: "200px",
      width: "200px",
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
        className={classes.firstContainer}
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
              <img
                className={classes.childrenImages}
                alt="project image"
                src={bg}
              />
            </div>
            <div>
              <Typography
                style={{ fontFamily: "Bree Serif", fontSize: "2.3rem" }}>
                Customer Support
              </Typography>
              <Divider
                style={{ border: "1px solid white", marginBottom: "10px" }}
              />
            </div>

            <div>
              <Typography style={{ fontSize: "1.2rem", color: "#D7D8B8" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
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
              <img
                className={classes.childrenImages}
                alt="project image"
                src={bg}
              />
            </div>
            <div>
              <Typography className={classes.title}>
                What we can do for you
              </Typography>
            </div>
            <div>
              <Typography>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
              </Typography>
            </div>
            <div>
              <Button variant="outlined">Read More</Button>
            </div>
          </div>
        </Grid>

        <Grid
          item
          md={4}
          sm={12}
          className={`${classes.desktopChildlen} ${classes.mobileChildren}`}
          style={{ marginTop: "-30px" }}>
          <div>
            <div>
              <img
                className={classes.childrenImages}
                alt="project image"
                src={bg}
              />
            </div>
            <div>
              <Typography className={classes.title}>
                Request for customised Features
              </Typography>
            </div>
            <div>
              <Typography>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
              </Typography>
            </div>
            <div>
              <Button variant="outlined">Read More</Button>
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
