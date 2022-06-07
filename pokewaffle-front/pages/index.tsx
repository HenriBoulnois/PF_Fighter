import type { NextPage } from 'next'
import IsLogged from '../components/IsLogged'
import Login from './user'


const Home: NextPage = () => {
  return (
    <div>
      <IsLogged>
        <p>Text homepage</p>
      </IsLogged>
          
    </div>
    
  )
}

export default Home
