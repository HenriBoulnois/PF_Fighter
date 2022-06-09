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
        query: {selfid,id,spoke}
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
          if(id) {
            getOpponent();
          }
          if(user) {
              const uuid = user?.sub?.substring(user.sub.indexOf('|')+1,user.sub.length)
              getSelf(uuid!);
              
          }
      }, [id, user,])
      const opponentImage = () => {
        if(opponentTeamList?.user?.photo) {
          return opponentTeamList?.user?.photo
        } else {
          return "https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png"
        }
      }
  return (
    <Loading>
        <div className='flex-row'>
        <div className='text-center self-center basis-1/8'>
        Choisissez le pokemon que vous allez affronter !
        </div>
        <div className='basis-7/8'>
           
              <div>
          <div className='text-center border pt-5 rounded h-full ml-5 mr-5'>
            
            <Image src={opponentImage()} height={100} width={100} alt={opponentTeamList?.user.nom}></Image><br/>
            {opponentTeamList?.user.nom}
            <div className="grid grid-cols-3 gap-3 m-2">
            {opponentTeamList?.team.map((pokemon:PokePreview, index2) => (
              <Link key={index2} href={"/fight/winner?selfid="+selfid+"&opponentid="+opponentTeamList.user.userId+"&spoke="+spoke+"&opoke="+pokemon.pokeId} passHref={true}>
              <div>
          <div className='text-center'>
            
            <Image src={pokemon.image} height={100} width={100} alt={pokemon.nom}></Image>
            
          </div>
          </div>
          </Link>
      ))}
    </div>
        </div>
          </div>

        </div>
      </div>
    </Loading>
  ) /*(
    <Loading>
          <div className='flex flex-column'>
    <div className='basis-1/6'>

    </div>
    <div className='basis-5/6 flex flex-column text-center border pt-3 pb-3 rounded'>
      <div className='basis-3/6'>  
      {selfTeamList?.user.nom}
      {selfTeamList?.team?.map((pokemon:PokePreview, index) => (
    
          <div key={index} className='text-center border pt-3 pb-3 rounded'>
            
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom}
          </div>
      ))} 
      </div>
      <div className='basis-3/6'>
          {opponentTeamList?.user.nom}
      {opponentTeamList?.team?.map((pokemon:PokePreview, index) => (
          <Link key={index} href={"/fight/winner?opponentid="+opponentTeamList.user.userId+"&spoke=25&opoke="+pokemon.pokeId} passHref={true}>
          <div className='text-center border pt-3 pb-3 rounded'>
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom} 
          </div>
          </Link>
      ))}
      </div>
    </div>
    <div className='basis-1/6'>
    </div>
  </div>
  </Loading>
  )*/
}
    
export default VersusFight