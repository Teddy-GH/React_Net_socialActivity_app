import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import { store, StoreContext } from "./app/stores/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
