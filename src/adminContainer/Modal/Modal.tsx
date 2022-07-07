import { Box, Button, Tooltip } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { makeStyles } from "@mui/styles";
import del from "../.././Images/delete.png";
import { refresh } from "./refresh";
import { useNavigate } from "react-router-dom";
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(6, 83, 116, 0.3);
`;
const style = {
  width: 600,
  bgcolor: "#ffffff !important",
  borderRadius: "10px",
  p: 2,
  px: 4,
  pb: 3,
};
const useStyles = makeStyles({
  editButton: {
    background: "transparent",
    padding: 0,
    border: "none",
    cursor: "pointer",
  },
  titleRows: {
    color: "#065374 !important",
    fontFamily: "Poppins !important",
    fontWeight: "600 !important",
    fontSize: "17px !important",
    margin: 0,
    paddingTop: "0 !important",
  },
  forValueCols: {
    color: "#000 !important",
    fontSize: "17px !important",
    fontFamily: "Poppins !important",
    fontWeight: "300 !important",
    margin: 0,
  },
  brandImages: {
    width: "50px !important",
    height: "50px !important",
    borderRadius: "5px !important",
  },

  box: {
    textAlign: "center",
  },
  h1: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "22px",
    color: "#065374",
  },
  deleteButton: {
    border: "none !important",
    background: "transparent !important",
    cursor: "pointer",
    marginTop: "4px !important",
  },
  cancel: {
    background: "#065374 !important",
    borderRadius: "5px",
    color: "#ffffff !important",
    textTransform: "lowercase",
    marginRight: "20px",
    padding: "9px 20px 8px 20px !important",
  },
  deletes: {
    background: "#FF4B4B !important",
    borderRadius: "5px",
    color: "#ffffff !important",
    textTransform: "lowercase",
    margin: "0 0 0 20px !important",
    padding: "9px 20px 8px 20px !important",
  },
  h2: {
    fontSize: "17px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000000",
  },
});

const Modal = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Tooltip title="Delete">
        <button
          type="button"
          onClick={handleOpen}
          className={classes.deleteButton}
        >
          <img src={del} alt="rasm bor edi" />
        </button>
      </Tooltip>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style} className={classes.box}>
          <h1 className={classes.h1}>Diqqat!</h1>
          <h2 id="unstyled-modal-title" className={classes.h2}>
            Siz rostdan ham o’chirmoqchimisiz?
          </h2>
          <div>
            <Button onClick={handleClose} className={classes.cancel}>
              Bekor qilish
            </Button>
            <Button
              onClick={() => {
                handleClose();
                props.data();
                refresh();
              }}
              className={classes.deletes}
            >
              O'chirish
            </Button>
          </div>
        </Box>
      </StyledModal>
    </React.Fragment>
  );
};

export default Modal;
