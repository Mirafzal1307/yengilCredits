import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { fetchCategory } from "../../redux/actions/categoryAction";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  CircularProgress,
  Container,
  Pagination,
  PaginationItem,
  Tooltip,
} from "@mui/material";
import {
  deleteCategoryItem,
  getCategoryByParentCategory,
  getCategoryList,
  getCategorySearch,
} from "../../Api/admin/AdminCategoryApi";
import { makeStyles } from "@mui/styles";
import "./style.css";
import Modal from "../Modal/Modal";
import { Link, useParams } from "react-router-dom";
import Edit from "../../Images/edit.png";
import Details from "../../Images/detailsicon.svg";
import Notification from "../Snackbar/Notification";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { useActions } from "../../hook/useActions";
import { Link as NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

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
  action: number
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

function EnhancedTableHead(props: EnhancedTableProps) {
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
  parent_category: any
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
  },
  h1: {
    fontSize: "28px !important",
    margin: "32px 0 20px 0 !important",
    fontFamily: "Poppins !important"
  },
  input_name: {
    width: "500px !important",
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
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
  datagrid: {
    border: "none !important",
  },
  button_root: {
    backgroundColor: "#065374 !important",
    padding: "9px 20px 8px 20px !important",
    marginTop: "20px !important",
    marginLeft: "58% !important",
  },
  button: {
    padding: "0px !important",
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
    marginTop: "20px !important"
  },
  h4_second: {
    fontSize: "17px !important",
    fontWeight: "600 !important",
    margin: "0px !important",
    fontStyle: "normal !important",
    fontFamily: "Poppins !important"
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
    fontFamily: "Poppins !important"
  },
  box: {
    textAlign: "center",
  },
  h1_second: {
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
    fontFamily: "Poppins !important"
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
    height: '40px !important',
    borderRadius: '5px !important',
    padding: '12px 150px 12px 20px',
    border: "2px solid #9F9F9F !important"
  },
  SearchIcon: {
    height: '40px !important',
    marginLeft: '5px !important',
    background: '#065374 !important',
    color: '#ffffff',
    borderRadius: '5px !important'
  },
});

export default function EnhancedTable() {
  
  
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const [pageQty, setPageQty] = React.useState(2);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("react");
  const [category, setCategory] = React.useState<createDatas[]>([]);

  // console.log(category);
  
  const [categories, setCategories] = React.useState<any>()
  const [status, setStatus] = React.useState('');
  const [param, setParam] = React.useState('');
  const [search, setSearch] = React.useState([])
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });


  const classes = useStyles();
  const { id } = useParams();

  const handleInputChange = (e: any) => {
    setParam(e.target.value);
  };

  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };

  React.useEffect(() => {
    subCategory(id);
  }, []);

  const searchCategory = async () => {
    const res: any = await getCategorySearch(param)
    setCategories(res?.data)
  }

  React.useEffect(() => {
    searchCategory()
  }, [param])

  React.useEffect(() => {
    fetchCategory(`${page - 1}`);
    if (pageQty < page) {
      setPage(3);
    }
  }, [query, page]);

  const subCategory = async (id: any) => {
    let res: any = await getCategoryByParentCategory(id);
    setCategory(res?.data?.sub_categories);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = category?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
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
        selected.slice(selectedIndex + 1)
      );
      setSelected(newSelected);
    };
  }
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const deleteCategory = async (id: any) => {
    let data = await deleteCategoryItem(id)
      .then((res: any) => {
        if (res.status == 200) {
          setNotify({
            isOpen: true,
            message: "Muvaffaqiyatli o'chirildi.",
            type: "success",
          });
        }
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Xatolik yuz berdi.",
          type: "error",
        });
      });
  };

  return (
    <>
      <MiniDrawer />
      <Container style={{ paddingBottom: "50px !important", marginRight: 0 }} maxWidth="xl">
        <h1 className={classes.h1}>Turkum</h1>
        <Box className={classes.input_two}>
          <Paper className={classes.paper}>
            <div style={{ display: 'flex', }}>
              <input
                type="text"
                placeholder="Izlash..."
                onChange={handleInputChange}
                className={classes.SearchInput} />
              <button
                className={classes.SearchIcon} >
                <SearchIcon />
              </button>
            </div>
            <TableContainer>
              <h4 className={classes.h4}>2.Turkumlar</h4>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={category.length}
                />
                <TableBody>
                  {
                    param && categories ?
                    param && categories?.map((row: any, index: any) => {
                        const deleteData = () => {
                          deleteCategory(row?.id);
                        };
                        const isItemSelected = isSelected(row?.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <>
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row?.name)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row?.name}
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
                              <TableCell className={classes.tableCell} align="left">
                                {row?.name}
                              </TableCell>
                              <TableCell className={classes.tableCell} align="left">
                                {row?.parent_category?.name}
                              </TableCell>
                              <TableCell className={classes.tableCell} align="left">
                                <Link to={`/product`}>
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
                          </>
                        );
                      }) : category?.map((row: any, index: any) => {
                        const deleteData = () => {
                          deleteCategory(row.id);
                        };
                        const isItemSelected = isSelected(row?.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <>
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.name)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row?.name}
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
                              <TableCell className={classes.tableCell} align="left">
                                {row?.name}
                              </TableCell>
                              <TableCell className={classes.tableCell} align="left">
                                {row?.parent_category?.name}
                              </TableCell>
                              <TableCell className={classes.tableCell} align="left">
                                <Link to={`/product`}>
                                  <Tooltip title="Details">
                                    <Button>
                                      <img src={Details} alt="" />
                                    </Button>
                                  </Tooltip>
                                </Link>
                                <Link to={`/category/admin/edit-page/${row?.id}`}>
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
                          </>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              className={classes.pagination}
              count={2}
              page={page}
              onChange={(_, num) => setPage(num)}
              sx={{ marginY: 3, marginX: "auto" }}
              renderItem={(item) => (
                <PaginationItem
                  className={classes.paginationItem}
                  component={NavLink}
                  to={`/category/by-id/${id}/?page${page}`}
                  {...item}
                  variant="outlined"
                  shape={"rounded"}
                />
              )}
            />
          </Paper>
        </Box>
      </Container>
    </>
  );
}
