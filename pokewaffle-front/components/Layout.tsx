import { NextPage } from "next";
import Footer from "./Footer";
import Header from "./Header";
import { UserProvider } from '@auth0/nextjs-auth0';

const Layout: NextPage = ({ children }) => {
    return (
        <>
        <UserProvider>
        <Header/>
            <main className="h-full">
            { children }
            </main>
            <Footer/>
            </UserProvider>   
        </>
    )
}

export default Layout