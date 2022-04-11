import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import { getDisplayName } from 'next/dist/shared/lib/utils';

const Pokedex: NextPage = () => {
    interface PokePreview {
        name: string,
        sprite: string,
        id: number
    }
    //var pokeList:PokePreview[] = [];
    const [pokeList, setPokeList] = useState<PokePreview[]>([]);
    const [count, setCount] = useState(9);
    
    /*useEffect(() => {
    for (let i = 1 ; i < 11; i++) {
        var newPokemon:PokePreview = {name: "", sprite: "", id: 0};
        axios
          .get("https://pokeapi.co/api/v2/pokemon/" + i)
          .then(function (response) {
            
            newPokemon.name = response.data.species.name;
            newPokemon.sprite =
              response.data.sprites.other?.["official-artwork"].front_default;
            newPokemon.id = response.data.id;
            setPokeList(pokeList => [...pokeList,newPokemon]);
          });
        }
      }, []);*/
      const fetchPokemon = async (nbr: number) => {
        /*for (let i = 1 ; i < 20; i++) {
          var newPokemon:PokePreview = {name: "", sprite: "", id: 0};
          let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+i)
          response = await response.json()
          newPokemon.name = response.species.name;
          newPokemon.sprite =
                response.sprites.other?.["official-artwork"].front_default;
          newPokemon.id = response.id;
          setPokeList(pokeList => [...pokeList,newPokemon]);
        }*/
          for (let i = nbr + 1; i < nbr + 10; i++) {
            let newPokemon:PokePreview = {name: "", sprite: "", id: 0};
            let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+i)
            response = await response.json()
            newPokemon.sprite = response.sprites.other?.["official-artwork"].front_default;
            newPokemon.id = response.id;
            let responseSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + i)
            responseSpecies = await responseSpecies.json()
            newPokemon.name = responseSpecies.names[4].name;
            //newPokemon.genus = response.data.genera[3].genus;
            //newPokemon.generation = response.data.generation.name;
            //newPokemon.location = response.data.habitat.name;
            setPokeList(pokeList => [...pokeList,newPokemon]);
          }   
      };
      useEffect(() => {
        //fetchPokemon(0)
        console.log("usef")
      }, [])
      const buttonHandler = () => {    
        fetchPokemon(count)
        setCount(count+9)
      }
    return (
      <div className="flex flex-row">
        <div className="basis-1/5"></div>
        <div className="basis-3/5">
        <h1 className="text-3xl font-bold underline">Pokedex</h1>
        {pokeList.map(function(d, idx){
        return (<li key={idx}>{d.id} {d.name}<img src={d.sprite}/></li>)
      })}      
        <button onClick={buttonHandler}>Pokemons suivants</button>
        </div>
        <div className="basis-1/5"></div>
      </div>
      

        
    )
}

export default Pokedex