import {BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import Homepage from '../pages/Homepage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from '../../features/errors/ServerError';



function App() { 

  // const location = useLocation();
  //key={location.key}
  
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Router >
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        {/* <Route 
      path={'/(.+)'}
      render={() => (
        <>

        </>
      )}
      
      
      
      /> */}
        <Navbar />
        <Container style={{ marginTop: "7em" }}>
          <Routes>
              {/* <Route path='/' element={<Homepage />} /> */}
              <Route path="/activities" element={<ActivityDashboard />} />
              <Route path="/activities/:id" element={<ActivityDetails />} />
              <Route path={"/createActivity"} element={<ActivityForm />} />
              <Route path={"/manage/:id"} element={<ActivityForm />} />
              <Route path="/errors" element={<TestErrors />} />
              <Route path="/server-error" element={<ServerError />} />
              <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default observer(App);
