import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ isOpen }: any): any {
  const [open, setOpen] = React.useState(true);
  // const handleOpen = (): any => setOpen(true);
  const handleClose = (): any => setOpen(false);

  // if (isOpen === 200) {
  //   return setOpen(true);
  // }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Xarid
            </Typography>
            <Button>Tugatish</Button>
            <Button>Xozir tolash</Button>
            <form method="POST" action="https://test.paycom.uz">
              <input type="hidden" name="merchant" value="{Merchant ID}" />
              <input
                type="hidden"
                name="amount"
                value="{сумма чека в ТИИНАХ}"
              />
              <input
                type="hidden"
                name="account[{field_name}]"
                value="{field_value}"
              />
              <button type="submit">
                Оплатить с помощью <b>Payme</b>
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
