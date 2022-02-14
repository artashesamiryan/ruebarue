import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";

export default function Spinner() {
    return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="inherit" />
        </Box>
    );
}