import React from "react";
import { Grid } from "@material-ui/core";

const AboutMe = () => {
  return (
    <div>
      <Grid>
        {/* First container */}
        <Grid container direction="column">
          <Grid item>1</Grid>
          <Grid item>2</Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutMe;
