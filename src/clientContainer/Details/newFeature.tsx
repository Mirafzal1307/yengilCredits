import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./style.css"
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  ToggleButton: {
    [theme.breakpoints.up(750)]: {
      justifyContent: 'flex-end !important'
    }
  }
}))
export default function ColorToggleButton(props: any) {
  const [alignment, setAlignment] = React.useState('twelveMonth');
  const classes = useStyles()
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
      style={{ display: 'flex', justifyContent: 'flex-start' }}
      className={classes.ToggleButton}
      onChange={handleChange}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <div className='forPrice' >{alignment === 'twelveMonth' ? <>{Math.floor(props.cost * 1.44 / 12).toLocaleString()} so'm</> : null}</div>
        <div className='forPrice' >{alignment === 'nineMonth' ? <>{Math.floor(props.cost * 1.34 / 9).toLocaleString()} so'm</> : null}</div>
        <div className='forPrice' >{alignment === 'sixMonth' ? <>{Math.floor(props.cost * 1.26 / 6).toLocaleString()} so'm</> : null}</div>
      </div>
      <ToggleButton value="sixMonth"  >6 oy</ToggleButton>
      <ToggleButton value="nineMonth">9 oy </ToggleButton>
      <ToggleButton value="twelveMonth" className="css-d9c359-MuiButtonBase-root-MuiToggleButton-root.Mui-selected">12 oy</ToggleButton>
    </ToggleButtonGroup>
  );
}
