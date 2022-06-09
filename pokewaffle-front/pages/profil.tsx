import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Router from "next/router";
import LoginHeader from "../components/LoginHeader";
import IsLogged from "../components/Redirect";
import Link from "next/link";
import Redirect from "../components/Redirect";

const Profil: NextPage = () => {
  interface UserApi {
    uuid: string,
    nom: string,
    photo: string,
    email: string,
    userId: string,
    starterPokemon: number,
    description: string,
    character:{
      photo: string,
    }
  }
  interface PokeStarter {
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

  
  

  
  const { user, error, isLoading } = useUser();
  const [userApi, setUserApi] = useState<UserApi>();
  const [pokeStarter, setPokeStarter] = useState<PokeStarter>();

    const id = user?.sub?.substring(user.sub.indexOf('|')+1,user.sub.length)
      useEffect(() => {
        async function getUserApi() {
          const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
        }
        getUserApi();
      }, [user,id])
      const userImage = () => {
        if(userApi) {
          console.log(userApi)
          return userApi.photo
        } else {
          return "https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png"
        }
      }
  return (
    <Redirect>
       <div className='flex flex-column'>
       <div className='basis-1/4'></div>

       <div className='basis-2/4 flex-row text-center border pt-3 pb-3 rounded'>
        <div className='basis-2/4'>
          <Image src={userImage()} height={200} width={200} alt="Image de profil"/>
        </div>
        <div className="text-xl font-bold">
          {userApi?.nom}
        </div>
        <div className='font-bold'>
          {userApi?.description}
        </div>
      </div>
      <div className='basis-1/4'></div>
     </div>
  </Redirect>
  );
};

export default Profil