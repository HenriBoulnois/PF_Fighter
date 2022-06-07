import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
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
  
  const [characterList, setCharacterList] = useState([]);
  const [characterFocused, setCharacterFocused] = useState<CharacterPreview>();

  const id = user?.sub?.substring(user.sub?.indexOf('|')+1,user.sub?.length)
  useEffect(() => {
    async function getPokemons() {
      const response = await fetch("http://81.254.98.117:8090/utilisateurs/getCharacters");
      setCharacterList(await response.json())
    }
    getPokemons();
  }, [])
  function focusCharacter(characterFocused:CharacterPreview) {
    setCharacterFocused(characterFocused)
  }
  async function choseCharacter(idPersonnage:number) {
    await fetch("http://81.254.98.117:8090/utilisateurs/setCharacter", {
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    },
        body: JSON.stringify({
            uuidUtilisateur: id,
            idCharacter: idPersonnage
        }),
    });
    Router.push("/creation/starter");
}
if(characterFocused) {
  console.log(characterFocused)
  return (
  <div>
        <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        component="img"
        height="140"
        image={characterFocused.photo}
        alt={characterFocused.nom}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {characterFocused.nom}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Button color="success" onClick={() => choseCharacter(characterFocused.charId)}>
        {characterFocused.nom}
      </Button>
        </Typography>
      </CardContent>
    </Card>

      </div>
  )
} 
return (
    <div className="p-5 visible">
    
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {characterList.map((character:CharacterPreview, index) => (
            
        <Grid item xs={2} sm={4} md={4} key={index}>
            
          <div className='text-center border pt-3 pb-3 rounded'>
          <Button color="success" onClick={() => focusCharacter(character)}>
        {character.nom}
      </Button><br/>
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