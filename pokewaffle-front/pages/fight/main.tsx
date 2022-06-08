import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import IsLogged from '../../components/IsLogged';

interface UserPreview {
    userId: number,
    uuid: string,
    nom: string,
    description: string,
    photo: string,
    equipe: {
        eqId:number,
        idPokemon:number,
    }[]
}
interface PokePreview {
  pokeId: number
  nom: string,
  description: string
  image: string,
  taille: number,
  poids: number,
  petiteImage: string,
  type: {
    typeId:number,
    nom:string
  }[]
  pv:number,
  attaque:number,
  defense:number,
  vitesse:number,
}
interface UserTeamPreview{
    team: PokePreview[];
    userId: number;
    uuid: string;
    nom: string;
    description: string;
    photo: string;
    equipe: {
        eqId: number;
        idPokemon: number;
    }[];

}

const MainFight: NextPage = () => {
  const [usersTeamList, setUsersTeamList] = useState<UserTeamPreview[]>([])
  async function getUsers() {
    const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs");
    const listUsers = await response.json()
    await getEachEquipe(listUsers);
  }
  async function getEachEquipe(listUsers:UserPreview[]) {
    const listEquipe = await Promise.all(
      listUsers.map(async (user) => ({
        ...user,
        team: await getTeam(user)
      })
      )
    )
    console.log(listEquipe)
    setUsersTeamList(listEquipe)
  }
  async function getTeam(user:UserPreview) {
    return Promise.all(user.equipe.map(pokemon => 
      getPokemonTeam(pokemon.idPokemon)
    )
    )
  }
  async function getPokemonTeam(idPokemonEquipe:number) {
    const res = await fetch("http://pokefighter.hopto.org:8090/pokemons/"+idPokemonEquipe);
    return await res.json()

  }
  useEffect(() => {
    getUsers();
  }, [])
  return (
      <IsLogged>
          <div className='flex flex-column'>
    <div className='basis-1/6'>

    </div>
    <div className='basis-5/6 flex flex-column text-center border pt-3 pb-3 rounded'>
      <div className='basis-3/6'>   
      moi
      </div>
      <div className='basis-3/6'>
      {usersTeamList.map((user) => (
          <div className='text-center border pt-3 pb-3 rounded'>
            
            <Image src={user.photo} height={30} width={30} alt={user.nom}></Image><br/>
            {user.nom}
            {user.team.map((pokemon => (
              <div>
              <Image src={pokemon.petiteImage} height={50} width={50} alt={pokemon.nom}></Image><br/>
              {pokemon.nom}
              </div>
            )))}
          </div>
      ))}
      </div>
    </div>
    <div className='basis-1/6'>
    </div>
  </div>
      </IsLogged>
  
  )
}
    
export default MainFight