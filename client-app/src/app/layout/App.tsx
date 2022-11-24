import {BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import Homepage from '../pages/Homepage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  // const location = useLocation();
  //key={location.key}
  
  return (
    <>
      
      <Router>
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
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default observer(App);
