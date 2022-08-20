import Userfront from "@userfront/react"

export default function Greeting(){
    return(
      <div>
        <h2 className="greetings">Welcome, {Userfront.user.name}</h2>
        <img src="/siteLogo.svg" />
      </div>
    )
}