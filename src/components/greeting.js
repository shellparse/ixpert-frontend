import Userfront from "@userfront/react"
export default function Greeting(){
    return(
      <div>
        <a href="/dashboard"><img src="/siteLogo.svg" alt="site logo"/></a>
        <h2 style={{display:'inline-block'}} className="greetings">Welcome, {Userfront.user.name}</h2>
      </div>
    )
}