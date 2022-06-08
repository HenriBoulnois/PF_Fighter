import { NextPage } from "next";
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from "react";
import Link from "next/link";
import { isGeneratorFunction } from "util/types";

const IsLogged: NextPage = ({children}) => {
  interface UserApi {
    uuid: string,
    nom: string,
    photo: string,
    email: string,
    userId: string,
    starterPokemon: number,
  }
    const { user } = useUser();
    const [userApi, setUserApi] = useState<UserApi>();
    const id = user?.sub?.substring(user.sub.indexOf('|')+1,user.sub.length)
      useEffect(() => {
        async function getUserApi() {
          const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
        }
        if(user) {
        getUserApi();
        }
      }, [user,id])
  if (user) {
      if(userApi?.starterPokemon!) {
          return (
              <div>
               {children}
              </div>
            
          ) 
        } else {
        return (
          <div>
            <p>
              Vous n&apos;avez pas encore choisi votre personnage ou votre Pokémon, êtes-vous prêt à sauter le pas ?
              Veuillez choisir votre starter : <Link href="/creation/user">CLiquer</Link>
            </p>
          </div>
          
        )
    }
      
    
  }else {
  return (
      <div>
          <p>Vous n&apos;êtes pas encore connecté, cliquez en haut à droite pour nous rejoindre</p>
      </div>      
  )
  }
};

export default IsLogged