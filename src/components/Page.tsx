import { useContext } from 'react'
import '../css/Page.css'
import BottomControls from './BottomControls'
import Grid from './Grid'
import NewGameButton from './NewGameButton'
import Score from './Score'
import { GameContext } from '../contexts/GameContext'

const Page = () => {
  const [{ status }] = useContext(GameContext)
  return (
    <div id="page">
      <div>
        <NewGameButton />
      </div>
      <Score />
      <Grid />
      <BottomControls />
      {status === 'won' && <div>You won!</div>}
      {status === 'lost' && <div>You lost!</div>}
    </div>
  )
}

export default Page
