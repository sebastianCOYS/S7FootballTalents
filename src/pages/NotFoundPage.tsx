import { Alert } from "@mui/material";

export default function NotFoundPage() {
    return (
        <>
            <Alert sx={{ height: "50vh" }} severity="error">This page doesn't exist...</Alert>
        </>

    )
}