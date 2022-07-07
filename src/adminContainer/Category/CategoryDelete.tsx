import * as React from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import deletePhoto from "../../Images/delete.png";

const useStyles = makeStyles({
  box: {
    textAlign: "center",
  },
  h1: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "22px",
    color: "#065374",
    fontFamily: "Poppins !important"
  },
  deleteButton: {
    border: "none !important",
    background: "transparent !important",
  },
  cancel: {
    background: "#FF4B4B!important",
    borderRadius: "5px",
    color: "#ffffff !important",
    marginRight: "20px",
    padding: "9px 20px 8px 20px !important",
    fontFamily: "Poppins !important"
  },
  deletes: {
    background: "#065374 !important",
    borderRadius: "5px",
    color: "#ffffff !important",
    margin: "0 0 0 20px !important",
    padding: "9px 20px 8px 20px !important",
    fontFamily: "Poppins !important"
  },
  h2: {
    fontSize: "17px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000000",
    fontFamily: "Poppins !important"
  },
});

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

export default function ModalUnstyledDemo() {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleOpen = () => setDeleteOpen(true);
  const handleClose = () => setDeleteOpen(false);
  const classes = useStyles();

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        className={classes.deleteButton}
      >
        <img src={deletePhoto} alt="rasm bor edi" />
      </button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={deleteOpen}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style} className={classes.box}>
          <h1 className={classes.h1}>Diqqat !</h1>
          <h2 id="unstyled-modal-title" className={classes.h2}>
            Siz rostdanham quyidagi turkumni o’chirmoqchimisiz
          </h2>
          <div>
            <Button onClick={handleClose} className={classes.cancel}>
              Bekor qilish
            </Button>
            <Button onClick={handleClose} className={classes.deletes}>
              O'chirish
            </Button>
          </div>
        </Box>
      </StyledModal>
    </div>
  );
}
