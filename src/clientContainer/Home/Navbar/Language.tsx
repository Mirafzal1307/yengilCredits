import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReactCountryFlag from "react-country-flag"
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Til tanlang">
          <IconButton
            onClick={handleClick}
            size="small"
            style={{
              padding: ' 9px 0px 9px 8px',
              background: '#ffffff',
              marginLeft: '5px',
              marginTop: '0px'
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <ReactCountryFlag
              className="emojiFlag"
              countryCode="UZ"
              style={{
                fontSize: '14px',
                lineHeight: '15px',
                marginRight: '10px'
              }}
              aria-label="United States"
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ReactCountryFlag
            className="emojiFlag"
            countryCode="UZ"
            style={{
              fontSize: '14px',
              lineHeight: '15px',
              marginRight: '10px'
            }}
            aria-label="United States"
          />Lotin O'zbek tili
        </MenuItem>
        <Divider />
        <MenuItem>
          <ReactCountryFlag
            className="emojiFlag"
            countryCode="UZ"
            style={{
              fontSize: '14px',
              lineHeight: '15px',
              marginRight: '10px'
            }}
            aria-label="United States"
          /> Kril O'zbek tili
        </MenuItem>
        <Divider />
        <MenuItem>
          <ReactCountryFlag
            className="emojiFlag"
            countryCode="RU"
            style={{
              fontSize: '14px',
              lineHeight: '15px',
              marginRight: '10px'
            }}
            aria-label="United States"
          /> Rus tili
        </MenuItem>
        <Divider />
      </Menu>
    </React.Fragment>
  );
}
