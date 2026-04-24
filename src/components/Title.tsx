import { Typography } from "@mui/material"
import type { ReactNode } from "react"
type TitleProps = {
    children: ReactNode;
}
export default function Title({children} : TitleProps) {
return (
        <Typography variant="h1">{children}</Typography>
    )
};