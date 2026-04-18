import {useState} from "react";
type SearchBarProps =  {
    
}
export default function CustomSearchBar() {
        const [inputGoals, setInputGoals] = useState(0);
        const [inputAssists, setInputAssists] = useState(0);
        <form onSubmit={()=>{}}>
            <input type="text" value={inputGoals} placeholder="goals" onChange={(e) => setInputGoals(Number(e.target.value))}/>
            <input type="text" value={inputAssists} placeholder="assists" onChange={(e) => setInputAssists(Number(e.target.value))}/>
            <input type="submit" />
        </form>
}