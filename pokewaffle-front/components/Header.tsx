import { AppBar, Toolbar, Typography, Button, Stack, IconButton, Autocomplete, TextField, Box } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import AdbIcon from '@mui/icons-material/Adb';
import LoginHeader from "./LoginHeader";

const Header: NextPage = () => {
    interface PokePreview {
        pokeId: number
        nom: string,
        petiteImage: string,
      }
      
      const [pokeList, setPokeList] = useState([]);
      useEffect(() => {
        async function getPokemons() {
          const response = await fetch("http://192.168.137.1:8090/pokemons");
          setPokeList(await response.json())
        }
        getPokemons();
      }, [])
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
                <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={pokeList}
      autoHighlight
      getOptionLabel={(pokemon:PokePreview) => pokemon.nom}
      renderOption={(props, pokemon) => (
          <Link href={"/pokemon?id="+pokemon.pokeId}>
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="70"
            src={pokemon.petiteImage}
            alt=""
          />
          {pokemon.nom}
        </Box>
        </Link>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pokémons"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
                    <Button color="inherit" href="/pokedex">Pokedex</Button>
                    <Button color="inherit" href="/user">User</Button>
                    <LoginHeader/>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header