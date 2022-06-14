import React, { useEffect } from "react";
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
import {
  Button,
  Grid,
  Pagination,
  PaginationItem,
  Tooltip,
} from "@mui/material";
import {
  getCategoryByParentCategory,
  getCategoryList,
} from "../../Api/admin/AdminCategoryApi";
import { makeStyles } from "@mui/styles";
import "./style.css";
import { Link as NavLink } from "react-router-dom";
import CategoryCreate from "./CategoryCreate";
import { Link } from "react-router-dom";
import Details from "../../Images/detailsicon.svg";
import Notification from "../Snackbar/Notification";
interface Data {
  id: number;
  name: string;
  date: number;
  action: number;
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
}

const useStyles = makeStyles({
  paper: {
    boxShadow: "none !important",
  },
  input_two: {
    width: "100% !important",
    left: "920px !important",
    top: "140px !important",
    background: "#FFFFFF !important",
    boxShadow: "0px 0px 10px rgb(0 0 0 / 25%) !important",
    borderRadius: "5px !important",
    padding: "40px 20px !important",
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
    backgroundColor: '#065374',
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
    fontFamily: "Poppins !important"
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
    fontSize: '18px',
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
});

export default function EnhancedTable() {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<createDatas[]>([]);
  const [pageQty, setPageQty] = React.useState<number>(0);
  const [query, setQuery] = React.useState("react");
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  console.clear()
  useEffect(() => {
    getCategory();
    if (pageQty < page) {
      setPage(1);
    }
  }, [query, page]);
  const getCategory = async () => {
    let response: any = await getCategoryList(`${page - 1}`, {});
    setLoading(true);
    setRows(response?.data?.content);
    setPageQty(response?.data?.totalPages);
    setLoading(false);
  };
  const getSubCategories = async (id: any) => {
    let res: any = await getCategoryByParentCategory(id);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map((n) => n?.name);
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
    }
    setSelected(newSelected);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  return (
    <div className={loading ? "loading" : ""} >
      <Box>
        <h1 className={classes.h1}>Turkum</h1>
        <Grid container spacing={2}>
          <Grid container item xs={5}>
            <Grid item xs={12}>
              <CategoryCreate />
            </Grid>
          </Grid>
          <Grid container item xs={7}>
            <Grid item xs={12}>
              <Box className={classes.input_two}>
                <Paper className={classes.paper}>
                  <TableContainer>
                    <h4 className={classes.h4}>2.Turkumlar</h4>
                      <Table sx={{ maxWidth: 750 }} aria-labelledby="tableTitle">
                      <EnhancedTableHead
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={rows?.length}
                      />
                      <TableBody>
                        {rows?.map((row, index) => {
                          const getCategoryToDetails = () => {
                            getSubCategories(row?.id);
                          };
                          const isItemSelected = isSelected(row?.name);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <>
                              <TableRow
                                hover
                                onClick={(event) =>
                                  handleClick(event, row?.name)
                                }
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
                                <TableCell
                                  className={classes.tableCell}
                                  align="left"
                                >
                                  {row?.name}
                                </TableCell>

                                <TableCell
                                  className={classes.tableCell}
                                  align="left"
                                >
                                  <Link to={`/category/by-id/${row.id}`}>
                                    <Tooltip title="Details">
                                      <Button onClick={getCategoryToDetails}>
                                        <img src={Details} alt="" />
                                      </Button>
                                    </Tooltip>
                                  </Link>
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
                  {!!pageQty && (
                    <Pagination
                      className={classes.pagination}
                      count={pageQty}
                      page={page}
                      onChange={(_, num) => setPage(num)}
                      sx={{ marginY: 3, marginX: "auto" }}
                      renderItem={(item) => (
                        <PaginationItem
                          className={classes.paginationItem}
                          component={NavLink}
                          to={`/category/?page${item.page}`}
                          {...item}
                          variant="outlined"
                          shape={"rounded"}
                        />
                      )}
                    />
                  )}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
