import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Character: NextPage = () => {
  const { user, error, isLoading } = useUser();
  interface CharacterPreview {
    charId:number,
    nom:string,
    photo:string,
    description:string
  }
  
  const [characterList, setCharacterList] = useState([]);
  const [characterFocused, setCharacterFocused] = useState<CharacterPreview>();

  const id = user?.sub?.substring(user.sub?.indexOf('|')+1,user.sub?.length)
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  useEffect(() => {
    async function getPokemons() {
      const response = await fetch("http://192.168.137.1:8090/utilisateurs/getCharacters");
      setCharacterList(await response.json())
    }
    getPokemons();
  }, [])
  function focusCharacter(characterFocused:CharacterPreview) {
    setCharacterFocused(characterFocused)
  }
  async function choseCharacter(idPersonnage:number) {
    await fetch("http://192.168.137.1:8090/utilisateurs/setCharacter", {
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
    Router.reload()
}
if(characterFocused) {
  return (
    <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="stretch"
>
<Item>
        <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        component="img"
        height="140"
        image={characterFocused.photo}
        alt={characterFocused.nom}
      />
    </Card>
    </Item>
    <Item>
      <Card>
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {characterFocused.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Button color="success" onClick={() => choseCharacter(characterFocused.charId)}>
        {characterFocused.nom}
      </Button>
        </Typography>
      </CardContent>
      </Card>
    </Item>
    </Grid>
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