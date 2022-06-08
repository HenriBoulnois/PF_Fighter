import { NextPage } from "next";
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import LoginHeader from "./LoginHeader";
import Image from "next/image";

interface PokePreview {
  pokeId: number
  nom: string,
  petiteImage: string,
}

const Header: React.FC = () => {

      
      const [pokeList, setPokeList] = useState([]);
      useEffect(() => {
        async function getPokemons() {
          const response = await fetch("http://pokefighter.hopto.org:8090/pokemons");
          setPokeList(await response.json())
        }
        getPokemons();
      }, [])
    return (
      <div className="flex flex-row flex-nowrap h-20 bg-sky-600 drop-shadow-xl mb-10">
        <Link href={"/"} passHref={true}>
        <a className="basis-1/12">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img alt="" className="pl-5 object-contain h-20 w-20" src="https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png"/>
        </a>
        </Link>
        <Link href={"/"} passHref={true}>
        <a className="basis-1/5 text-left self-center">
            Site Pokémon Next JS
        </a>
        </Link>
        <div className="basis-1/3">

        </div>
        <div className="basis-1/4 self-center text-right">
        <Link href={"/pokedex"}>
          <a className="rounded-full bg-sky-700 hover:bg-sky-800 p-5 m-1">        
              Pokedex
          </a>
          </Link>
          <a href="/fight/main" className="rounded-full bg-sky-700 hover:bg-sky-900 p-5 m-1">
            Combats
          </a>
        </div>
        <LoginHeader/>
      </div>
    )
}

export default Header