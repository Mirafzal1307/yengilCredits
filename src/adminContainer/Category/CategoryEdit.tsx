import * as React from "react";
import { Box } from "@mui/system";
import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getCategoryList,
  getCategoryById,
  putCategoryEdit,
} from "../../Api/admin/AdminCategoryApi";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import Notification from "../Snackbar/Notification";

interface createDatas {
  name: string;
  id: number;
  date: number;
}
const useStyles = makeStyles({
  box: {
    position: "absolute",
    width: "1200px !important",
    minHeight: "400px !important",
    left: "250px !important",
    top: "150px !important",
    background: " #FFFFFF !important",
    boxShadow: "0px 0px 10px rgb(0 0 0 / 25%) !important",
    borderRadius: "5px !important",
  },
  h1: {
    position: "absolute",
    width: "111px",
    height: "39px",
    left: "250px",
    top: "70px",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "138%",
    display: "flex",
    alignItems: "center",
    color: "#000000",
    fontFamily: "Poppins !important",
  },
  cancel: {
    background: "#FF4B4B !important",
    borderRadius: "5px",
    color: "#ffffff !important",
    textTransform: "lowercase",
    marginRight: "20px",
    padding: "9px 20px 8px 20px !important",
  },
  deletes: {
    background: "#065374 !important",
    borderRadius: "5px",
    color: "#ffffff !important",
    textTransform: "lowercase",
    margin: "0 0 0 317px !important",
    padding: "9px 20px 8px 20px !important",
  },
  h2: {
    fontSize: "17px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000000",
    fontFamily: "Poppins !important",
  },
  input_name: {
    width: "500px !important",
    fontFamily: "Poppins !important",
    fontSize: "15px !important",
    fontWeight: "400",
    padding: "9px 0px 8px 20px !important",
    "&:focus": {
      outline: "none",
    },
    borderRadius: "5px",
    border: "1px solid #9F9F9F !important",
  },
  h4_second: {
    fontSize: "17px !important",
    fontWeight: "600 !important",
    margin: "0px !important",
    fontStyle: "normal !important",
    fontFamily: "Poppins !important",
  },
  category_name: {
    color: "#464646 !important",
    fontSize: "17px !important",
    fontWeight: "500 !important",
    margin: "20px 0 10px 0 !important",
    fontFamily: "Poppins !important",
  },
  category_category: {
    color: "#464646 !important",
    fontSize: "17px !important",
    fontWeight: "500 !important",
    margin: "10px 0 !important",
    fontFamily: "Poppins !important",
  },
  em: {
    color: "#9F9F9F !important",
    font: "inherit !important",
    paddingLeft: "12px !important",
    marginTop: "2px !important",
    fontFamily: "Poppins !important",
  },
  menuItem_gutters: {
    color: "#9F9F9F !important",
    font: "inherit !important",
    marginTop: "2px !important",
    fontFamily: "Poppins !important",
  },
  parent_buttons: {
    minWidth: "220px !important",
    color: "white !important",
    fontSize: "17px !important",
    fontWeight: "400 !important",
    marginTop: "20px !important",
  },
  header: {
    display: "flex",
  },
  box2: {
    display: "flex !importatnt",
    position: "relative",
  },
});

const style = {
  width: 600,
  bgcolor: "#ffffff !important",
  borderRadius: "10px",
  p: 2,
  px: 4,
  pb: 3,
};

export default function CategoryEdit(): JSX.Element {
  const [rows, setRows] = React.useState<createDatas[]>([]);
  const [select, setSelect] = React.useState("");
  const [category, setCategory] = React.useState<any>("");
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const getCategory = async (): Promise<any> => {
    const response: any = await getCategoryList("", {});
    setRows(response.data.parent_categories[0]);
  };
  const getCategoryByIds = async (id: any): Promise<void> => {
    const res: any = await getCategoryById(id);
    setCategory(res.data.sub_category_info[0].name);
    setRows(res.data.parent_categories_list[0]);
  };
  React.useEffect(() => {
    getCategory();
  }, []);
  const putCategory = (): any => {
    const data = { name: category, parent_id: select };
    try {
      putCategoryEdit(id, data)
        .then(async (res: any) => {
          if (res.status === 200) {
            setNotify({
              isOpen: true,
              message: "Muvaffaqiyatli o'zgardi!",
              type: "success",
            });
            setTimeout(() => {
              navigate("/category");
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
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Xatolik yuz berdi...",
        type: "error",
      });
    }
  };
  React.useEffect(() => {
    setCategory(getCategoryByIds(id));
  }, []);

  const handleChangeCategory = (event: SelectChangeEvent): void => {
    setSelect(event.target.value);
  };
  const inp = document.querySelector("input");
  if (inp?.value.length === 1) {
    inp?.classList.add("active");
  } else if (inp?.value.length === 2) {
    inp?.classList.add("active");
  } else if (inp?.value.length === 3) {
    inp?.classList.add("active");
  } else {
    inp?.classList.remove("active");
  }
  return (
    <>
      <MiniDrawer />
      <Box>
        <Container sx={{ ml: "0px", mr: "80px" }}>
          <h1 className={classes.h1}>Turkum</h1>
          <Box sx={style} className={classes.box}>
            <Paper style={{ boxShadow: "none" }}>
              <h4 className={classes.h4_second}>Turkumni o`zgartirish</h4>
              <h5 className={classes.category_name}>Nomi</h5>
              <input
                style={{ borderColor: "#9F9F9F" }}
                className={classes.input_name}
                id="outlined-basic"
                placeholder="Turkumni nomi"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <h5 className={classes.category_category}>Turkum</h5>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={select}
                  onChange={handleChangeCategory}
                  displayEmpty
                  style={{
                    width: "500px",
                    height: "40px",
                  }}
                >
                  <MenuItem value="">
                    <em className={classes.em}>Turkimni tanlang</em>
                  </MenuItem>
                  {rows.map((row, index) => (
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
              <div className={classes.parent_buttons}>
                <Tooltip title="Turkumni o'zgartirish">
                  <Button
                    className={classes.deletes}
                    style={{ textTransform: "capitalize" }}
                    onClick={putCategory}
                  >
                    Turkumni o`zgartirish
                  </Button>
                </Tooltip>
              </div>
            </Paper>
          </Box>
          <Notification notify={notify} setNotify={setNotify} />
        </Container>
      </Box>
    </>
  );
}
