import type { ReactNode } from "react";
import { Typography } from "@mui/material";
type SubtitleProps = {
    children: ReactNode;
}
export default function Subtitle({ children }: SubtitleProps) {
    return (
        <Typography sx={{ textAlign: "center", mb: 4 }} variant={"subtitle1"}>{children}</Typography>
    )
}