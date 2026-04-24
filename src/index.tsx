import "fontsource-roboto";

import App from "./pages/App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CustomThemeProvider } from "./pages/core/useTogglePaletteContext";
import DateFnsUtils from "@date-io/date-fns";
import { GoogleAuthProvider } from "./google-integration/GoogleAuth";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import ReactDOM from "react-dom";

function Root() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <GoogleAuthProvider>
        <CustomThemeProvider>
          <CssBaseline />
          <App />
        </CustomThemeProvider>
      </GoogleAuthProvider>
    </MuiPickersUtilsProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
