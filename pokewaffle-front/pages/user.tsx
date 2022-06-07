import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useEffect, useState } from "react";

const User: NextPage = () => {
    const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
                {userApi?.starterPokemon}
              Welcome {user.sub?.substring(user.sub?.indexOf('|')+1,user.sub?.length)}! <img src={user.picture}></img><a href="/api/auth/logout">Logout</a>
            </div>
          );
      } else {
          return (
          <div>
              Select a starter
              {userApi?.starterPokemon}
              {JSON.stringify(userApi)}
              <a href="/api/auth/logout">Logout</a>
          </div>
          )
      }
    
  }

  return <a href="/api/auth/login">Login</a>;
};

export default User