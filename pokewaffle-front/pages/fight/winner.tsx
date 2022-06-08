import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import IsLogged from '../../components/Redirect';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Loading from '../../components/Loading';

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

interface UserPokemonPreview{
    user: UserPreview;
    pokemon: PokePreview;

}
const WinnerFight: NextPage = () => {
    const [opponentTeamList,setOpponentTeamList] = useState<UserPokemonPreview>()
    const [selfTeamList,setSelfTeamList] = useState<UserPokemonPreview>()
    const { user } = useUser();
    const {
        query: {opponentid,spoke,opoke}
    } = useRouter()
  
      

    
      
      async function getPokemon(pokemonId:any) {
        const res = await fetch("http://pokefighter.hopto.org:8090/pokemons/"+pokemonId);
        return await res.json()
      }
      
      useEffect(() => {
        async function getOpponentPokemon(user:UserPreview) {
          const userTeam =({
               user,
               pokemon: await getPokemon(opoke)
           }) 
         setOpponentTeamList(userTeam)
       }
        async function getSelfPokemon(user:UserPreview) {
          const userTeam =({
               user,
               pokemon: await getPokemon(spoke)
           }) 
         setSelfTeamList(userTeam)
       }
        async function getSelf(selfuuid:string) {
          const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getByUuid/"+selfuuid);
          const self = await response.json()
          await getSelfPokemon(self);
        }
        async function getOpponent() {
          const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/"+opponentid);
          const opponent = await response.json()
          await getOpponentPokemon(opponent);
        }
        async function getResult() {
          const res = await fetch("http://pokefighter.hopto.org:8090/combats/", {
              method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'*'
          },
              body: JSON.stringify({
                  idPokemonCombattant1: selfTeamList?.pokemon.pokeId,
                  idPokemonCombattant2: opponentTeamList?.pokemon.pokeId,
                  uuidUtilisateur1: selfTeamList?.user.uuid,
                  uuidUtilisateur2: opponentTeamList?.user.uuid,
                  idUtilisateur1: selfTeamList?.user.userId,
                  idUtilisateur2: opponentTeamList?.user.userId
              }),
          });
          console.log(res);
        }
          if(opponentid) {
            getOpponent();
          }
          if(user) {
              const uuid = user?.sub?.substring(user.sub.indexOf('|')+1,user.sub.length)
              getSelf(uuid!);
              getResult();
          }
      }, [opponentid, user, opoke, spoke, opponentTeamList?.pokemon.pokeId, opponentTeamList?.user.userId, opponentTeamList?.user.uuid, selfTeamList?.pokemon.pokeId, selfTeamList?.user.userId, selfTeamList?.user.uuid])
  return (
    <Loading>
          <div className='flex flex-column'>
    <div className='basis-1/6'>

    </div>
    <div className='basis-5/6 flex flex-column text-center border pt-3 pb-3 rounded'>
      <div className='basis-3/6'>  
      {selfTeamList?.user.nom}
          <div className='text-center border pt-3 pb-3 rounded'>
            
        
            {selfTeamList?.pokemon.nom}
          </div>
      </div>
      <div className='basis-3/6'>
          {opponentTeamList?.user.nom}
     
    
          <div className='text-center border pt-3 pb-3 rounded'>
            
            
            {opponentTeamList?.pokemon.nom}
          </div>
      </div>
    </div>
    <div className='basis-1/6'>
    </div>
  </div>
  </Loading>
  )
}
    
export default WinnerFight