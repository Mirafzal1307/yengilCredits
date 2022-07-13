import React from "react";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { Box, LinearProgress, Tooltip } from "@mui/material";
import { MINIO_FULL_ENDPOINT_FOR } from "../../constants/ApiConstants";
import edit from "./images/edit.svg";
import Modal from "../Modal/Modal";
import Notification from "../Snackbar/Notification";
import { useActions } from "../../hook/useActions";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { deleteBrandData, getBrand } from "../../Api/admin/AdminBrandApi";

// console.warn = () => {};

const useStyles = makeStyles({
  editButton: {
    background: "transparent",
    padding: 0,
    border: "none",
    cursor: "pointer",
  },
  titleRows: {
    color: "#065374 !important",
    fontFamily: "Arial !important",
    fontWeight: "600 !important",
    fontSize: "17px !important",
    margin: 0,
    paddingTop: "0 !important",
  },
  forValueCols: {
    color: "#000 !important",
    fontSize: "17px !important",
    fontFamily: "Poppins !important",
    fontWeight: "300 !important",
    margin: 0,
  },
  brandImages: {
    width: "50px !important",
    height: "50px !important",
    borderRadius: "5px !important",
  },
  forCell: {
    display: "block !important",
    margin: "auto !important",
  },
});

function BrandTable(): JSX.Element {
  const [notify, setNotify] = React.useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const { brands, error, loading } = useTypedSelector((state) => state.brand);
  const { fetchBrands } = useActions();
  React.useEffect(() => {
    fetchBrands();
  }, []);
  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }

  const deleteData = async (id: number): Promise<any> => {
    await deleteBrandData(id)
      .then((res: any) => {
        if (res.status === 200) {
          setNotify({
            isOpen: true,
            message: "Создан успешно.",
            type: "success",
          });
        }
      })
      .catch(() => {
        setNotify({
          isOpen: true,
          message: "Что-то пошло не так.",
          type: "error",
        });
      });
  };

  const getBrandByID = async (id: number): Promise<void> => {
    await getBrand(id);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
            <TableCell className={classes.titleRows} align="center">
              Фото
            </TableCell>
            <TableCell className={classes.titleRows} align="center">
              Название
            </TableCell>
            <TableCell className={classes.titleRows} align="center">
              Количество
            </TableCell>
            <TableCell className={classes.titleRows} align="center">
              Действия
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((item: any, key: any) => {
            const delData = (): void => {
              deleteData(item.id);
            };
            const getBrandToUpdate = (): void => {
              getBrandByID(item.id);
            };
            return (
              <TableRow style={{ alignItems: "center" }} key={item.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
                <TableCell className={classes.forCell}>
                  <img
                    src={`${MINIO_FULL_ENDPOINT_FOR}/brand/${item.photo_name}`}
                    alt="img"
                    className={classes.brandImages}
                  />
                </TableCell>
                <TableCell
                  className={classes.forValueCols}
                  style={{ textAlign: "center" }}
                >
                  {" "}
                  {item.name}
                </TableCell>
                <TableCell
                  className={classes.forValueCols}
                  style={{ textAlign: "center" }}
                >
                  {" "}
                  {item.products_count}
                </TableCell>
                <TableCell>
                  <Link to={`/brand/admin/edit-page/${item.id}`}>
                    <Tooltip title="Edit">
                      <button
                        type="button"
                        className={classes.editButton}
                        onClick={getBrandToUpdate}
                      >
                        <img src={edit} alt="rasm bor edi" />
                      </button>
                    </Tooltip>
                  </Link>
                  <Modal data={delData} to="brand" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default BrandTable;
