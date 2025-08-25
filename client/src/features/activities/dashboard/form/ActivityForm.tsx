import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from "../../../../app/layout/shared/components/TextInput";
import SelectInput from "../../../../app/layout/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../../app/layout/shared/components/DateTimeInput";

export default function ActivityForm() {
    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: ''
        }
    });
    const { id } = useParams();
    const { updateActivity, createActivity, activity, IsLoadingActivity } = useActivities(id);

    useEffect(() => {
        if (activity) reset(activity);
    }, [activity,reset]);

    const onSubmit = (data : ActivitySchema) => {
        console.log(data);        
    }
    if (IsLoadingActivity) return <Typography>Loading Activity...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit ' : 'Create '}Activity
                
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description' multiline rows={3} />
                <SelectInput 
                    items={categoryOptions} 
                    label='Category' 
                    control={control} 
                    name='category' 
                />
                <DateTimeInput label='Date' control={control} name='date' />
                <TextInput label='City' control={control} name='city' />
                <TextInput label='Venue' control={control} name='venue' />
                            
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}