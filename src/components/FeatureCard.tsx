import React from 'react';
//mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//mui icons
import SearchIcon from '@mui/icons-material/Search';

type FeatureCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
}
export default function FeatureCard(feature: FeatureCardProps) {
    
    return(
        <>
            <Paper sx={{padding: "25px", borderRadius: "10px", height: "100%"}}>
                <Box sx={{marginBottom: "15px"}}>
                    {feature.icon}
                </Box>
                
                <Typography variant="h6">
                    {feature.title}
                </Typography>

                <Typography variant="body2">
                    {feature.description}
                </Typography>
            </Paper>
        </>
    )
}