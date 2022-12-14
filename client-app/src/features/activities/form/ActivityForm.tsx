import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";

const ActivityForm = () => {
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loadActivity,
    loading,
    loadingIntial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required(),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    } else {
      setActivity({
        id: "",
        title: "",
        category: "",
        description: "",
        date: null,
        city: "",
        venue: "",
      });
    }
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if(activity.id.length === 0) {
      let newActivity= {
        ...activity,
        id:uuid()
      }
      createActivity(newActivity).then(() =>navigate(`/activities/${newActivity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  };

  
  if (loadingIntial) return <LoadingComponent  content='Loading activity...'/>
  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal'/>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) =>handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
            <MyDateInput
             placeholderText="Date"
              name="date" 
              showTimeSelect
              timeCaption="time"
              dateFormat='MMMM d, yyyy h:mm aa'
              
              />
              <Header content='Loaction Details' sub color='teal'/>
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid }
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to={"/activities"}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
