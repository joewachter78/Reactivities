import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";
import { useEffect, useState, type SyntheticEvent } from "react";
import { formatDate } from "../../lib/util/util";

export default function ProfileActivities() {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams();
    const { userActivities, setFilter, IsLoadingUserActivity } = useProfile(id);

    useEffect(() => {
        setFilter('past')
    }, [setFilter])

    const tabContent = [
        { label: 'Past', key: "past" },
        { label: 'Future', key: "future" },
        { label: 'Hosting', key: "hosting" }
    ]
    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabContent[newValue].key);
    }

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={handleChange}
            >
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} sx={{ mr: 3 }}></Tab>
                ))}
            </Tabs>            
            {userActivities?.map(activity => (
                <>
                    <Box key={activity.id}>
                        <Card>
                            <CardContent>
                                <Typography>{activity.title}</Typography>                                
                                <Typography>{formatDate(activity.date)}</Typography>
                                <Typography>{activity.category}</Typography>
                            </CardContent>
                        </Card>                        
                    </Box>
                </>
            ))}
        </Box>
    )
}