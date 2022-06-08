import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import IsLogged from '../../components/IsLogged';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

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
    user: UserPreview;
    team: PokePreview[];

}
const VersusFight: NextPage = () => {
    const [opponentTeamList,setOpponentTeamList] = useState<UserTeamPreview>()
    const [selfTeamList,setSelfTeamList] = useState<UserTeamPreview>()
    const { user, error, isLoading } = useUser();
    const {
        query: {id}
    } = useRouter()
    async function getSelf(selfuuid:string) {
        const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getByUuid/"+selfuuid);
        const self = await response.json()
        await getSelfTeam(self);
      }
      async function getSelfTeam(user:UserPreview) {
        const userTeam =({
             user,
             team: await getTeam(user)
         }) 
           console.log(userTeam)
       setSelfTeamList(userTeam)
     }

    async function getOpponent() {
        const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/"+id);
        const opponent = await response.json()
        await getOpponentTeam(opponent);
      }
      async function getOpponentTeam(user:UserPreview) {
         const userTeam =({
              user,
              team: await getTeam(user)
          }) 
            
        setOpponentTeamList(userTeam)
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
          if(id) {
            getOpponent();
          }
          if(user) {
              const uuid = user?.sub?.substring(user.sub.indexOf('|')+1,user.sub.length)
              getSelf(uuid!);
          }
      }, [id, user])
  return (
      <IsLogged>
          <div className='flex flex-column'>
    <div className='basis-1/6'>

    </div>
    <div className='basis-5/6 flex flex-column text-center border pt-3 pb-3 rounded'>
      <div className='basis-3/6'>  
      {selfTeamList?.user.nom}
      {selfTeamList?.team?.map((pokemon:PokePreview, index) => (
    
          <div className='text-center border pt-3 pb-3 rounded'>
            
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom}
          </div>
      ))} 
      </div>
      <div className='basis-3/6'>
          {opponentTeamList?.user.nom}
      {opponentTeamList?.team?.map((pokemon:PokePreview, index) => (
    
          <div className='text-center border pt-3 pb-3 rounded'>
            
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom}
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
    
export default VersusFight