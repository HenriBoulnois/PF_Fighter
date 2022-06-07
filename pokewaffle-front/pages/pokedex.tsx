import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Grid } from '@mui/material';
import Link from 'next/link';

const Pokedex: NextPage = () => {
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
  useEffect(() => {
    async function getPokemons() {
      const response = await fetch("http://81.254.98.117:8090/pokemons");
      setPokeList(await response.json())
    }
    getPokemons();
  }, [])
  
  return (
    <div className="p-5">
    
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {pokeList.map((pokemon:PokePreview, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <Link href={"/pokemon?id="+pokemon.pokeId} passHref={true}>
          <div className='text-center border pt-3 pb-3 rounded'>
            
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom}
          </div>
          </Link>
        </Grid>

      ))}
    </Grid>
      
    </div>
  )
}
    
export default Pokedex