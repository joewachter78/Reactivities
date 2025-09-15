import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile"
import { Box, Button, Paper, Typography } from "@mui/material";
import { editProfileSchema, type EditProfileSchema } from "../../lib/schemas/editProfileSchema";
import TextInput from "../../app/layout/shared/components/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
setEditMode: (editMode: boolean) => void;
}

export default function ProfileEditForm({ setEditMode }: Props) {
    const {id} = useParams();
    const {editProfile} = useProfile(id);

    const { control, handleSubmit } = useForm<EditProfileSchema>({
            mode: 'onTouched',
            resolver: zodResolver(editProfileSchema)
        });

    const onSubmit = async (data: EditProfileSchema) => {
        editProfile.mutate(data,{
            onSuccess: () => setEditMode(false)
        })
    };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
            Edit Profile                
        </Typography>
        <Box component='form' display='flex' flexDirection='column' gap={3} onSubmit={handleSubmit(onSubmit)}>
            <TextInput label='Display Name' control={control} name='displayName' />
            <TextInput label='Bio' name='bio' control={control} multiline rows={3} />
            <Box display='flex' justifyContent='end' gap={3}>
                <Button color="inherit" onClick={() => setEditMode(false)}>Cancel</Button>
                <Button
                    color="success"
                    variant="contained"
                    type="submit"
                >Submit</Button>                
            </Box>
        </Box>
    </Paper>
  )
}