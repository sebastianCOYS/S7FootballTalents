import { Typography } from "@mui/material"
import type { ReactNode } from "react"
type TitleProps = {
    children: ReactNode;
}
export default function Title({children} : TitleProps) {
return (
        <Typography  className="title" variant="h1">{children}</Typography>
    )
};