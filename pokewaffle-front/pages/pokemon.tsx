import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import salameche404 from "../public/salameche404.webp"
import { pick } from 'query-string';
import { useUser } from '@auth0/nextjs-auth0';

interface UserApi {
  uuid: string,
  nom: string,
  photo: string,
  email: string,
  userId: string,
  starterPokemon: number,
}

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
  const { user, error, isLoading } = useUser();
  const [userApi, setUserApi] = useState<UserApi>();
  const [pokemon, setPokemon] = useState<PokePreview>();
  const iduser = user?.sub?.substring(user.sub.indexOf('|')+1,user.sub.length)
  useEffect(() => {
    async function getPokemon() {
        
      const response = await fetch("http://pokefighter.hopto.org:8090/pokemons/"+id);
      //const response = await fetch("http://192.168.137.1:8090/pokemons/"+id);
      setPokemon(await response.json())
    }
    if(id) {
        getPokemon();
    }
    async function getUserApi() {
      const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getByUuid/"+iduser);
      setUserApi(await response.json())
    }
    getUserApi();
  }, [id,iduser])
  async function catchPokemon() {
    async function addToTeam() {
    await fetch("http://pokefighter.hopto.org:8090/utilisateurs/"+userApi?.userId+"/addPokemonToEquipe/"+id, {
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    },
  
    });
  }
  addToTeam()
  Router.push("/equipe");
  }
  if(!pokemon) { 
      return(
        <div className="text-center bottom-0 absolute pt-5">
        <h1>Ce pokemon n&apos;a pas encore ??t?? d??couvert !</h1>
        <a>Vous pourrez retourner sur la page principale en suivant ce Salam??che : </a><br/>
        <Link href="/" passHref={true}>
        <Image 
                src="https://www.pokepedia.fr/images/2/20/Salam%C3%A8che-PDMDX.png"
                width="200"
                height="200"
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
    {userApi ? <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' 
    onClick={() => catchPokemon()}>{pokemon.nom}, je te choisis</button> : <></>}
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
    {}
    <div className='basis-1/4'>
      
    </div>
  </div>
  )
}
    
export default Pokemon