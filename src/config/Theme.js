import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#426861"
    },
    secondary: {
      main: "#297B4D"
    }
  },
  status: {
    danger: "orange"
  }
});

export default Theme;
