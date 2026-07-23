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


export default function FeatureGrid({ features }: FeatureGridProps) {
    return (
        <>
            <Box sx={{ mt: 4 }}>
                <Grid sx={{ justifyContent: "center" }} container spacing={4}>
                    {features.map((feature) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                            <Paper sx={{ p: 4, borderRadius: "20px", height: "100%" }}>
                                <Box sx={{ mb: 2 }}>
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