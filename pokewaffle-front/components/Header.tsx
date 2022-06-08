import { NextPage } from "next";
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import LoginHeader from "./LoginHeader";
import Image from "next/image";

interface PokePreview {
  pokeId: number
  nom: string,
  petiteImage: string,
}

const Header: React.FC = () => {

      
      const [pokeList, setPokeList] = useState([]);
      useEffect(() => {
        async function getPokemons() {
          const response = await fetch("http://192.168.137.1:8090/pokemons");
          setPokeList(await response.json())
        }
        getPokemons();
      }, [])/*
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
          <Link href={"/pokemon?id="+pokemon.pokeId} passHref={true}>
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <Image
            loading="lazy"
            width={70}
            height={70}
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
                    <LoginHeader/>
                </Stack>
            </Toolbar>
        </AppBar>
    )*/
    return (
      <div className="flex flex-row flex-nowrap h-20 bg-sky-600 drop-shadow-xl mb-10">
        <a href="/" className="basis-1/4 text-center self-center">
          Site Pokémon Next JS
        </a>
        <div className="basis-1/4">vide</div>
        <div className="basis-1/4 self-center text-right">
          <a href="/pokedex" className="rounded-full bg-sky-700 hover:bg-sky-900 p-3">
            Pokedex
          </a>
          <a href="/fight/main" className="rounded-full bg-sky-700 hover:bg-sky-900 p-3">
            Combats
          </a>
        </div>
        <LoginHeader/>
      </div>
    )
}

export default Header