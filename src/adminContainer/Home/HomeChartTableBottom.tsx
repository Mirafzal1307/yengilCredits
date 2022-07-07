import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { makeStyles } from "@mui/styles";

function createData(
  id: number,
  name: string,
  email: string,
  cost: number,
  date: string
) {
  return { id, name, email, cost, date };
}
const rows = [
  createData(
    11,
    "Jonh lghghue",
    "useggggggggggggggggg@email.com",
    623,
    "11.05.2022"
  ),
  createData(
    12,
    "Issachgh  Nueton",
    "useggggggggggggggg@email.com",
    9233,
    "11.05.2022"
  ),
  createData(
    13,
    "Eclahfghdir ",
    "usedddddddddddd@email.com",
    24235,
    "11.05.2022"
  ),
  createData(
    14,
    "Mirafhfdfhzal",
    "usedfgsdfgdgfd@email.com",
    8000,
    "11.05.2022"
  ),
  createData(
    15,
    "Gabrdfhfheal",
    "usegdsgsdgsgsgfsg@email.com",
    16400,
    "11.05.2022"
  ),
];
const useStyles = makeStyles({
  header_table: {
    padding: "30px 15px 30px 15px !important",
  },
  header_name: {
    fontSize: "22px !important",
    fontWeight: "500 !important",
  },
  header_table_insides: {
    padding: "padding: 0px 10px 0px 10px !important",
  },
  header_table_inside: {
    textAlign: "left",
    padding: "10px 5px 10px 5px !important",
  },
  header_table_inside_name: {
    color: "rdb(4,3,48) !important",
    fontSize: "18px !important",
    fontWeight: "500 !important",
  },
  header_inside_table_button: {
    color: "#006d0e !important",
    backgroundColor: "#ccf0d1 !important",
    border: "1px solid #b3e9b9 !important",
    borderRadius: "50px !important",
  },
  header_inside_table_details: {
    border: "1px solid rgba(0 , 0, 0, 0.25) !important",
    boxShadow: "inset 0px 0px 3px rgba(0 , 0 , 0 , 0.3) !important",
    padding: "7px 10px 7px 10px !important",
    borderRadius: "3px !important",
    backgroundColor: "#fff !important",
  },
  header_table_inside_moreHorizIcon: {
    border: "1px solid rgba(108 , 117 ,125 , 0.25) !important",
    backgroundColor: "white !important",
    borderRadius: "4px !important",
    padding: "6px 10px !important",
  },
  MoreHorizIcon_header: {
    color: "#adb5bd !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "-8px !important",
  },
});

const HomeChartTableButton = () => {
  const classes = useStyles();

  return (
    <div>
      {/* <TableContainer component={Paper} className={classes.header_table}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead >
              <TableRow>
                <TableCell className={classes.header_name}>
                Letest orders
                </TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, key: any) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={classes.header_table_insides}
              >
                <TableCell className={classes.header_table_inside} key={row.id}>
                  {row.id}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={`${classes.header_table_inside} 
               ${classes.header_table_inside_name}`}
               key={row.id}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.header_table_inside}
                  key={row.id}
                >
                  {row.email}
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.header_table_inside}
                  key={row.id}
                >
                  ${row.cost}
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.header_table_inside}
                >
                  <button className={classes.header_inside_table_button}>
                    sotuvda
                  </button>
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.header_table_inside}
                >
                  {row.date}
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.header_table_inside}
                >
                  <button className={classes.header_inside_table_details}>
                    Ma'lumot
                  </button>
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.header_table_inside}
                >
                  <button className={classes.header_table_inside_moreHorizIcon}>
                    <MoreHorizIcon className={classes.MoreHorizIcon_header} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default HomeChartTableButton;
