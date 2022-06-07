import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import Link from 'next/link';
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { Box } from '@mui/system';

const Starter: NextPage = () => {
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
      },[])
      const handleSubmit = async (event:any) => {
        event.preventDefault()
          
      const res = await fetch("http://192.168.137.1:8090/utilisateurs", {
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
      const response = await fetch("http://192.168.137.1:8090/utilisateurs/getByUuid/"+id);
          setUserApi(await response.json())
  
  }
      if(userApi) {
          return (
              <div>
                  {userApi.nom}, merci d'avoir rejoint l'aventure, tu peux maintenant choisir ton personnage ! <a href="/creation/character">Personnage</a>
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
          <p>Vous n'êtes pas encore connecté, cliquez en haut à droite pour nous rejoindre</p>
      </div>      
  )
};
export default Starter