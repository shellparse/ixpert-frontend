

export default     function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        className='tabPanel'
        role="tabpanel"
        hidden={value !== index}
        {...other}
      >
        {value === index && (
          children
        )}
      </div>
    )
  }
