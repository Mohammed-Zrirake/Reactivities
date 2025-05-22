import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

function App(){
 const [activities, setActivities] = useState<Activity []>([]);
 useEffect(()=> {
  axios.get<Activity []>('https://localhost:5001/api/activities')
  .then(response => setActivities(response.data))
 },[]) 
 return (
  <div>
     <Typography variant='h3'>Activities</Typography>
     <ul>
      {activities.map((activity) =>
      <li key={activity.id}>{activity.title}</li>
      )}
     </ul>
  </div>

  )
}

    

export default App
