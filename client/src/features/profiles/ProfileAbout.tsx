import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";
import ProfileEditForm from "./ProfileEditForm";
import { useState } from "react";

export default function ProfileAbout() {
  
    const {id} = useParams();
    const { profile } =  useProfile(id);
    const [editMode, setEditMode] = useState(false);

    return (
    <Box>
        <Box display='flex'></Box>
        <Typography variant="h5">About {profile?.displayName}</Typography>
        <Button onClick={() => setEditMode(true)}>{editMode ? '' : 'Edit Profile'}</Button>
        <Divider sx={{my: 2}} />
        <Box sx={{overflow: 'auto', maxHeight: 350}}>
            {editMode ? (
                <ProfileEditForm setEditMode={setEditMode} />
            ) : (
                <Typography variant="body1" sx={{whiteSpace: 'pre-wrap'}}>
                    {profile?.bio || 'No description added yet'}
                </Typography>
            )}            
        </Box>
    </Box>
    
  )
}