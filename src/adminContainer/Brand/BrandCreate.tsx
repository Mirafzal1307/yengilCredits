import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, FormLabel, Tooltip } from "@mui/material";

import { createTheme } from "@mui/material/styles";
import {
  getAllBrandData,
  createBrandData,
} from "../../Api/admin/AdminBrandApi";
import BackUp from "./images/Group 429.svg";
import Notification from "../Snackbar/Notification";
import { refresh } from "../Modal/refresh";
import "./brand.css";

const theme = createTheme();

const useStyles = makeStyles({
  bigFirstBox: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    padding: "40px 40px 60px 42px",
  },
  itemBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  boxFirstTitle: {
    color: "#065374",
    fontFamily: "Arial",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
  },
  boxSecondTitle: {
    color: "#464646",
    fontFamily: "Arial",
    fontWeight: 600,
    fontSize: "17px",
    margin: 0,
    marginLeft: "auto",
  },
  forBoxInput: {
    padding: "8px 20px 9px 15px",
    color: "black",
    marginTop: "5px",
    "&::placeholder": {
      fontFamily: "Arial",
      fontWeight: 400,
      fontSize: "17px",
      color: "#9F9F9F",
    },
    "&:focus": {
      outline: "none",
    },
    borderRadius: "5px",
    fontFamily: "Arial",
    fontWeight: 400,
  },
  forButton: {
    padding: "9px 34px 8px 30px",
    background: "#065374",
    color: "#fff",
    borderRadius: "5px",
    fontFamily: "Arial",
    border: "none",
  },
  inBox: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  forImagePreview: {
    width: "95px",
    height: "95px",
    border: "none !important",
  },
});

interface Data {
  brand: any;
  photo_name: string;
  products_count: number;
}

function BrandCreate(): JSX.Element {
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [brand, setBrand] = React.useState<any>({});
  const [data, setData] = React.useState<Data[]>([]);
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });

  const inp = document.querySelector("input");
  const bal = inp?.value;
  if (bal?.length === 1) {
    inp?.classList.add("active");
  } else if (bal?.length === 2) {
    inp?.classList.add("active");
  } else if (bal?.length === 3) {
    inp?.classList.add("active");
  } else {
    inp?.classList.remove("active");
    inp?.classList.add("noactive");
  }
  const fileInputRef = useRef<any>();
  const classes = useStyles();
  const handleInputChange = (e: any): void => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const getAllBrandDatas = async (): Promise<void> => {
    const response: any = await getAllBrandData();
    setData(response.data);
  };

  function onSubmit(): any {
    const form = new FormData();
    form.append("photo", image);
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

    try {
      createBrandData(form)
        .then(async (res: any) => {
          if (res.status === 200) {
            setNotify({
              isOpen: true,
              message: "Создан успешно.",
              type: "success",
            });
            refresh();
          }
          return getAllBrandDatas();
        })
        .catch(() => {
          setNotify({
            isOpen: true,
            message: "Что-то пошло не так.",
            type: "error",
          });
        });
    } catch (err) {
      setNotify({
        isOpen: true,
        message: "Что-то пошло не так.",
        type: "error",
      });
    }
  }
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

  return (
    <>
      <Box className={classes.bigFirstBox}>
        <Box className={classes.itemBox}>
          <h2 className={classes.boxFirstTitle}>1.Название</h2>
          <Box>
            <h2 className={classes.boxSecondTitle}>Название бренда.</h2>
            <input
              style={{ borderColor: "#9F9F9F" }}
              type="text"
              name="brand"
              placeholder="Название бренда"
              className={classes.forBoxInput}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={classes.itemBox} style={{ marginTop: "15px" }}>
          <h2 className={classes.boxFirstTitle}>2.Медиа</h2>
          <Box style={{ marginLeft: "20px" }}>
            <h2 className={classes.boxSecondTitle}>Фото</h2>
            <form style={{ display: "flex", alignItems: "center" }}>
              <img
                src={preview}
                style={{ display: preview ? "block" : "none" }}
                className={classes.forImagePreview}
                alt="img"
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
        <Tooltip title="Сохранить">
          <button
            type="button"
            className={classes.forButton}
            onClick={() => {
              onSubmit();
            }}
            style={{ marginLeft: "auto", display: "flex" }}
          >
            Сохранить
          </button>
        </Tooltip>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default BrandCreate;
