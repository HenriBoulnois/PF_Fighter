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
    }[],
    character:{
      photo:string
    }
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
interface ResultPreview {
  pvPokemon1:number,
  pvPokemon2:number,
  idPokemonGagnant:number,
  idUtilisateurGagnant: number,
  nomPokemonGagnant:string
}
const WinnerFight: NextPage = () => {
    const [opponentTeamList,setOpponentTeamList] = useState<UserPokemonPreview>()
    const [selfTeamList,setSelfTeamList] = useState<UserPokemonPreview>()
    const [result,setResult] = useState<ResultPreview>()
    const { user } = useUser();
    const {
        query: {selfid,opponentid,spoke,opoke}
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
          setResult(await res.json())
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
    <div className='basis-5/6 flex-row text-center border pt-3 pb-3 rounded'>
      <div className='basis-1/6'>
        {result?.idUtilisateurGagnant ? result.idUtilisateurGagnant==selfTeamList?.user.userId ? <div>{selfTeamList.user.nom} a gagné !</div> : <div>{selfTeamList?.user.nom} a gagné !</div>: <div></div>} 
        Félicitations {result?.nomPokemonGagnant} 
        </div>
      <div className='basis-5/6 flex flex-column '>
      <div className='basis-3/6'>  
      <Image src={selfTeamList ? selfTeamList.user.character.photo : 'https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png'} alt="image self" width={150} height={400}/>
      <Image src={selfTeamList ? selfTeamList.pokemon.image : 'https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png'} alt="image pokemon opposant" width={200} height={200}/>
      <br/>{selfTeamList?.user.nom}
      {
        result?.pvPokemon1 ? result!.pvPokemon1>0 ? <div className='bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900'>{result.pvPokemon1}</div> : <div className='bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'>{result.pvPokemon1}</div> : <div></div>
      }
      </div>
      <div className='basis-3/6'>
        
      <Image src={opponentTeamList?.user.character ? opponentTeamList.user.character.photo : 'https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png'} alt="image opposant" width={150} height={400}/>
            <Image src={opponentTeamList ? opponentTeamList.pokemon.image : 'https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png'} alt="image pokemon opposant" width={200} height={200}/>
            <br/>{opponentTeamList?.user.nom}
            {
        result?.pvPokemon2 ? result!.pvPokemon2>0 ? <div className='bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900'>{result.pvPokemon2}</div> : <div className='bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'>{result.pvPokemon2}</div> : <div></div>
      }
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