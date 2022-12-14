import Box from "@mui/material/Box/Box";
import { Typography } from "@mui/material";
import Userfront from "@userfront/react";
import { Container } from "@mui/system";

Userfront.init("vbqjgzjn");
const LoginForm = Userfront.build({
  toolId: "dbkalb"
})
function LogIn() {
  return (
    <Box>
      <LoginForm />
    <Container sx={{color: 'red'}}>
        <Typography>
          <div>this is a test deployment</div>
          <div>username: shellparse</div>
          <div>password: testmodepassword</div>
        </Typography>
      </Container>

    </Box>
  )
}
export default LogIn
