import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

const Starter: NextPage = () => {
  const { user, error, isLoading } = useUser();
  interface PokePreview {
    pokeId: number
    nom: string,
    description: string
    image: string,
    taille: number,
    poids: number,
    type: [typeId:number,nom:string]
  }
  
  const [pokeList, setPokeList] = useState([]);
  const [pokeFocused, setPokeFocused] = useState<PokePreview>()

  const id = user?.sub?.substring(user?.sub?.indexOf('|')+1,user?.sub?.length)
  useEffect(() => {
    async function getPokemons() {
      const response = await fetch("http://81.254.98.117:8090/pokemons/getStarters");
      setPokeList(await response.json())
    }
    getPokemons();
  }, [])
  function focusPokemon(pokemonFocused:PokePreview) {
    setPokeFocused(pokemonFocused)
  }
  async function choseStarter(idPokemon:number) {
    await fetch("http://81.254.98.117:8090/utilisateurs/setStarter", {
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    },
        body: JSON.stringify({
            uuidUtilisateur: id,
            idStarter: idPokemon
        }),
    });
    Router.push("/");
}
if(pokeFocused) {
  console.log(pokeFocused)
  return (
  <div>
        <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        component="img"
        height="140"
        image={pokeFocused.image}
        alt={pokeFocused.nom}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokeFocused.nom}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Button color="success" onClick={() => choseStarter(pokeFocused.pokeId)}>
        {pokeFocused.nom}
      </Button>
        </Typography>
      </CardContent>
    </Card>

      </div>
  )
} 
  return (
    <div className="p-5">
    
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {pokeList.map((pokemon:PokePreview, index) => (
            
        <Grid item xs={2} sm={4} md={4} key={index}>
            
          <div className='text-center border pt-3 pb-3 rounded'>
          <Button color="success" onClick={() => focusPokemon(pokemon)}>
        {pokemon.nom}, je te choisis !
      </Button><br/>
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            <Button variant="contained" href={"/pokemon?id="+pokemon.pokeId}>Plus d&apos;infos</Button><br/>
            </div>
          
        </Grid>
        
      ))}
    </Grid>
      
    </div>
  )
}
    
export default Starter