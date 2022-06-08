import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import IsLogged from '../../components/IsLogged';

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
const MainFight: NextPage = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const response = await fetch("http://192.168.137.1:8090/utilisateurs");
      setUsersList(await response.json())
    }
    getUsers();
  }, [])
  return (
      <IsLogged>
          <div className='flex flex-column'>
    <div className='basis-1/6'>

    </div>
    <div className='basis-5/6 flex flex-column text-center border pt-3 pb-3 rounded'>
      <div className='basis-3/6'>
            moi
      </div>
      <div className='basis-3/6'>
      {usersList?.map((user:UserPreview, index) => (
       
          <div className='text-center border pt-3 pb-3 rounded'>
            <div className='m-5'>
            <Image src={user.photo} height={50} width={50} alt={user.nom}></Image>
            </div>
            {user.nom} {user.equipe[0]?.idPokemon}
          </div>
      ))}
      </div>
    </div>
    <div className='basis-1/6'>
      
    </div>
  </div>
      </IsLogged>
  
  )
}
    
export default MainFight