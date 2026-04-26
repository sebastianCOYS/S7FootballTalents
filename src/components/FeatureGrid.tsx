//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type Feature = {
    title: string;
    description: string;
    icon: React.ReactNode;
}

type FeatureGridProps = {
    features: Feature[]
}


export default function FeatureGrid({features}: FeatureGridProps) {
    return (
        <>
        <Box sx={{marginTop: "30px"}}>
            <Grid container spacing={3}>
                {features.map((feature) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={feature.title}>
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
                    </Grid>
                ))}
            </Grid>
        </Box>
        </>
    )
}