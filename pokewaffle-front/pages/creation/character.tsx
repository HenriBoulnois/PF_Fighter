import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';


const Character: NextPage = () => {
  const { user } = useUser();
  interface CharacterPreview {
    charId:number,
    nom:string,
    photo:string,
    description:string
  }
  
  const [characterList, setCharacterList] = useState([]);
  const [characterFocused, setCharacterFocused] = useState<CharacterPreview>();

  const id = user?.sub?.substring(user.sub?.indexOf('|')+1,user.sub?.length)
  useEffect(() => {
    async function getcharacterFocuseds() {
      const response = await fetch("http://pokefighter.hopto.org:8090/utilisateurs/getCharacters");
      setCharacterList(await response.json())
    }
    getcharacterFocuseds();
  }, [])
  function focusCharacter(characterFocused:CharacterPreview) {
    setCharacterFocused(characterFocused)
  }
  async function choseCharacter(idPersonnage:number) {
    await fetch("http://pokefighter.hopto.org:8090/utilisateurs/setCharacter", {
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    },
        body: JSON.stringify({
            uuidUtilisateur: id,
            idCharacter: idPersonnage
        }),
    });
     Router.push("/creation/starter");  
    
}
if(characterFocused) {
  return(
    <div className='flex flex-column'>
    <div className='basis-1/4'>

    </div>
    <div className='basis-3/4 flex-row border pt-3 pb-3 rounded'>
    <div className='text-xl font-bold text-center'>
        
        <button color="success" onClick={() => choseCharacter(characterFocused.charId)}>
          Je choisis {characterFocused.nom}
          </button>
      </div>
      <div className='flex flex-column text-center'>
        
        <div className='basis-2/4'>
          <Image src={characterFocused.photo} height={631} width={245} alt="characterFocusedPhoto"/>
        </div>
        <div className='basis-2/4 text-left m-5'>
          <p className='font-bold'>Description</p><br/>{characterFocused.description}
        </div>
        
      </div>

    </div>
    <div className='basis-1/4'>
      
    </div>
  </div>
  )
} 
return (
  <div className='flex flex-column'>
    <div className='basis-1/4'>

  </div>
  <div className="grid grid-cols-2 gap-2 m-10 basis-2/4">
      {characterList.map((character:CharacterPreview, index) => (
          <div key={index} className='text-center border pt-3 pb-3 rounded'>
          <button onClick={() => focusCharacter(character)}>
        {character.nom}
      </button><br/>
            <Image src={character?.photo} height={315} width={123} alt={character.nom}></Image><br/>
            {character.nom}
          </div>
      ))}
    </div>
    <div className='basis-1/4'>

    </div>
    </div>
)  
}
    
export default Character