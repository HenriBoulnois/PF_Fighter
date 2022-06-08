import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import salameche404 from "../public/salameche404.webp"
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Pokemon: NextPage = () => {
  interface PokePreview {
    pokeId: number
    nom: string,
    description: string
    image: string,
    taille: number,
    poids: number,
    type: [typeId:number,nom:string]
  }
  
  const {
      query: {id}
  } = useRouter()

  const [pokemon, setPokemon] = useState<PokePreview>();
  useEffect(() => {
    async function getPokemon() {
        
      const response = await fetch("http://192.168.137.1:8090/pokemons/"+id);
      setPokemon(await response.json())
    }
    if(id) {
        getPokemon();
    }
  }, [id])
  if(!pokemon) { 
      return(
        <div className="text-center bottom-0 absolute pt-5">
        <h1>Ce pokemon n&apos;a pas encore été découvert !</h1>
        <a>Vous pourrez retourner sur la page principale en suivant ce Salamèche : </a><br/>
        <Link href="/" passHref={true}><Image 
            src={salameche404}
            width={200}
            height={200}
            alt="errorpagesalameche"/>
        </Link>    
    </div>
      );
  }
  
  return (
    <div className="p-5">
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={pokemon.image}
        alt={pokemon.nom}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.nom}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {pokemon.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Poids : {pokemon.poids}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Taille : {pokemon.taille}
        </Typography>
      </CardContent>
    </Card>

    </div>
  )
}
    
export default Pokemon