import { NextPage } from "next";
import Footer from "./Footer";
import Header from "./Header";

const Layout: NextPage = ({ children }) => {
    return (
        <>
            <Header/>
            <main className="h-full">
            { children }
            </main>
            <Footer/>
        </>
    )
}

export default Layout