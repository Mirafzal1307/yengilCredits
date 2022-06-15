import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import {
  postCategoryCreate,
  getCategoryListCreate,
} from "../../Api/admin/AdminCategoryApi";
import { refresh } from "../Modal/refresh";
import Notification from "../Snackbar/Notification";
import './style.css'
const useStyles = makeStyles({
  input_one: {
    width: "100% !important",
    background: "#FFFFFF !important",
    boxShadow: "0px 0px 10px rgb(0 0 0 / 25%) !important",
    borderRadius: "5px !important",
    padding: "40px 20px 480px 20px !important",
  },
  input_name: {
    width: "100% !important",
    '&:focus': {
      outline: 'none'
    },
    fontFamily: "Poppins !important",
    fontSize: "15px !important",
    fontWeight: "400",
    padding: "9px 0px 8px 20px !important",
    borderRadius: "5px",
    border: "1px solid #9F9F9F !important"
  },
  category_name: {
    color: "#464646 !important",
    fontSize: "17px !important",
    fontWeight: "500 !important",
    margin: "20px 0 10px 0 !important",
    fontFamily: "Poppins !important"
  },
  category_category: {
    color: "#464646 !important",
    fontSize: "17px !important",
    fontWeight: "500 !important",
    margin: "10px 0 !important",
    fontFamily: "Poppins !important"
  },
  button_root: {
    backgroundColor: "#065374 !important",
    padding: "9px 20px 8px 20px !important",
    marginTop: "20px !important",
    marginLeft: "62% !important",
    fontFamily: "Poppins"
  },
  em: {
    color: "#9F9F9F !important",
    font: "inherit !important",
    paddingLeft: "12px !important",
    marginTop: "2px !important",
    fontFamily: "Poppins !important"
  },
  menuItem_gutters: {
    color: "#9F9F9F !important",
    font: "inherit !important",
    marginTop: "2px !important",
    fontFamily: "Poppins !important"
  },
  h4_second: {
    fontSize: "17px !important",
    fontWeight: "600 !important",
    margin: "0px !important",
    fontStyle: "normal !important",
    fontFamily: "Poppins !important"
  },
});
interface createDatas {
  category: any;
  name: string;
  id: number;
  date: number;
  parent_category: any;
}
const CategoryCreate = () => {
  const [category, setCategory] = React.useState<any>([]);
  const [select, setSelect] = React.useState("");
  const [rows, setRows] = React.useState<createDatas[]>([]);
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    let response: any = await getCategoryListCreate();
    setRows(response.data.parent_categories[0]);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };
  function onSubmit() {
    const data = { name: category, parent_id: select };
    postCategoryCreate(data)
      .then(async (res: any) => {
        if (res.status === 200) {
          setNotify({
            isOpen: true,
            message: "Muvaffaqiyatli yaratildi.",
            type: "success",
          });
        }
        return await getCategory();
      })
      .catch(function (err: any) {
        setNotify({
          isOpen: true,
          message: "Xatolik yuz berdi.",
          type: "error",
        });
      });
  }
  const inpt = document.querySelector('input');
  if (inpt?.value.length === 1) {
    inpt?.classList.add('active')
  }
  else if (inpt?.value.length === 2) {
    inpt?.classList.add('active')
  }
  else if (inpt?.value.length === 3) {
    inpt?.classList.add('active')
  }
  else {
    inpt?.classList.remove('active')
  }
  return (
    <>
      <Box className={classes.input_one}>
        <h4 className={classes.h4_second}>1.Turkum yaratish</h4>
        <h5 className={classes.category_name}>Nomi</h5>
        <input
          style={{ borderColor: '#9F9F9F' }}
          className={classes.input_name}
          id="outlined-basic"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Turkumni nomi"
        />
        <h5 className={classes.category_category}>Turkum</h5>
        <FormControl sx={{ m: 1, minWidth: '100%', margin: 0 }}>
          <Select
            value={select}
            onChange={handleChangeCategory}
            displayEmpty
            style={{
              height: "40px",
            }}
          >
            <MenuItem value="">
              <em className={classes.em}>Turkimni tanlang</em>
            </MenuItem>
            {rows.map((row, index) => (
              <MenuItem
                value={row.id}
                key={index}
                className={classes.menuItem_gutters}
              >
                {row.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title="Turkumni yaratish">
          <Button
            variant="contained"
            onClick={() => {
              onSubmit();
              refresh()
            }}
            className={classes.button_root}
            style={{ textTransform: "capitalize" }}
          >
            Turkumni yarating
          </Button>
        </Tooltip>
        <Notification notify={notify} setNotify={setNotify} />
      </Box>
    </>
  );
};

export default CategoryCreate;