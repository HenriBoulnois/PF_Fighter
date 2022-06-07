import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";

const LoginHeader: NextPage = () => {
    const { user, error, isLoading } = useUser();
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
   return (
       <div>
        <Button color="inherit" href="/user">User</Button>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Image src={user.picture} width={56} height={56}/>
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
        <Link href="/api/auth/logout"><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
      </Menu>
      </div>
   );
    
  }
  return <Button color="inherit" href="/api/auth/login">Login</Button>;
};

export default LoginHeader