import { useUser } from '@auth0/nextjs-auth0'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Redirect from '../components/Redirect'

import Login from './profil'

interface UserPreview {
  userId: number,
  uuid: string,
  nom: string,
  description: string,
  photo: string,
  equipe: {
      eqId:number,
      idPokemon:number,
  }[],
  character: {
    photo:string
  }
}
interface PokePreview {
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

interface UserTeamPreview{
  user: UserPreview;
  team: PokePreview[];

}

interface MatchesPreview {
  comId: number,
  dateCombat: string,
  idPokemon1: number,
  idPokemon2: number,
  pvPokemon1: number,
  pvPokemon2: number,
  idUtilisateur1: number,
  uuidUtilisateur1: string,
  idUtilisateur2: number,
  uuidUtilisateur2: string,
  idPokemonGagnant: number,
  nomPokemonGagnant: string,
  idUtilisateurGagnant: number
  petitePhotoGagnant: string,
  petitPhotoPerdant: string
}[]

const Home: NextPage = () => {
   
  return (
    <div>
      <Redirect>
        Vous êtes maintenant connecté, vous pouvez accéder aux combats et à votre profil
      </Redirect>
          
    </div>
    
  )
}

export default Home
