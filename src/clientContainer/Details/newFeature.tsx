import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./style.css"
export default function ColorToggleButton(props:any) {
  const [alignment, setAlignment] = React.useState('twelveMonth');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="sixMonth" className="css-d9c359-MuiButtonBase-root-MuiToggleButton-root.Mui-selected" >6 oy</ToggleButton>
      <ToggleButton value="nineMonth">9 oy </ToggleButton>
      <ToggleButton value="twelveMonth">12 oy</ToggleButton>
      <div style={{paddingTop: "10px"}} >{alignment === 'twelveMonth'? props.cost * 1.44 / 12 : null}</div>
      <div style={{paddingTop: "10px"}} >{alignment === 'nineMonth'? props.cost * 1.34 / 12 : null}</div>
      <div style={{paddingTop: "10px"}} >{alignment === 'sixMonth'? props.cost * 1.26 / 12 : null}</div>
    </ToggleButtonGroup>
  );
}
