import { Typography } from "@mui/material"
import type { ReactNode } from "react"
type TitleProps = {
    children: ReactNode;
}
export default function Title({children} : TitleProps) {
return (
        <Typography sx={{fontSize: {xs: "3.5rem", sm: "4rem", md:"6rem"}}} className="title" variant="h1">{children}</Typography>
    )
};