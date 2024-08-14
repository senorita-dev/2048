import '../css/Page.css'
import BottomControls from './BottomControls'
import Grid from './Grid'
import NewGameButton from './NewGameButton'
import Score from './Score'
import { useGameDispatch, useGameState } from '../contexts/GameContext'

const Page = () => {
  const { status } = useGameState()
  const setGameStatus = useGameDispatch()
  return (
    <div id="page">
      {status === 'ongoing' && <br />}
      {status === 'continuedWonGame' && <br />}
      {status === 'won' && (
        <b>
          You won!{' '}
          <a id="continue" onClick={() => setGameStatus('continueWonGame')}>
            continue?
          </a>
        </b>
      )}
      {status === 'lost' && (
        <b>
          You lost!{' '}
          <a id="try-again" onClick={() => setGameStatus('newGame')}>
            Try again?
          </a>
        </b>
      )}
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
