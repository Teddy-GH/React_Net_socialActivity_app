import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';



function App() { 

 const {commonStore, userStore} = useStore();

 useEffect(() => {
  if (commonStore.token) {
    userStore.getUser().finally(() => commonStore.setAppLoaded());
  } else {
    commonStore.setAppLoaded();
  }
 }, [commonStore, userStore]);


 if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
  
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
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
              <Route path="/login" element={<LoginForm />} />
              <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default observer(App);
