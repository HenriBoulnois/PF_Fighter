import type { NextPage } from 'next'
import Redirect from '../components/Redirect'

import Login from './profil'


const Home: NextPage = () => {
  return (
    <div>
      <Redirect>
        <p>Text homepage logged</p>
      </Redirect>
          
    </div>
    
  )
}

export default Home
