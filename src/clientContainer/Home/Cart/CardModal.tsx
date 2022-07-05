import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
// import { postProductOrder } from "../../../Api/client/CardOrderAPI";
// import { postProductOrder } from "../../../../api/client/postProductOrder";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 2,
};

export default function TransitionsModal({ buyer_id, amount }: any): any {
  const [open, setOpen] = React.useState(true);
  // const handleOpen = (): any => setOpen(true);
  const handleClose = (): any => setOpen(false);
  const allAmount = amount * 100;
  // const getBuyerId = (): any => {
  //   const res = postProductOrder();
  //   console.log(res);
  // };

  // React.useEffect(() => {
  //   getBuyerId();
  // }, []);
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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ padding: "10px 0px 30px 0px" }}
            >
              Xarid qiluvchi {buyer_id}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                style={{
                  background: "red",
                  border: "unset",
                  fontSize: "16px",
                  padding: "9px",
                  borderRadius: "5px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <Link to="/">Tugatish</Link>
              </button>
              <form method="POST" action="https://test.paycom.uz">
                <input
                  type="hidden"
                  name="merchant"
                  value="62bddb5bf10971cd09f13323"
                />
                <input type="hidden" name="amount" value={allAmount} />
                <input
                  type="hidden"
                  name="account[{buyer_id}]"
                  value={buyer_id}
                />
                <button
                  type="submit"
                  style={{
                    background: "green",
                    border: "unset",
                    fontSize: "16px",
                    padding: "9px",
                    borderRadius: "5px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Xoziroq tolash <b>Payme</b>
                </button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
