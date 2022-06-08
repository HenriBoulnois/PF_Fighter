import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import salameche404 from "../public/salameche404.webp"

const ErrorPage: NextPage = () => {
    return (
    <div className='flex flex-column'>
    <div className='basis-1/4'>

    </div>
    <div className='basis-3/4 flex-row text-center border pt-3 pb-3 rounded'>
    <h1>Cette page n&apos;a pas été trouvée</h1>
            <a>Vous pourrez retourner sur la page principale en suivant ce Salamèche : </a><br/>
            <Link href="/"><Image 
                src={salameche404}
                width={200}
                height={200}
                alt="errorpagesalameche"/>
            </Link>    
    </div>
    <div className='basis-1/4'>
      
    </div>
  </div>
    )
}

export default ErrorPage
