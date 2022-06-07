import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import Link from 'next/link';
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { Box } from '@mui/system';

const Starter: NextPage = () => {
  interface UserApi {
    uuid: string,
    nom: string,
    photo: string,
    email: string,
    userId: string,
    starterPokemon: number,
  }
  const { user, error, isLoading } = useUser();
  const id = user?.sub?.substring(user.sub?.indexOf('|')+1,user.sub?.length)
    
    
    const [userApi, setUserApi] = useState<UserApi>();
      
      useEffect(() => {
        async function getUserApi() {
          const response = await fetch("http://81.254.98.117:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
        }
        getUserApi();
      },[user,id])
  if (user) {
  
      
      const handleSubmit = async (event:any) => {
        event.preventDefault()
          
      const res = await fetch("http://81.254.98.117:8090/utilisateurs", {
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
      const response = await fetch("http://81.254.98.117:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
  
  }
      if(userApi) {
          return (
              <div>
                  {userApi.nom}, merci d&apos;avoir rejoint l&apos;aventure, tu peux maintenant choisir ton personnage ! <Link href="/creation/character">Personnage</Link>
              </div>
            
          ) 
        } else {
        return (
            <div>     
            <form className='pt-15' onSubmit={handleSubmit}>
              <label htmlFor="first">Pseudo</label><br/>
              <input type="text" id="nom" name="nom" required /><br/>
        
              <label htmlFor="last">Description</label><br/>
              <input type="text" id="description" name="description" required /><br/>
        
              <button type="submit">Submit</button>
            </form>
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