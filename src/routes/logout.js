import Userfront from "@userfront/react";

Userfront.init("vbqjgzjn");

const LogoutButton = Userfront.build({
  toolId: "rdanrl"
});
function LogOut(){
    return(
        <LogoutButton />
    )
}


export default LogOut