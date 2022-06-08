import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
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
      const response = await fetch("http://192.168.137.1:8090/pokemons");
      setPokeList(await response.json())
    }
    getPokemons();
  }, [])
  
  return (
    <div className="grid grid-cols-4 gap-4 m-10">
      {pokeList.map((pokemon:PokePreview, index) => (
        <Link href={"/pokemon?id="+pokemon.pokeId} passHref={true}>
          <div className='text-center border pt-3 pb-3 rounded'>
            
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom}
          </div>
          </Link>
      ))}
    </div>
  )
}
    
export default Pokedex