import type { NextPage } from 'next'
import IsLogged from '../components/IsLogged'
import Login from './profil'


const Home: NextPage = () => {
  return (
    <div>
      <IsLogged>
        <p>Text homepage logged</p>
      </IsLogged>
          
    </div>
    
  )
}

export default Home
