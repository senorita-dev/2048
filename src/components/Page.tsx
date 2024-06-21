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
      {status === 'ongoing' && <br />}
      {status === 'won' && <b>You won! Play again?</b>}
      {status === 'lost' && <b>You lost! Try again?</b>}
      <div>
        <NewGameButton />
      </div>
      <Score />
      <Grid />
      <BottomControls />
    </div>
  )
}

export default Page
