import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import Link from 'next/link';
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

const Character: NextPage = () => {
  const { user, error, isLoading } = useUser();
  interface CharacterPreview {
    charId:number,
    nom:string,
    photo:string
  }
  
  const [pokeList, setPokeList] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const id = user?.sub?.substring(user.sub?.indexOf('|')+1,user.sub?.length)
    interface UserApi {
        uuid: string,
        nom: string,
        photo: string,
        email: string,
        userId: string,
        starterPokemon: number,
      }
      const [userApi, setUserApi] = useState<UserApi>();
      useEffect(() => {
        async function getUserApi() {
          const response = await fetch("http://81.254.98.117:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
        }
        getUserApi();
      }, [])
  useEffect(() => {
    async function getPokemons() {
      const response = await fetch("http://81.254.98.117:8090/utilisateurs/getCharacters");
      setPokeList(await response.json())
    }
    getPokemons();
  }, [])
  async function choseCharacter(idPersonnage:number) {
    await fetch("http://81.254.98.117:8090/utilisateurs/setCharacter", {
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    },
        body: JSON.stringify({
            idUtilisateur: userApi,
            idCharacter: idPersonnage
        }),
    });
    setOpen(false);
    Router.push("/creation/starter");
}
  return (
    <div className="p-5">
    
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {pokeList.map((character:CharacterPreview, index) => (
            
        <Grid item xs={2} sm={4} md={4} key={index}>
            
          <div className='text-center border pt-3 pb-3 rounded'>
          <Button color="success" onClick={handleClickOpen}>
        {character.nom}
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
          <Button onClick={handleClose}>J&apos;hésite encore</Button>
          <Button autoFocus onClick={() => choseCharacter(character.charId)}>
            Je te choisis !
          </Button>
        </DialogActions>
      </Dialog>
            <Image src={character.photo} height={631} width={245} alt={character.nom}></Image><br/>
            <Button variant="contained" href={"/pokemon?id="+character.charId}>Plus d&apos;infos</Button><br/>
            </div>
          
        </Grid>
        
      ))}
    </Grid>
      
    </div>
  )
}
    
export default Character