import { NextPage } from "next";
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from "react";
import Link from "next/link";
import { isGeneratorFunction } from "util/types";

const Redirect: NextPage = ({children}) => {
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
              Vous n&apos;avez pas encore choisi votre personnage ou votre Pokémon, êtes-vous prêt à sauter le pas ?<br/>
              <Link passHref={true} href="/creation/user"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cliquer sur ce bouton pour vous créer un dresseur</button></Link>
            </p>
          </div>
          
        )
    }
      
    
  }else {
  return (
      <div>
          <p>Vous n&apos;êtes pas encore connecté, cliquez en haut à droite pour nous rejoindre.</p>
          <p>Vous pouvez tout de même accéder au Pokedex</p>
      </div>      
  )
  }
};

export default Redirect