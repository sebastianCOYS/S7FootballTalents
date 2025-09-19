import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PlayerList from './components/PlayerList'
import PlayerProfile from './components/PlayerProfile'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
export default function App() {
  const [count, setCount] = useState(1);
  const [clickedPlayer, setClickedPlayer] = useState<number | null>(null);
  return (
    <>
      {clickedPlayer ? <PlayerProfile/> : <PlayerList/>}
      
    </>
  )
}

