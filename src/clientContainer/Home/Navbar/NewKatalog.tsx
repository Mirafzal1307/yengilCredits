import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';
import { Link } from "react-router-dom";
// import GlobalStyles from '@mui/material/GlobalStyles';
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ListIcon from "@mui/icons-material/List";
import { makeStyles } from "@material-ui/core/styles";
// import { getProductFromCategoryById } from "../../../Api/admin/AdminProductApi";
import { getCategoryForClient } from "../../../Api/client/ClientCategoryApi";

const useStyles = makeStyles(() => ({
  menuButton: {
    background: "rgba(255, 255, 255) !important",
    borderRadius: "34px !important",
    border: "none !important",
    color: "rgba(124, 124, 124, 0.79) !important",
    fontFamily: "Poppins !important ",
    fontSize: "14px !important",
    fontWeight: 400,
    display: "flex !important",
    alignItems: "center !important",
    transition: ".5s !important",
    height: "35px !important",
    paddingLeft: "7px !important",
    paddingRight: "4px !important",
  },
}));

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  overflow: "scroll",
  bgcolor: "#065374",
  boxShadow: 24,
  p: 2,
  height: "100%",
  display: "block",
};
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
export default function TransitionsModal(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const [category, setCategory] = React.useState<any>({});
  // console.log(category);

  const classes = useStyles();
  // const getCategoryProductById = async (id: any): Promise<any> => {
  //   await getProductFromCategoryById(id, {});
  // };
  const refresh = (): void => {
    setTimeout(() => window.location.reload(), 100);
  };
  const getCategoryForCleintPage = async (): Promise<any> => {
    const response: any = await getCategoryForClient();
    // const categories: any = response.data;
    setCategory(response.data.menu);
  };
  React.useEffect(() => {
    getCategoryForCleintPage();
  }, []);
  const [expanded, setExpanded] = React.useState<string | false>(" ");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <div>
      <Button
        onClick={handleOpen}
        className={classes.menuButton}
        sx={{ textTransform: "capitalize" }}
      >
        <ListIcon />
        <span style={{ marginLeft: "5px" }}>Katalog</span>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                color: "white",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "500",
                  fontFamily: "Poppins",
                  marginBottom: "20px",
                  marginTop: "10px",
                }}
              >
                {" "}
                Katalog{" "}
              </span>
              <span style={{ marginTop: "10px" }}>
                <CloseRoundedIcon onClick={handleClose} />
              </span>
            </Typography>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>
                  Смартфоны, телефоны, гаджеты, аксессуары
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Смартфоны, телефоны, гаджеты, аксессуары"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      onClick={refresh}
                      key={item.sub_id}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Ноутбуки, принтеры, компьютеры</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Ноутбуки, принтеры, компьютеры"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      onClick={refresh}
                      key={item.parent_id}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Телевизоры, фото-видео и аудио</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Телевизоры, фото-видео и аудио"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      onClick={refresh}
                      key={item.parent_id}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Мебель</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Мебель"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Для геймеров</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Для геймеров"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Бытовая техника</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Бытовая техника"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Все для кухни</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Все для кухни"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel8"}
              onChange={handleChange("panel8")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Книги</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Книги"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.sub_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel10"}
              onChange={handleChange("panel10")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Все для офиса, дома и сада</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Все для офиса, дома и сада"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      key={item.parent_id}
                      onClick={refresh}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Все для ремонта и строительства</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Все для ремонта и строительства"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      onClick={refresh}
                      key={item.parent_id}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Спорт товары</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Спорт товары"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Автотовары</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Автотовары"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Красота и здоровье</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Красота и здоровье"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      onClick={refresh}
                      key={item.parent_id}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Игрушки и товары для детей</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Игрушки и товары для детей"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      onClick={refresh}
                      key={item.parent_id}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Канцелярские товары</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Канцелярские товары"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      onClick={refresh}
                      key={item.parent_id}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Одежда и обувь</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Одежда и обувь"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Электротранспорт</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Электротранспорт"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel9"}
              onChange={handleChange("panel9")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Подарки и сувениры</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Подарки и сувениры"]?.map(
                  (item: any, key: any) => (
                    <Link
                      to={`/product/product-by-category/${item.sub_id}`}
                      onClick={refresh}
                      key={item.sub_id}
                    >
                      <Button
                        sx={{
                          color: "black",
                          width: "100%",
                          textAlign: "left !important",
                          justifyContent: "left !important",
                          alignItem: "left !important",
                          textTransform: "none",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
              sx={{
                border: "solid 1px #065374",
                borderRadius: "4px !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Умный дом</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "solid 1px #065374",
                }}
              >
                {category?.["Умный дом"]?.map((item: any, key: any) => (
                  <Link
                    to={`/product/product-by-category/${item.sub_id}`}
                    onClick={refresh}
                    key={item.parent_id}
                  >
                    <Button
                      sx={{
                        color: "black",
                        width: "100%",
                        textAlign: "left !important",
                        justifyContent: "left !important",
                        alignItem: "left !important",
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
