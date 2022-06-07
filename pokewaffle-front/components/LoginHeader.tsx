import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
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
          const response = await fetch("http://81.254.98.117:8090/utilisateurs/getByUuid/"+id);
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
      if(userApi) {
        console.log(userApi)
        return userApi.photo
      } else {
        return "https://www.breakflip.com/uploads/Pok%C3%A9mon/Artwork/179.png"
      }
    }
   return (
       <div>
        <Button color="inherit" href="/profil">Profil</Button>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Image src={userImage()} width={56} height={56} alt={""}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Link href="/api/auth/logout" passHref={true}><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
      </Menu>
      </div>
   );
    
  }
  return <Button color="inherit" href="/api/auth/login">Login</Button>;
};

export default LoginHeader