import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Paper } from "@material-ui/core";
import bg from "../../images/bg.jpg";
const useStyles = makeStyles((theme) => {
  return {
    firstContainer: {
      minHeight: "70vh",
      backgroundImage: `linear-gradient(135deg, #50A68480 30%, #115E6780 90%), url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
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
      background: "pink",
      flexGrow: 1,
      border: "2px solid red",
      margin: "10px"
    },
    image1: {
      border: "1px solid green",
      borderRadius: "50%",
      height: "200px",
      width: "200px",
      marginTop: "10px"
    },
    title: {
      fontSize: "1.8rem",
      margin: "9px"
    }
  };
});

const Home = () => {
  const classes = useStyles();

  return (
    <div style={{ background: "#426861" }}>
      <Grid
        className={classes.firstContainer}
        container
        direction="column"
        justify="center"
        alignItems="center">
        <Grid>
          <h1>Welcome Home heroku wooow </h1>
        </Grid>
        <Grid item container direction="row" justify="center">
          <Grid>
            <Button variant="contained" className={classes.btn1}>
              Get Started
            </Button>
          </Grid>
          <Grid>
            <Button color="secondary" variant="outlined">
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
        <Grid item md={4} sm={12} className={classes.child3}>
          <div style={{ textAlign: "center" }}>
            <div>
              <img className={classes.image1} alt="project image" src={bg} />
            </div>
            <div>
              <Typography className={classes.title}>
                Customer Support
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
        <Grid item md={4} sm={12} className={classes.child3}>
          <div style={{ textAlign: "center" }}>
            <div>
              <img className={classes.image1} alt="project image" src={bg} />
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

        <Grid item md={4} sm={12} className={classes.child3}>
          <div style={{ textAlign: "center" }}>
            <div>
              <img className={classes.image1} alt="project image" src={bg} />
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
    </div>
  );
};

export default Home;
