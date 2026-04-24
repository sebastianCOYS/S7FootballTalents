import type { ReactNode } from "react"
import { Typography } from "@mui/material"
type SubtitleProps = {
    children: ReactNode;
}
export default function Subtitle({children} : SubtitleProps) {
    return (
        <Typography variant={"subtitle1"}>{children}</Typography>
    )
}