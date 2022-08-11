import Userfront from "@userfront/react";

Userfront.init("vbqjgzjn");
const LoginForm = Userfront.build({
  toolId: "dbkalb"
})
function LogIn() {
  return (
    <LoginForm />
  )
}
export default LogIn
