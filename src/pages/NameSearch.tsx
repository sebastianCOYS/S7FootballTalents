import Header from "../components/Header.tsx"
import PlayerListSearchName from "../components/PlayerListSearchName.tsx";
import Title from "../components/Title.tsx";
import Subtitle from "../components/Subtitle.tsx";
export default function NameSearch() {
    return (
        <>
        <Header navItems={[{itemName: "S7FT", link: "/"}]}></Header>
        <Title>Search with Name</Title>
        <Subtitle>Search for any footballer and get his statistics</Subtitle>
        <PlayerListSearchName />
        </>
    )
}