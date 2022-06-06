import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import salameche404 from "../public/salameche404.webp"

const ErrorPage: NextPage = () => {
    return (
        <div>
            <h1>Cette page n'a pas été trouvée</h1>
            <a>Vous pourrez retourner sur la page principale en suivant ce Salamèche : </a>
            <Link href="/"><Image 
                src={salameche404}
                width={200}
                height={200}/>
            </Link>    
        </div>
    )
}

export default ErrorPage
