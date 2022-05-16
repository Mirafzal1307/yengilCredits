import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link as NavLink } from "react-router-dom";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  getAllOrders,
  getStatuses,
  searchUsers,
} from "../../Api/admin/AdminOrderApi";
import { makeStyles } from "@mui/styles";
import notserved from "../../Images/notserved.svg";
import served from "../../Images/served.svg";
import inprogress from "../../Images/inprogress.svg";
import clientcancel from "../../Images/clientcancel.svg";
import admincancel from "../../Images/admincancel.svg";
import detailsicon from "../../Images/detailsicon.svg";

const useStyles = makeStyles({
  pagination: {
    width: "360px",
    marginRight: "unset !important",
    padding: "5px 5px 5px 5px !important",
  },
  paginationItem: {
    width: "100%",
    border: "1px solid #9F9F9F !important",
    margin: "0 !important",
    borderRadius: "3px !important",
    padding: "20px 14px 20px 14px !important",
  },
  statusText: {
    marginLeft: "5px",
    fontSize: "17px !important",
    fontFamily: "Poppins !important",
    fontWeight: "300 !important",
  },
  statusBox: {
    display: "flex",
    alignItems: "center",
  },
  tableText: {
    fontSize: "17px !important",
    fontFamily: "Poppins !important",
    fontWeight: "300 !important",
  },
  tableHeadText: {
    fontSize: "17px !important",
    fontFamily: "Poppins !important",
    fontWeight: "600 !important",
    color: "#065374 !important",
  },
  statusDefaultBox: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    zIndex: "10 !important",
    background: "#fff",
    paddingRight: "5px",
  },
});

const TableOrder: React.FC = () => {
  const [query, setQuery] = React.useState("react");
  const [orders, setOrders] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState([]);
  const [pageQty, setPageQty] = React.useState<number>(0);
  const [searchTerm, setSearchTerm] = React.useState();
  const [searchUser, setSearchUser] = React.useState<any>();
  const [users, setUsers] = React.useState();

  const getData = async () => {
    let res: any = await getAllOrders(`${page - 1}`, {});
    setOrders(res.data.content);
    setPageQty(res.data.totalPages);
  };

  const handleChangeStatus = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const getUsers = async () => {
    let response: any = await searchUsers(searchUser);
    setUsers(response.data.content);
    let res: any = await getStatuses({});
    setStatus(res.data);
  };

  const handleChangeInput = (e: any) => {
    setSearchUser(e.target.value);
  };

  React.useEffect(() => {
    getData();
    if (pageQty < page) {
      setPage(1);
    }
  }, [query, page]);

  React.useEffect(() => {
    getUsers();
  }, [searchUser]);

  const classes = useStyles();

  return (
    <div>
      <Grid
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: "20px", borderBottom: "1px solid #9F9F9F" }}
      >
        <TextField
          id="outlined-basic"
          label="Buyurtmachi ismi yoki telefoni"
          variant="outlined"
          size="small"
          sx={{ width: 400, mt: "40px", ml: "40px", mb: "40px" }}
          onChange={handleChangeInput}
        />
        <Tooltip title="Holati">
          <FormControl
            size="small"
            sx={{ width: "250px", mt: "40px", float: "right", mr: "40px" }}
          >
            <InputLabel id="demo-simple-select-label">
              <div className={classes.statusDefaultBox}>Holati</div>
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Age"
              onChange={handleChangeStatus}
            >
              <MenuItem value="">
                <em>Hammasi</em>
              </MenuItem>
              {status?.map((item: any) => (
                <MenuItem value={item.statusType}>
                  {item.statusType === "NOT_SERVED" ? (
                    <div className={classes.statusBox}>
                      <img src={notserved} />
                      <p
                        className={classes.statusText}
                        style={{
                          color: "#FF4B4B",
                          marginTop: "0",
                          marginBottom: 0,
                        }}
                      >
                        Xizmat ko'rsatilmadi
                      </p>
                    </div>
                  ) : item.statusType === "SERVED" ? (
                    <div className={classes.statusBox}>
                      <img src={served} />
                      <p
                        className={classes.statusText}
                        style={{
                          color: "#22AA00",
                          marginTop: "0",
                          marginBottom: 0,
                        }}
                      >
                        Xizmat ko'rsatildi
                      </p>
                    </div>
                  ) : item.statusType === "ADMIN_CANCEL" ? (
                    <div className={classes.statusBox}>
                      <img src={admincancel} />
                      <p
                        className={classes.statusText}
                        style={{
                          color: "#065374",
                          marginTop: "0",
                          marginBottom: 0,
                        }}
                      >
                        Admin bekor qildi
                      </p>
                    </div>
                  ) : item.statusType === "CLIENT_CANCEL" ? (
                    <div className={classes.statusBox}>
                      <img src={clientcancel} />
                      <p
                        className={classes.statusText}
                        style={{
                          color: "#27A8D1",
                          marginTop: "0",
                          marginBottom: 0,
                        }}
                      >
                        Client bekor qildi
                      </p>
                    </div>
                  ) : item.statusType === "IN_PROGRESS" ? (
                    <div className={classes.statusBox}>
                      <img src={inprogress} />
                      <p
                        className={classes.statusText}
                        style={{
                          color: "#E9A426",
                          marginTop: "0",
                          marginBottom: 0,
                        }}
                      >
                        Jarayonda
                      </p>
                    </div>
                  ) : (
                    "Xatolik yuz berdi"
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Tooltip>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid md={11}>
          <TableContainer
            className="tableContainer"
            component={Paper}
            sx={{ mt: "40px" }}
            elevation={0}
          >
            <Table
              aria-label="simple table"
              sx={{ borderBottom: "1px solid #000000" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #000000" }}
                    className={classes.tableHeadText}
                  >
                    # ID
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #000000" }}
                    className={classes.tableHeadText}
                  >
                    Ism
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #000000" }}
                    className={classes.tableHeadText}
                  >
                    Telefon
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #000000" }}
                    className={classes.tableHeadText}
                  >
                    Holat
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #000000" }}
                    className={classes.tableHeadText}
                  >
                    Sana
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "1px solid #000000" }}
                    className={classes.tableHeadText}
                  >
                    Amallar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .filter((val: any) => {
                    if (!searchTerm) {
                      return val;
                    } else if (val.status == searchTerm) {
                      return val;
                    }
                  })
                  .filter((value: any) => {
                    if (!searchUser) {
                      return value;
                    } else if (
                      value.full_name
                        .toLowerCase()
                        .includes(searchUser.toLowerCase()) ||
                      value.phone
                        .toLowerCase()
                        .includes(searchUser.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((list: any, key: any) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={key}
                    >
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #000000" }}
                        className={classes.tableText}
                      >
                        {list.journal_id}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ borderBottom: "1px solid #000000" }}
                        className={classes.tableText}
                      >
                        {list.full_name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #000000" }}
                        className={classes.tableText}
                      >
                        {list.phone}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #000000" }}
                      >
                        {" "}
                        {list.status === "NOT_SERVED" ? (
                          <div className={classes.statusBox}>
                            <img src={notserved} />
                            <p
                              className={classes.statusText}
                              style={{ color: "#FF4B4B" }}
                            >
                              Xizmat ko'rsatilmadi
                            </p>
                          </div>
                        ) : list.status === "SERVED" ? (
                          <div className={classes.statusBox}>
                            <img src={served} />
                            <p
                              className={classes.statusText}
                              style={{ color: "#22AA00" }}
                            >
                              Xizmat ko'rsatildi
                            </p>
                          </div>
                        ) : list.status === "ADMIN_CANCEL" ? (
                          <div className={classes.statusBox}>
                            <img src={admincancel} />
                            <p
                              className={classes.statusText}
                              style={{ color: "#065374" }}
                            >
                              Admin bekor qildi
                            </p>
                          </div>
                        ) : list.status === "CLIENT_CANCEL" ? (
                          <div className={classes.statusBox}>
                            <img src={clientcancel} />
                            <p
                              className={classes.statusText}
                              style={{ color: "#27A8D1" }}
                            >
                              Client bekor qildi
                            </p>
                          </div>
                        ) : list.status === "IN_PROGRESS" ? (
                          <div className={classes.statusBox}>
                            <img src={inprogress} />
                            <p
                              className={classes.statusText}
                              style={{ color: "#E9A426" }}
                            >
                              Jarayonda
                            </p>
                          </div>
                        ) : (
                          "Xatolik yuz berdi"
                        )}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #000000" }}
                        className={classes.tableText}
                      >
                        {list.register_date}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #000000" }}
                      >
                        <Tooltip title="Details">
                          <Link to={`/order-details/${list.buyer_id}`}>
                            <img src={detailsicon} alt="icon" />
                          </Link>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid
            container
            sx={{ mr: "50px", mb: "40px", mt: "40px" }}
            xs={12}
            direction="row"
            justifyContent="flex-end"
          >
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
                    to={`/order/?page${item.page}`}
                    {...item}
                    variant="outlined"
                    shape={"rounded"}
                  />
                )}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TableOrder;
