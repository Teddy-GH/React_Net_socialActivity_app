import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'



const ActivityDetails = () => {
  const{activityStore}=useStore();
  const {selectedActivity:activity, openForm, cancleSelectedActivity} =activityStore;
  if(!activity) return <LoadingComponent />;
  return (
    <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
              {activity.description}
            </Card.Description>
            <Card.Content extra>
               <Button.Group widths='2'>
                <Button basic color='blue' content='Edit'  onClick={() => openForm(activity.id)}/>
                <Button basic color='grey' content='Cancle' onClick={cancleSelectedActivity} />
               </Button.Group>
            </Card.Content>
        </Card.Content>
    </Card>
  )
}

export default ActivityDetails