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
          <Image src={pokeFocused.image} height={200} width={200} alt="pokeFocusedImage"/>
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
          <div key={index} className='text-center border pt-3 pb-3 rounded'>
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
  )
}
    
export default Starter