import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Router from "next/router";
import LoginHeader from "../components/LoginHeader";
import IsLogged from "../components/IsLogged";
import Link from "next/link";

const Profil: NextPage = () => {
  interface UserApi {
    uuid: string,
    nom: string,
    photo: string,
    email: string,
    userId: string,
    starterPokemon: number,
  }
  const { user, error, isLoading } = useUser();
  const [userApi, setUserApi] = useState<UserApi>();
    const id = user?.sub?.substring(user.sub.indexOf('|')+1,user.sub.length)
      useEffect(() => {
        async function getUserApi() {
          const response = await fetch("http://81.254.98.117:8090/utilisateurs/getByUuid/"+id);
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
    <IsLogged>
      Welcome {userApi?.nom}! <Image src={userImage()} width={200} height={200} alt={user?.name!}></Image><Link href="/api/auth/logout">Logout</Link>
  </IsLogged>
  );
};

export default Profil