import { Box } from "@mui/material";


export default     function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Box sx={{padding: 2, backgroundColor:'#FFE0E0'}}
        className='tabPanel'
        role="tabpanel"
        hidden={value !== index}
        {...other}
      >
        {value === index && (
          children
        )}
      </Box>
    )
  }
