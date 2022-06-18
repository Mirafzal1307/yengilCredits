import React from "react";
import MiniDrawer from "../../components/CoreLayout/AdminHeader";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {  useNavigate, useParams } from "react-router-dom";
import {
  editOrderStatus,
  getBuyerData,
  getStatuses,
} from "../../Api/admin/AdminOrderApi";
import buyericon from "../../Images/buyericon.svg";
import fullnameicon from "../../Images/fullnameicon.svg";
import clientphone from "../../Images/clientphone.svg";
import clientwallet from "../../Images/clientwallet.svg";
import clientaddress from "../../Images/clientaddress.svg";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import notserved from "../../Images/notserved.svg";
import served from "../../Images/served.svg";
import inprogress from "../../Images/inprogress.svg";
import clientcancel from "../../Images/clientcancel.svg";
import admincancel from "../../Images/admincancel.svg";
import Notification from "../Snackbar/Notification";
const useStyles = makeStyles({
  title: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "28px",
  },
  bigBox: {
    background: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    fontFamily: "Poppins",
    padding: "30px !important",
  },
  insideBox: {
    display: "flex",
    alignItems: "center !important",
    padding: "0 0 30px 0",
    marginTop: "0 !important",
  },
  insideBoxItem: {
    display: "flex",
    alignItems: "center",
  },
  insideText: {
    marginLeft: "10px",
    fontWeight: 600,
  },
  insideForm: {
    width: "250px",
  },
  clientBox: {
    display: "flex",
    alignItems: "center",
    marginRight: "auto",
  },
  clientText: {
    marginLeft: "10px",
  },
  clientBigBox: {
    display: "flex",
  },
  titleRows: {
    color: "#065374 !important",
    fontFamily: "Poppins !important",
    fontWeight: "600 !important",
    fontSize: "17px !important",
    margin: 0,
    paddingTop: "0 !important",
  },
  tableHead: {
    margin: "19px 40px",
  },
  clientTable: {
    border: "1px solid #9f9f9f",
    padding: "19px 20px 0",
    borderRadius: "5px",
    marginTop: "14px",
  },
  productRows: {
    padding: "16px 16px 16px !important",
    fontFamily: "Poppins !important",
    color: "#000",
    fontWeight: "300 !important",
    fontSize: "17px !important",
  },
  productInfo: {
    display: "flex",
    alignItems: "center",
  },
  productImg: {
    width: "50px",
    height: "50px",
  },
  productName: {
    marginLeft: "10px",
  },
  mainTitle: {
    color: "#065374",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "22px",
  },
  priceText: {
    fontFamily: "Poppins",
    color: "#000",
    fontWeight: "300 !important",
    fontSize: "17px",
    margin: 0,
    padding: "0 !important",
    marginBottom: "10px",
  },
  priceBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  saveButton: {
    padding: "9px 20px",
    marginLeft: "auto",
    background: "#065374",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "17px",
    fontWeight: "500 !important",
    cursor: "pointer",
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
    overflow: "hidden",
    zIndex: "10 !important",
    background: "transparent",
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
const OrderDetails = () => {
  const classes = useStyles();
  const { buyer_id } = useParams();
  const [buyer, setBuyer] = React.useState<any>();
  const [journal, setJournal] = React.useState<any>();
  const [price, setPrice] = React.useState<any>();
  const [statuses, setStatuses] = React.useState<any>();
  const [status, setStatus] = React.useState();
  const [defaultStatus, setDefaultStatus] = React.useState<any>();
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleChange = (e: any) => {
    setStatus(e.target.value);
  };
  const getStatus = async () => {
    let res: any = await getStatuses({});
    setStatuses(res?.data);
  };
  const getData = async () => {
    let res: any = await getBuyerData(buyer_id);
    setBuyer(res?.data?.buyer);
    setJournal(res?.data?.journal);
    setPrice(res?.data?.total_price_all);
    setDefaultStatus(res?.data?.status);
  };
  const navigate = useNavigate();
  const sendDataToAPI = async () => {
    const data = { buyer_id: buyer_id, status_id: status };
    await editOrderStatus(data)
      .then(function (res: any) {
        if (res.status === 200) {
          setNotify({
            isOpen: true,
            message: "Holat o'zgartirildi...",
            type: "success",
          });
          setTimeout(() => {
            navigate("/order");
          }, 500);
        }
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: "Hech narsa o'zgartirilmadi...",
          type: "error",
        });
      });
  };
  React.useEffect(() => {
    getStatus();
  }, []);
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <MiniDrawer />
      <Container style={{ marginTop: "50px" }}>
        <h2 className={classes.title}>Buyurtma</h2>
      </Container>
      <Container className={classes.bigBox}>
        <Grid
        direction="row"
          display="flex"
          justifyContent="space-between"
          alignItems="center !important"
          sx={{ mt: "20px", borderBottom: "1px solid #9F9F9F" }}
          className={classes.insideBox}
        >
          <Box className={classes.insideBoxItem}>
            <img src={buyericon} alt="icon" />
            <p className={classes.insideText}>ID {buyer?.id}</p>
          </Box>
          <Tooltip title="Holati">
            <FormControl size="small" sx={{ width: "250px" }}>
              <InputLabel id="demo-simple-select-label">
                {defaultStatus === "NOT_SERVED" ? (
                  <div className={classes.statusDefaultBox}>
                    <img src={notserved} alt="img" />
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
                ) : defaultStatus === "SERVED" ? (
                  <div className={classes.statusDefaultBox}>
                    <img src={served} alt="img" />
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
                ) : defaultStatus === "ADMIN_CANCEL" ? (
                  <div className={classes.statusDefaultBox}>
                    <img src={admincancel} alt="img" />
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
                ) : defaultStatus === "CLIENT_CANCEL" ? (
                  <div className={classes.statusDefaultBox}>
                    <img src={clientcancel} alt="img" />
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
                ) : defaultStatus === "IN_PROGRESS" ? (
                  <div className={classes.statusDefaultBox}>
                    <img src={inprogress} alt="img" />
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
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
                onChange={handleChange}
              >
                {statuses?.map((item: any, key: any) => (
                  <MenuItem value={item?.id} key={key}>
                    {item?.statusType === "NOT_SERVED" ? (
                      <div className={classes.statusBox}>
                        <img src={notserved} alt="img" />
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
                    ) : item?.statusType === "SERVED" ? (
                      <div className={classes.statusBox}>
                        <img src={served} alt="img" />
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
                    ) : item?.statusType === "ADMIN_CANCEL" ? (
                      <div className={classes.statusBox}>
                        <img src={admincancel} alt="img" />
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
                    ) : item?.statusType === "CLIENT_CANCEL" ? (
                      <div className={classes.statusBox}>
                        <img src={clientcancel} alt="img"/>
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
                    ) : item?.statusType === "IN_PROGRESS" ? (
                      <div className={classes.statusBox}>
                        <img src={inprogress} alt="img"/>
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
        <Box>
          <h2 className={classes.mainTitle}>Mijoz</h2>
          <Box className={classes.clientBigBox}>
            <div className={classes.clientBox}>
              <img src={fullnameicon} alt="icon" />
              <p className={classes.clientText}>{buyer?.full_name}</p>
            </div>
            <div className={classes.clientBox}>
              <img src={clientphone} alt="icon" />
              <p className={classes.clientText}>{buyer?.phone}</p>
            </div>
            <div className={classes.clientBox}>
              <img src={clientwallet} alt="icon" />
              <p className={classes.clientText}>{buyer?.pay_type}</p>
            </div>
            <div className={classes.clientBox}>
              <img src={clientaddress} alt="icon" />
              <p className={classes.clientText}>
                {buyer?.address} {buyer?.city}
              </p>
            </div>
          </Box>
        </Box>
        <Box className={classes.clientTable}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" className={classes.titleRows}>
                  Mahsulot
                </TableCell>
                <TableCell align="left" className={classes.titleRows}>
                  Narxi
                </TableCell>
                <TableCell align="left" className={classes.titleRows}>
                  Soni
                </TableCell>
                <TableCell align="left" className={classes.titleRows}>
                  Umumiy narx
                </TableCell>
              </TableRow>
            </TableHead>
            {journal?.map((item: any, key: any) => (
              <TableBody key={key}>
                <TableRow>
                  <TableCell align="left" className={classes.productRows}>
                    <div className={classes.productInfo}>
                      <img
                        src={`${MINIO_FULL_ENDPOINT_FOR}/product/${item.photo}`}
                        className={classes.productImg} alt="rasm bor edi"
                      />
                      <p className={classes.productName} key={item.id}>{item.product_name}</p>
                    </div>
                  </TableCell>
                  <TableCell align="left" className={classes.productRows} key={item.id}> 
                    {item?.price?.toLocaleString()} so'm
                  </TableCell>
                  <TableCell align="left" className={classes.productRows} key={item.id}>
                    {item.quantity}
                  </TableCell>
                  <TableCell align="left" className={classes.productRows} key={item.id}>
                    {(item?.price * item.quantity)?.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "18px",
          }}
        >
          <Box className={classes.priceBox}>
            <p className={classes.priceText}>
              Umumiy hisob:{" "}
              <span style={{ fontWeight: 500 }}>{price?.toLocaleString()}</span>
            </p>
            <button className={classes.saveButton} onClick={sendDataToAPI}>
              Saqlash
            </button>
          </Box>
        </Box>
      </Container>
      <Notification notify={notify}  setNotify={setNotify} />
    </>
  );
};

export default OrderDetails;
