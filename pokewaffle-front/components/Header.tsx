import { AppBar, Toolbar, Typography, Button, Stack, IconButton } from "@mui/material";
import { NextPage } from "next";
import AdbIcon from '@mui/icons-material/Adb';

const Header: NextPage = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton href="/">
                    <AdbIcon/>
                </IconButton>                
                <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
                    Site Pokémon Next JS
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" href="/pokedex">Pokedex</Button>
                    <Button color="inherit" href="/user">User</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header