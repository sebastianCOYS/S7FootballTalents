import React from 'react';
//mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
type FeatureCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
}
export default function FeatureCard(feature: FeatureCardProps) {
    
    return(
        <>
            <Paper sx={{p: 4, borderRadius: "20px", height: "100%"}}>
                <Box sx={{mb: 2}}>
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
