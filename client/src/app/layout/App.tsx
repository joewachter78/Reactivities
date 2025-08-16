import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
//import { useEffect, useState } from "react";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useQuery } from "@tanstack/react-query";

function App() {  
  //const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

//useEffect(() => {
//axios.get<Activity[]>('https://localhost:5001/api/activities')
//.then(response => setActivities(response.data))
//}, [])

  const {data: activities, isPending} = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      return response.data;
    }
  })

  const handleSelectActvity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActvity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    // if (activity.id) {
    //   setActivities(activities.map(x => x.id === activity.id ? activity : x));
    // } else {
    //   const newActivity = {...activity, id: activities.length.toString()}
    //   setActivities([...activities, newActivity])
    // }
    console.log(activity);
    setEditMode(false);
  }

  const handleDelete = (id: string) => {
    //setActivities(activities.filter(x => x.id !== id))
    console.log(id);
  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline/>
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{mt: 3}}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard 
            activities={activities} 
            selectActivity={handleSelectActvity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            submitForm={handleSubmitForm}
            deleteActivity={handleDelete}
          />
        )}
      </Container>      
    </Box>
      
  )
}

export default App
