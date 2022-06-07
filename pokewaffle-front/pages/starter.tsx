import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import Link from 'next/link';
import Router from 'next/router';

const Starter: NextPage = () => {
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    async function getPokemons() {
      const response = await fetch("http://192.168.137.1:8090/pokemons/getStarters");
      setPokeList(await response.json())
    }
    getPokemons();
  }, [])
  async function choseStarter(idPokemon:number) {
    await fetch("http://192.168.137.1:8090/utilisateurs/setStarter", {
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    },
        body: JSON.stringify({
            idUtilisateur: 1,
            idStarter: idPokemon
        }),
    });
    setOpen(false);
    Router.push("/");
}
  return (
    <div className="p-5">
    
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {pokeList.map((pokemon:PokePreview, index) => (
            
        <Grid item xs={2} sm={4} md={4} key={index}>
            
          <div className='text-center border pt-3 pb-3 rounded'>
          <Button color="success" onClick={handleClickOpen}>
        {pokemon.nom}, je te choisis !
      </Button><br/>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Choix starter"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de votre choix ? Votre starter ne pourra pas être changé plus tard.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>J'hésite encore</Button>
          <Button autoFocus onClick={() => choseStarter(pokemon.pokeId)}>
            Je te choisis !
          </Button>
        </DialogActions>
      </Dialog>
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            <Button variant="contained" href={"/pokemon?id="+pokemon.pokeId}>Plus d'infos</Button><br/>
            </div>
          
        </Grid>
        
      ))}
    </Grid>
      
    </div>
  )
}
    
export default Starter