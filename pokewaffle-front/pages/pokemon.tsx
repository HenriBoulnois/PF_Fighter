import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import salameche404 from "../public/salameche404.webp"
import { pick } from 'query-string';

const Pokemon: NextPage = () => {
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
  
  const {
      query: {id}
  } = useRouter()

  const [pokemon, setPokemon] = useState<PokePreview>();
  useEffect(() => {
    async function getPokemon() {
        
      const response = await fetch("http://pokefighter.hopto.org:8090/pokemons/"+id);
      //const response = await fetch("http://192.168.137.1:8090/pokemons/"+id);
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
  <div className='flex flex-column'>
    <div className='basis-1/4'>

    </div>
    <div className='basis-3/4 flex-row text-center border pt-3 pb-3 rounded'>
      <div className='flex flex-column'>
        <div className='basis-1/4'>
          Taille : {pokemon.taille} m <br/>
          Poids : {pokemon.poids} kg
        </div>
        <div className='basis-2/4'>
          <Image src={pokemon.image} height={200} width={200} alt="pokemonImage"/>
        </div>
        <div className='basis-1/4'>
          PV : {pokemon.pv} <br/>
          Defense : {pokemon.defense} <br/>
          Attaque : {pokemon.attaque} <br/>
          Vitesse : {pokemon.vitesse}
        </div>
      </div>
      <div className='text-xl font-bold'>
        {pokemon.nom}
      </div>
      <div className='font-bold'>
        Description :
      </div>
      <div>
      {pokemon.description}
      </div>
    </div>
    <div className='basis-1/4'>
      
    </div>
  </div>
  )
}
    
export default Pokemon