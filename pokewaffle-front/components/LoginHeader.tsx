import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import Link from "next/link";

const LoginHeader: NextPage = () => {
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
          const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
        }
        getUserApi();
      }, [user,id])
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    
    const userImage = () => {
      if(userApi?.photo) {
        return userApi?.photo
      } else {
        return "https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png"
      }
    }
   return (
    <div className="text-white basis-1/4 self-center text-center max-h-fit flex flex-row">
      <div className="self-center m-2 ">
        <p>Dresseur  </p>
      {userApi?.nom}
      </div>
      <div>
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img alt="" className="object-contain h-20 w-20" src={userImage()}/>
      </div>
      <Link href="/profil">
      <a className="text-white rounded-full self-center bg-sky-700 hover:bg-sky-800 p-5 m-1">Profil</a>
      </Link>
      <div className="self-center">
        <Link href="/api/auth/logout">
      <a className="text-white rounded-full selft-center bg-sky-700 hover:bg-sky-800 p-5 m-1">Logout</a>
      </Link>
      </div>
    </div>
   )
    
  } else {
  return ( 
    <div className="basis-1/4 self-center text-center">
      <Link href="/api/auth/login">
      <a className="text-white rounded-full bg-sky-700 hover:bg-sky-800 p-5">Login</a>
      </Link>
    </div>
  )//<Button color="inherit" href="/api/auth/login">Login</Button>;
  }};

export default LoginHeader