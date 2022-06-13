import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, OutlinedInput } from "@mui/material";
import { postProductCharacterCreate } from "../../Api/admin/AdminProductApi";
import Notification from "../Snackbar/Notification";
import { refresh } from "../Modal/refresh";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid rgb(110 110 110)",
  boxShadow: 8,
  borderRadius: "5px",
  padding: "30px",
};

const divStyle = {
  display: "flex",
  justifyContent: "space-around",
  margin: "40px 3px 1px 3px",
};

const button = {
  alignSelf: "center",
  marginTop: "5px",
  marginLeft: "10px",
  fontFamily: "Poppins",
  border: "2px solid #9f9f9f",
  padding: "15px 5px",
  color: "#48914a",
};

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [characterName, setCharacterName] = React.useState<any>(null);
  const [propertyName, setPropertyName] = React.useState<any>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  function onSubmit() {
    const data = [{ name: characterName, value: propertyName }];
    try {
      postProductCharacterCreate(data)
        .then(async (res: any) => {
          if (res.status === 200) {
            setNotify({
              isOpen: true,
              message: "Muvaffaqiyatli qo'shildi.",
              type: "success",
            });
          }
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: "Xatolik yuz berdi...",
            type: "error",
          });
        });
    } catch (err) {
      setNotify({
        isOpen: true,
        message: "Xatolik...",
        type: "error",
      });
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} style={button}>
        <CreateNewFolderIcon style={{ color: 'green' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Siz bu yerda yangi xossa nomi va qiymati
            qo'shishingiz mumkin!
          </Typography>
          <div style={divStyle}>
            <FormControl sx={{ width: "25ch" }}>
              <OutlinedInput
                placeholder="Xossa nomi..."
                type="text"
                onChange={(e) => setCharacterName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl sx={{ width: "25ch" }}>
              <OutlinedInput
                placeholder="Xossa qiymati..."
                type="text"
                onChange={(e) => setPropertyName(e.target.value)}
                required
              />
            </FormControl>
          </div>
          <div style={divStyle}>
            <Button onClick={() => setOpen(false)} 
            sx={{
              textTransform: 'capitalize',
              background: "#FF4B4B",
              color: 'white',
              '&:hover':{
                background: "#FF4B4B",
              }
            }} >Bekor qilish</Button>
            <Button onClick={() => {
              onSubmit();
              handleClose();
              refresh();
            }}
            sx={{
              textTransform: 'capitalize',
              background: "#065374",
              color: 'white',
              '&:hover':{
                background: "#065374",
              }
            }}
            type="submit"
            >Saqlash</Button>
          </div>
        </Box>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />

    </div>
  );
}

export default BasicModal;
