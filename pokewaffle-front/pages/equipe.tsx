import { NextPage } from "next";
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Redirect from "../components/Redirect";
import Link from "next/link";
import Router from "next/router";

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

const Equipe: NextPage = () => {
    const [selfTeamList,setSelfTeamList] = useState<UserTeamPreview>()
    const { user, error, isLoading } = useUser();

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
      }, [user])
      async function rendreSauvage(pokeId:number) {
        console.log(pokeId)
        async function getResult() {
            const res = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/removePokemonFromEquipe/"+pokeId, {
                method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin':'*'
            },
            }); 
            return res;      
        }
        async function reloading(promise:any) {
            Router.reload()
        }
        reloading( await getResult())
    }
      
  return (
    <Redirect>
       <div className='flex flex-column'>
        <div className='basis-1/4'>

        </div>
        <div className='basis-2/4'>
        {selfTeamList?.team?.map((pokemon:PokePreview, index) => (

          <div key={index} className='flex flex-column text-center self-center m-5 pt-3 pb-3 rounded'>
            <div className="basis-1/2">
            <Image src={pokemon.image} height={200} width={200} alt={pokemon.nom}></Image><br/>
            {pokemon.nom}
            </div>
            <div className="basis-1/2 self-center">
                <div className="text-justify m-2">{pokemon.description}</div>
                <div className="m-2"><a href={"/pokemon?id="+pokemon.pokeId}>Plus d`&apos;`infos</a></div>
                <button className="m-2" onClick={() => rendreSauvage(selfTeamList.user.equipe[index].eqId)}>Bye bye {pokemon.nom}</button>
            </div>
          </div>

      ))} 
        </div>
        <div className='basis-1/4'>

        </div>
     </div>
  </Redirect>
  );
};

export default Equipe