import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import IsLogged from '../../components/Redirect';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
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
    character: {
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

interface UserTeamPreview{
    user: UserPreview;
    team: PokePreview[];

}
const ChoiceFight: NextPage = () => {
    const [selfTeamList,setSelfTeamList] = useState<UserTeamPreview>()
    const { user, error, isLoading } = useUser();
    const {
        query: {id}
    } = useRouter()
   
      async function getPokemonTeam(idPokemonEquipe:number) {
        const res = await fetch("http://pokefighter.hopto.org:8090/pokemons/"+idPokemonEquipe);
        return await res.json()
    
      }
      useEffect(() => {
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
  
        async function getTeam(user:UserPreview) {
          return Promise.all(user.equipe.map(pokemon => 
            getPokemonTeam(pokemon.idPokemon)
          )
          )
        }
          if(user) {
              const uuid = user?.sub?.substring(user.sub.indexOf('|')+1,user.sub.length)
              getSelf(uuid!);
          }
      }, [id, user])
  return (
    <Loading>
          <div className='flex flex-column'>
    <div className='basis-1/6 text-center'>
    <Image src={selfTeamList ? selfTeamList?.user.character.photo : 'https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png'} height={400} width={150} alt="self image"></Image><br/>
    {selfTeamList?.user.nom}
    </div>
    <div className='basis-4/6 flex flex-column text-center pt-3 pb-3 rounded'> 
    Choisissez votre Pokemon :
      
      {selfTeamList?.team?.map((pokemon:PokePreview, index) => (
        <Link key={index} passHref={true} href={"/fight/main?id="+selfTeamList.user.userId+"&spoke="+pokemon.pokeId}>
          <div  className='text-center self-center m-5 pt-3 pb-3 rounded'>
            
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom}
          </div>
          </Link>
      ))} 
      </div>
  </div>
  </Loading>
  )
}
    
export default ChoiceFight