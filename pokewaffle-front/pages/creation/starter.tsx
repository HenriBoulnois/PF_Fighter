import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';


interface PokePreview {
  pokeId: number
  nom: string,
  description: string
  image: string,
  taille: number,
  poids: number,
  type: [typeId:number,nom:string]
  pv:number,
  attaque:number,
  defense:number,
  vitesse:number,
}
const Starter: NextPage = () => {
  const { user, error, isLoading } = useUser();
  
  const [pokeList, setPokeList] = useState([]);
  const [pokeFocused, setPokeFocused] = useState<PokePreview>()

  const id = user?.sub?.substring(user?.sub?.indexOf('|')+1,user?.sub?.length)
  useEffect(() => {
    async function getPokemons() {
      const response = await fetch("http://pokefighter.hopto.org:8090/pokemons/getStarters");
      setPokeList(await response.json())
    }
    getPokemons();
  }, [])
  function focusPokemon(pokemonFocused:PokePreview) {
    setPokeFocused(pokemonFocused)
  }
  async function choseStarter(idPokemon:number) {
    await fetch("http://pokefighter.hopto.org:8090/utilisateurs/setStarter", {
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
    Router.reload()
    Router.push("/");
}
if(pokeFocused) {
  return(
    <div className='flex flex-column'>
    <div className='basis-1/4'>

    </div>
    <div className='basis-3/4 flex-row text-center border pt-3 pb-3 rounded'>
    <button  onClick={() => choseStarter(pokeFocused.pokeId)}>{pokeFocused.nom}, je te choisis</button>
      <div className='flex flex-column'>
        <div className='basis-1/4'>
          Taille : {pokeFocused.taille} m <br/>
          Poids : {pokeFocused.poids} kg
        </div>
        <div className='basis-2/4'>
          <Image src={pokeFocused.image} height={200} width={200}/>
        </div>
        <div className='basis-1/4'>
          PV : {pokeFocused.pv} <br/>
          Defense : {pokeFocused.defense} <br/>
          Attaque : {pokeFocused.attaque} <br/>
          Vitesse : {pokeFocused.vitesse}
        </div>
      </div>
      <div className='text-xl font-bold'>
        {pokeFocused.nom}
      </div>
      <div className='font-bold'>
        Description :
      </div>
      <div>
      {pokeFocused.description}
      </div>
    </div>
    <div className='basis-1/4'>
      
    </div>
  </div>
  )
} 
  return (
    <div className='flex flex-column'>
    <div className='basis-1/4'>

  </div>
  <div className="grid grid-cols-3 gap-3 m-10 basis-2/4">
      {pokeList.map((pokemon:PokePreview, index) => (
          <div className='text-center border pt-3 pb-3 rounded'>
          <button onClick={() => focusPokemon(pokemon)}>
        {pokemon.nom}
      </button><br/>
            <Image src={pokemon?.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom}
          </div>
      ))}
    </div>
    <div className='basis-1/4'>

    </div>
    </div>
  ) /*(
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
  )*/
}
    
export default Starter