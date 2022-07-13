import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Button, Container, Grid, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useParams, Link as NavLink } from "react-router-dom";
import {
  deleteCategoryItem,
  getCategoryByParentCategory,
  postCategoryCreate,
} from "../../Api/admin/AdminCategoryApi";
import "./style.css";
import Modal from "../Modal/Modal";
import Edit from "../../Images/edit.png";
import Details from "../../Images/detailsicon.svg";
import Notification from "../Snackbar/Notification";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";

import { fetchCategory } from "../../redux/actions/categoryAction";
import { refresh } from "../Modal/refresh";

interface Data {
  id: number;
  name: string;
  date: number;
  action: number;
}

function createData(
  id: number,
  name: string,
  date: number,
  action: number,
): Data {
  return {
    id,
    name,
    date,
    action,
  };
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "# ID",
  },
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Nomi",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Turkum",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Amallar",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const useStyles = makeStyles({
  paper: {
    boxShadow: "none !important",
  },
  input_two: {
    width: "1200px !important",
    top: "140px !important",
    background: "#FFFFFF !important",
    boxShadow: "0px 0px 10px rgb(0 0 0 / 25%) !important",
    borderRadius: "5px !important",
    padding: "40px 60px !important",
    marginLeft: "100px !important",
  },
  h1: {
    fontSize: "28px !important",
    margin: "32px 0 10px 0 !important",
    fontFamily: "Poppins !important",
  },
  input_name: {
    width: "100% !important",
    "&:focus": {
      outline: "none",
    },
    fontFamily: "Poppins !important",
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
    fontFamily: "Poppins !important",
  },
  category_category: {
    color: "#464646 !important",
    fontSize: "17px !important",
    fontWeight: "500 !important",
    margin: "10px 0 !important",
    fontFamily: "Poppins !important",
  },
  datagrid: {
    border: "none !important",
  },
  button_root: {
    backgroundColor: "#065374 !important",
    padding: "9px 20px 8px 20px !important",
    marginTop: "10px !important",
  },
  button: {
    padding: "0px !important",
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
  update_buttons: {
    width: "400px !important",
    display: "flex !important",
  },
  h4: {
    fontSize: "17px !important",
    fontWeight: "600 !important",
    margin: "0px !important",
    paddingBottom: "10px !important",
    paddingLeft: "12px !important",
    fontStyle: "normal !important",
    fontFamily: "Poppins !important",
    // marginTop: "20px !important",
  },
  h4_second: {
    fontSize: "17px !important",
    fontWeight: "600 !important",
    margin: "0px !important",
    fontStyle: "normal !important",
    fontFamily: "Poppins !important",
    marginBottom: "10px !important",
  },
  button_one: {
    minWidth: "140px !important",
    height: "40px !important",
    color: "white !important",
    backgroundColor: "#FF4B4B !important",
    margin: "20px 0 0 60px !important",
    fontSize: "17px !important",
    fontWeight: "400 !important",
  },
  category_button: {
    minWidth: "140px !important",
    margin: "20px 0 0 30px !important",
    fontSize: "17px !important",
    fontWeight: "400 !important",
  },
  update_button: {
    minWidth: "220px !important",
    height: "40px !important",
    color: "white !important",
    margin: "20px 0 0 80px !important",
    fontSize: "17px !important",
    fontWeight: "400 !important",
  },
  tableCell: {
    borderBottom: "1px solid black !important",
    padding: "0 !important",
    fontFamily: "Poppins !important",
  },
  box: {
    textAlign: "center",
  },
  h1_second: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "22px",
    color: "#065374",
    fontFamily: "Poppins !important",
  },
  deleteButton: {
    border: "none !important",
    background: "transparent !important",
  },
  cancel: {
    background: "#FF4B4B!important",
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
    margin: "0 0 0 20px !important",
    padding: "9px 20px 8px 20px !important",
  },
  h2: {
    fontSize: "17px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000000",
    fontFamily: "Poppins !important",
  },
  pagination: {
    width: "315px",
    marginRight: "unset !important",
    padding: "5px 5px 5px 5px !important",
  },
  paginationItem: {
    width: "100%",
    border: " solid 1px #9F9F9F !important",
    margin: "0 !important",
    borderRadius: "3px !important",
    padding: "20px 14px 20px 14px !important",
  },
  SearchInput: {
    height: "40px !important",
    borderRadius: "5px !important",
    padding: "12px 150px 12px 20px",
    border: "2px solid #9F9F9F !important",
  },
  SearchIcon: {
    height: "40px !important",
    marginLeft: "5px !important",
    background: "#065374 !important",
    color: "#ffffff",
    borderRadius: "5px !important",
  },
  forInput: {
    padding: "10px 20px",
  },
  menu: {
    marginLeft: "100px",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
  },
  menuItem: {
    color: "#065374",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "30px",
  },
  menuLink: {
    marginBottom: "15px",
  },
  header: {
    display: "flex",
  },
});

function EnhancedTableHead(props: EnhancedTableProps): JSX.Element {
  const { onSelectAllClick } = props;
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.tableCell}>
          <Checkbox color="primary" onChange={onSelectAllClick} />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} className={classes.tableCell}>
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface createDatas {
  name: string;
  id: number;
  date: number;
  parent_category: any;
}

export default function EnhancedTable(): JSX.Element {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [pageQty, setPageQty] = React.useState(2);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("react");
  const [category, setCategory] = React.useState<createDatas[]>([]);
  const [param, setParam] = React.useState("");
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const [categoryName, setCategoryName] = React.useState<any>("");
  const handleInputChange = (e: any): void => {
    setCategoryName(e.target.value);
  };
  const classes = useStyles();
  const { id } = useParams();

  function onSubmit(): void {
    const data = { name: categoryName, parent_id: id };
    postCategoryCreate(data)
      .then(async (res: any) => {
        if (res.status === 200) {
          setNotify({
            isOpen: true,
            message: "Muvaffaqiyatli yaratildi.",
            type: "success",
          });
        }
      })
      .catch((err: any) => {
        setNotify({
          isOpen: true,
          message: "Xatolik yuz berdi.",
          type: "error",
        });
      });
  }

  React.useEffect(() => {
    fetchCategory(`${page - 1}`);
    if (pageQty < page) {
      setPage(3);
    }
  }, [query, page]);
  const subCategory = async (id: any): Promise<void> => {
    const res: any = await getCategoryByParentCategory(id);
    setCategory(res?.data?.sub_categories);
  };
  React.useEffect(() => {
    subCategory(id);
  }, []);
  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): any => {
    if (event.target.checked) {
      const newSelecteds = category?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event: React.MouseEvent<unknown>, name: string): any => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      setSelected(newSelected);
    }
  };
  const isSelected = (name: string): any => selected.indexOf(name) !== -1;
  const deleteCategory = async (id: any): Promise<any> => {
    await deleteCategoryItem(id)
      .then((res: any) => {
        if (res.status === 200) {
          setNotify({
            isOpen: true,
            message: "Muvaffaqiyatli o'chirildi.",
            type: "success",
          });
          refresh();
        }
      })
      .catch(() => {
        setNotify({
          isOpen: true,
          message: "Xatolik yuz berdi.",
          type: "error",
        });
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Container
        style={{
          marginTop: "80px",
          paddingBottom: "50px !important",
          marginRight: "100px",
          marginLeft: "-100px",
        }}
        maxWidth="xl"
      >
        <div className={classes.menu}>
          <h1 className={classes.h1}>Turkum</h1>
        </div>
        <Box className={classes.input_two}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={3}>
              <h4 className={classes.h4_second}>1.Sub turkum yaratish</h4>
              <input
                style={{ borderColor: "#9F9F9F" }}
                className={classes.input_name}
                id="outlined-basic"
                onChange={handleInputChange}
                placeholder="Turkumni nomi"
              />
              <Button
                variant="contained"
                onClick={() => {
                  onSubmit();
                  refresh();
                }}
                className={classes.button_root}
                style={{ textTransform: "capitalize" }}
              >
                Turkumni yarating
              </Button>
            </Grid>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <TableContainer>
                  <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      onSelectAllClick={handleSelectAllClick}
                      rowCount={category.length}
                    />
                    <TableBody>
                      {category?.map((row: any, index: any) => {
                        const deleteData = (): void => {
                          deleteCategory(row?.id);
                        };
                        const isItemSelected = isSelected(row?.name);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row?.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell
                              padding="checkbox"
                              className={classes.tableCell}
                            >
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              className={classes.tableCell}
                            >
                              {row?.id}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="left"
                              key={row.id}
                            >
                              {row?.name}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="left"
                              key={row.id}
                            >
                              {row?.parent_category?.name}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="left"
                            >
                              <Link to="/product">
                                <Tooltip title="Details">
                                  <Button>
                                    <img src={Details} alt="" />
                                  </Button>
                                </Tooltip>
                              </Link>
                              <Link to={`/category/admin/edit-page/${row.id}`}>
                                <Tooltip title="Edit">
                                  <Button>
                                    <img src={Edit} alt="ad" />
                                  </Button>
                                </Tooltip>
                              </Link>
                              <Tooltip title="Delete">
                                <Button className={classes.button}>
                                  <Modal data={deleteData} />
                                </Button>
                              </Tooltip>
                              <Notification
                                notify={notify}
                                setNotify={setNotify}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
