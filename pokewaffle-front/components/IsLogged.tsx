import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Router from "next/router";
import LoginHeader from "../components/LoginHeader";

const IsLogged: NextPage = ({children}) => {
    const { user, error, isLoading } = useUser();
  if (user) {
    const id = user.sub!.substring(user.sub!.indexOf('|')+1,user.sub!.length)
    interface UserApi {
        uuid: string,
        nom: string,
        photo: string,
        email: string,
        userId: string,
        starterPokemon: number,
      }
      const [userApi, setUserApi] = useState<UserApi>();
      useEffect(() => {
        async function getUserApi() {
          const response = await fetch("http://192.168.137.1:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
        }
        getUserApi();
      }, [])
      if(userApi?.starterPokemon) {
          return (
              <div>
               {children}
              </div>
            
          ) 
        } else {
        return (
          <div>
            <p>
              Veuillez choisir votre starter : <a href="/starter">CLiquer</a>
            </p>
          </div>
          
        )
    }
      
    
  }
  return (
      <div>
          <p>Veuillez vous connecter</p>
      </div>      
  )
};

export default IsLogged