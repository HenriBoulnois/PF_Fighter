import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const Starter: NextPage = () => {
  interface UserApi {
    uuid: string,
    nom: string,
    photo: string,
    email: string,
    userId: string,
    starterPokemon: number,
  }
  const { user } = useUser();
  const id = user?.sub?.substring(user.sub?.indexOf('|')+1,user.sub?.length)
    
    
    const [userApi, setUserApi] = useState<UserApi>();
      
      useEffect(() => {
        async function getUserApi() {
          const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
        }
        getUserApi();
      },[user,id])
  if (user) {
  
      
      const handleSubmit = async (event:any) => {
        event.preventDefault()
          
      const res = await fetch("http://pokefighter.hopto.org:8090/utilisateurs", {
          method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin':'*'
      },
          body: JSON.stringify({
              nom: event.target.nom.value,
          description: event.target.description.value,
          uuid: id
          }),
      });
      const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
  
  }
      if(userApi) {
          return (
            <div className='flex flex-column'>
             <div className='basis-1/4'>

             </div>
             <div className='basis-3/4 flex-row text-center border pt-3 pb-3 rounded'>
                <div className='mb-5'>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">{userApi.nom}</span>, merci d&apos;avoir rejoint l&apos;aventure, tu peux maintenant choisir ton personnage ! 
                </div>
                <div>
                  <Link href="/creation/character"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Personnage</button></Link>
                </div>
              </div>

              <div className='basis-1/4'>
              </div>

    </div>
            
          ) 
        } else {
        return (
          <div className="flex flex-column">
            <div className='basis-2/5'>
            </div>
            <div className='basis-1/5'>

     
              <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first">Pseudo</label><br/>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="nom" name="nom" required /><br/>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last">Description</label><br/>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="description" name="description" required /><br/>
                </div>
                <div className="flex items-center justify-between">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Créer</button>
                </div>
            </form>
            </div>
            <div className='basis-2/5'>
            </div>
            </div>
          
        )
    }
    
      
    
  }
  return (
      <div>
          <p>Vous n&apos;êtes pas encore connecté, cliquez en haut à droite pour nous rejoindre</p>
      </div>      
  )
};
export default Starter