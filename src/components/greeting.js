import Userfront from "@userfront/react"
export default function Greeting() {
    return (
        <h4 style={{ display: 'inline-block' }} className="greetings">Welcome, {Userfront.user.name}</h4>
    )
}