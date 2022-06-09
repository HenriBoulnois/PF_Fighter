import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import LoginHeader from "../components/LoginHeader";
import IsLogged from "../components/Redirect";
import Link from "next/link";
import Redirect from "../components/Redirect";
import Loading from "../components/Loading";

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

interface MatchesPreview {
  comId: number,
  dateCombat: string,
  idPokemon1: number,
  idPokemon2: number,
  pvPokemon1: number,
  pvPokemon2: number,
  idUtilisateur1: number,
  uuidUtilisateur1: string,
  idUtilisateur2: number,
  uuidUtilisateur2: string,
  idPokemonGagnant: number,
  nomPokemonGagnant: string,
  idUtilisateurGagnant: number
  petitePhotoGagnant: string,
  petitePhotoPerdant: string
}[]


const Profil: NextPage = () => {
    const [opponentTeamList,setOpponentTeamList] = useState<UserTeamPreview>()
    const [selfTeamList,setSelfTeamList] = useState<UserTeamPreview>()
    const [allMatches, setAllMatches] = useState<MatchesPreview[]>([])
    const [pokeList, setPokeList] = useState([]);
    const { user} = useUser();
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
              getAllMatches(uuid!)
              
          }
          async function getAllMatches(uuid:string) {
            const response = await fetch("http://pokefighter.hopto.org:8090/combats/getCombatsByUuidUtilisateur/"+uuid);
            setAllMatches(await response.json())
          }
          
      }, [id, user])
  return (
    <Loading>
          <div className='flex flex-column'>
            <div className='basis-1/6 text-center'>
              <Image src={selfTeamList ? selfTeamList?.user.character.photo : 'https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png'} height={400} width={150} alt="self image"></Image><br/>
              {selfTeamList?.user.nom}<br/>
              {selfTeamList?.user.description}
            </div>
            <div className='basis-2/6 flex flex-column text-center pt-3 pb-3 rounded'> 
              <div className="flex-row w-full">
              <div className="grid grid-cols-3 gap-3 m-2">
                {selfTeamList?.team.map((pokemon:PokePreview, index2) => (
                  <div key={index2}>
                    <div className='text-center'>
            
                      <Image src={pokemon.image} height={100} width={100} alt={pokemon.nom}></Image><br/>
                      {pokemon.nom}
                    </div>
                  </div>
                ))}
              </div>
              <Link passHref={true} href={"/equipe"}><button type="button" className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Equipe</button>
              </Link>
              </div>
            </div>
            <div className="basis-2/6 ">
              Historique des combats :<br/>
            {allMatches?.map((match:MatchesPreview, index2) => (
               <div key={index2} className='text-left pt-2'>
            
                {match.idUtilisateurGagnant==selfTeamList?.user.userId ? <p className="bg-green-100 text-green-800 text-m font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Victoire</p> : <p className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Défaite</p> } 
                <Image src={match.petitePhotoGagnant} height={100} width={100} alt=""/> <Image className="grayscale" src={match.petitePhotoPerdant} height={100} width={100} alt=""/>
                <br/>PV restant :{match.pvPokemon1>0 ? match.pvPokemon1 : match.idPokemon2}

                </div>
                ))}
            </div>
            <div className="basis-1/6">

            </div>
  </div>
  </Loading>
  )
}
export default Profil