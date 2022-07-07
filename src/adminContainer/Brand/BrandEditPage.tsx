import { Container, Tooltip, Box, FormLabel } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";

import BackUp from "./images/Group 431.svg";
import { updateBrandData, getBrand } from "../../Api/admin/AdminBrandApi";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import Notification from "../Snackbar/Notification";
import "./brand.css";

const useStyles = makeStyles({
  bigFirstBox: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    padding: "40px 40px 330px 42px",
  },
  itemBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  boxFirstTitle: {
    color: "#065374",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
  },
  boxSecondTitle: {
    color: "#464646",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
    marginLeft: "auto",
  },
  forButton: {
    padding: "9px 34px 8px 30px",
    background: "#065374",
    color: "#fff",
    borderRadius: "5px",
    fontFamily: "Poppins",
    border: "none",
  },
  forBoxInput: {
    padding: "8px 20px 9px 15px",
    marginTop: "5px",
    "&::placeholder": {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "17px",
      color: "#9F9F9F",
    },
    "&:focus": {
      outline: "none",
    },
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontWeight: 400,
    color: "#9F9F9F",
  },
  forImagePreview: {
    width: "95px",
    height: "95px",
    border: "none !important",
  },
});

function BrandEditPage(): JSX.Element {
  const [brand, setBrand] = React.useState<any>("");
  const [image, setImage] = React.useState<any>();
  const [photo, setPhoto] = React.useState<any>();
  const [preview, setPreview] = React.useState<any>();
  const { id } = useParams();
  const fileInputRef = React.useRef<any>();
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const navigate = useNavigate();
  const handleInputChange = (e: any): any => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const img = `${MINIO_FULL_ENDPOINT_FOR}/brand/${photo}`;
  const sendDataToAPI = async (): Promise<any> => {
    const form = new FormData();
    form.append(
      "brand",
      new Blob(
        [
          JSON.stringify({
            name: brand,
          }),
        ],
        {
          type: "application/json",
        },
      ),
    );
    form.append("photo", image);
    await updateBrandData(id, form)
      .then((res: any) => {
        if (res.status === 200) {
          setNotify({
            isOpen: true,
            message: "Muvaffaqiyatli tahrirlandi.",
            type: "success",
          });
          setTimeout(() => {
            navigate("/brand");
          }, 500);
        }
      })
      .catch(() => {
        setNotify({
          isOpen: true,
          message: "Xatolik yuz berdi...",
          type: "error",
        });
      });
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const getImage = async (id: any): Promise<any> => {
    const res: any = await getBrand(id);
    const img = `${MINIO_FULL_ENDPOINT_FOR}/brand/${res.data.photo_name}`;
    setBrand(res.data.name);
    setPhoto(res.data.photo_name);
    await fetch(img).then(async (response) => {
      const blob: any = await response.blob();
      const file = new File([blob], photo, { type: blob.type });
      setImage(file);
    });
  };
  useEffect(() => {
    getImage(id);
  }, []);
  const inpt = document.querySelector("input");
  const bal = inpt?.value;
  if (bal?.length === 1) {
    inpt?.classList.add("active");
  } else if (bal?.length === 2) {
    inpt?.classList.add("active");
  } else if (bal?.length === 3) {
    inpt?.classList.add("active");
  } else {
    inpt?.classList.remove("active");
  }

  return (
    <>
      <MiniDrawer />
      <Container style={{ marginTop: "50px" }}>
        <Box className={classes.bigFirstBox}>
          <Box className={classes.itemBox}>
            <h2 className={classes.boxFirstTitle}>1.Name</h2>
            <Box>
              <h2 className={classes.boxSecondTitle}>Brand name</h2>
              <input
                type="text"
                value={brand}
                className={classes.forBoxInput}
                onChange={(e) => setBrand(e?.target?.value)}
              />
            </Box>
          </Box>
          <Box className={classes.itemBox} style={{ marginTop: "15px" }}>
            <h2 className={classes.boxFirstTitle}>2.Media</h2>
            <Box style={{ marginLeft: "20px" }}>
              <h2 className={classes.boxSecondTitle}>Photo</h2>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <form style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={preview || img}
                    alt="rasm bor edi"
                    className={classes.forImagePreview}
                  />
                  <FormLabel
                    htmlFor="file-input"
                    onClick={(event) => {
                      event.preventDefault();
                      fileInputRef.current.click();
                    }}
                  >
                    <img src={BackUp} alt="dddd" />
                  </FormLabel>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </form>
              </Box>
            </Box>
          </Box>
          <Tooltip title="Saqlash">
            <button
              type="button"
              className={classes.forButton}
              style={{ marginLeft: "auto", display: "flex" }}
              onClick={sendDataToAPI}
            >
              Saqlash
            </button>
          </Tooltip>
        </Box>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
    </>
  );
}

export default BrandEditPage;
