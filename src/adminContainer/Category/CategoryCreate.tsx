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
import "./style.css";

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
    "&:focus": {
      outline: "none",
    },
    fontFamily: "Arial !important",
    fontSize: "15px !important",
    fontWeight: "400",
    padding: "9px 0px 8px 20px !important",
    borderRadius: "5px",
    border: "1px solid #9F9F9F !important",
  },
  category_name: {
    color: "#464646 !important",
    fontSize: "17px !important",
    fontWeight: "500 !important",
    margin: "20px 0 10px 0 !important",
    fontFamily: "Arial !important",
  },
  category_category: {
    color: "#464646 !important",
    fontSize: "17px !important",
    fontWeight: "500 !important",
    margin: "10px 0 !important",
    fontFamily: "Arial !important",
  },
  button_root: {
    backgroundColor: "#065374 !important",
    padding: "9px 20px 8px 20px !important",
    marginTop: "20px !important",
    marginLeft: "62% !important",
    fontFamily: "Arial",
  },
  em: {
    color: "#9F9F9F !important",
    font: "inherit !important",
    paddingLeft: "12px !important",
    marginTop: "2px !important",
    fontFamily: "Arial !important",
  },
  menuItem_gutters: {
    color: "#9F9F9F !important",
    font: "inherit !important",
    marginTop: "2px !important",
    fontFamily: "Arial !important",
  },
  h4_second: {
    fontSize: "17px !important",
    fontWeight: "600 !important",
    margin: "0px !important",
    fontStyle: "normal !important",
    fontFamily: "Arial !important",
  },
});
interface createDatas {
  category: any;
  name: string;
  id: number;
  date: number;
  parent_category: any;
}
function CategoryCreate(): JSX.Element {
  const [category, setCategory] = React.useState<any>([]);
  const [select, setSelect] = React.useState("");
  const [rows, setRows] = React.useState<createDatas[]>([]);
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const getCategory = async (): Promise<void> => {
    const response: any = await getCategoryListCreate();
    setRows(response.data.parent_categories[0]);
  };
  useEffect(() => {
    getCategory();
  }, []);
  const handleChangeCategory = (event: SelectChangeEvent): void => {
    setSelect(event.target.value);
  };
  function onSubmit(): void {
    const data = { name: category, parent_id: select };
    postCategoryCreate(data)
      .then(async (res: any) => {
        if (res.status === 200) {
          setNotify({
            isOpen: true,
            message: "Создан успешно.",
            type: "success",
          });
        }
        return getCategory();
      })
      .catch((err: any) => {
        setNotify({
          isOpen: true,
          message: "Что-то пошло не так.",
          type: "error",
        });
      });
  }
  const inpt = document.querySelector("input");
  if (inpt?.value.length === 1) {
    inpt?.classList.add("active");
  } else if (inpt?.value.length === 2) {
    inpt?.classList.add("active");
  } else if (inpt?.value.length === 3) {
    inpt?.classList.add("active");
  } else {
    inpt?.classList.remove("active");
  }
  return (
    <Box className={classes.input_one}>
      <h4 className={classes.h4_second}>1.Создать категорию</h4>
      <h5 className={classes.category_name}>Названия</h5>
      <input
        style={{ borderColor: "#9F9F9F" }}
        className={classes.input_name}
        id="outlined-basic"
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Названия категории"
      />
      <h5 className={classes.category_category}>Категория</h5>
      <FormControl sx={{ m: 1, minWidth: "100%", margin: 0 }}>
        <Select
          value={select}
          onChange={handleChangeCategory}
          displayEmpty
          style={{
            height: "40px",
          }}
        >
          <MenuItem value="">
            <em className={classes.em}>Выбор категории</em>
          </MenuItem>
          {rows.map((row) => (
            <MenuItem
              value={row.id}
              key={row.id}
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
            refresh();
          }}
          className={classes.button_root}
          style={{ textTransform: "none" }}
        >
          Создать категорию
        </Button>
      </Tooltip>
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  );
}

export default CategoryCreate;
