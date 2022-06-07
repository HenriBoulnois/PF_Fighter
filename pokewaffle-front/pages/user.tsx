import { NextPage } from "next";
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Router from "next/router";
import LoginHeader from "../components/LoginHeader";
import IsLogged from "../components/IsLogged";

const User: NextPage = () => {
  const { user, error, isLoading } = useUser();
  return (
    <IsLogged>
      Welcome {user?.name}! <Image src={user?.picture} width={200} height={200}></Image><a href="/api/auth/logout">Logout</a>
  </IsLogged>
  );
};

export default User