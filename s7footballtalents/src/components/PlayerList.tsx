import {useState, useEffect} from 'react';

export default function PlayerList() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/search?gls=20&ast=3').then(res => res.json()).then(data => {
            setPlayers(data);
        });
    },[]);
    return (
        <>
        <h1>PLayers</h1>
        <div>{JSON.stringify(players, null, 2)}</div>
        </>
    )
};