import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import salameche404 from "../public/salameche404.webp"

const ErrorPage: NextPage = () => {
    return (
        <div className="text-center bottom-0 absolute pt-5">
            <h1>Cette page n&apos;a pas été trouvée</h1>
            <a>Vous pourrez retourner sur la page principale en suivant ce Salamèche : </a><br/>
            <Link href="/"><Image 
                src={salameche404}
                width={200}
                height={200}
                alt="errorpagesalameche"/>
            </Link>    
        </div>
    )
}

export default ErrorPage
