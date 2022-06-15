import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';
import { getCategoryForClient } from '../../../Api/client/ClientCategoryApi';
import { getProductFromCategoryById } from '../../../Api/admin/AdminProductApi';
import { Link } from 'react-router-dom';
// import GlobalStyles from '@mui/material/GlobalStyles';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ListIcon from "@mui/icons-material/List";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
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
}))


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    overflow: 'scroll',
    bgcolor: '#065374',
    boxShadow: 24,
    p: 2,
    height: '100%',
    display: 'block'
};
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = React.useState<any>({});
    const classes = useStyles()
    React.useEffect(() => {
        getCategoryForCleintPage();
    }, []);
    const getCategoryProductById = async (id: any) => {
         await getProductFromCategoryById(id, {});
    };
    const refresh = () => {
        setTimeout(() => window.location.reload(),
            100)
    }
    const getCategoryForCleintPage = async () => {
        let response: any = await getCategoryForClient();
        let categories: any = response.data;
        setCategory(response.data.menu);
    };
    const [expanded, setExpanded] = React.useState<string | false>(' ');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    return (
        <div>
            <Button onClick={handleOpen} className={classes.menuButton} sx={{ textTransform: 'capitalize' }} >
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
                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ color: 'white', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '24px', fontWeight: '500', fontFamily: 'Poppins', marginBottom: '20px', marginTop: '10px' }}  >  Katalog </span>
                            <span style={{ marginTop: '10px' }} >
                                <CloseRoundedIcon onClick={handleClose} />
                            </span>
                        </Typography>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography >Telefonlar va smartfonlar</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Telefonlar va smartfonlar"]?.map((item: any, key: any) => {
                                    const getCategory  = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}  >
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography>Uy jihozlari</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Uy jihozlari"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography >Televizorlar va videotexnikalar</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Televizorlar va videotexnikalar"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography>Sport va dam olish</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Sport va dam olish uchun mahsulotlar"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}


                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography >Sog'lik va go'zallik</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Sog'lik va go'zallik mahsulotlari"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography>Qurilish va ta'mirlash </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Qurilish va ta'mirlash uchun mahsulotlar"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography >Maishiy texnika</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Maishiy texnika"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography >Kompyuterlar va orgtexnika</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Kompyuterlar va orgtexnika"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}


                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography>Bolalar mahsulotlari</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Bolalar mahsulotlari"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography >Avto jihozlar</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Avto jihozlar"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} key={key} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')} sx={{ border: 'solid 1px #065374', borderRadius: '4px !important' }} >
                            <AccordionSummary
                                aria-controls="panel1d-content" id="panel1d-header"
                            >
                                <Typography >Audio tizimlar</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', borderTop: 'solid 1px #065374' }} >
                                {category?.["Audio tizimlar"]?.map((item: any, key: any) => {
                                    const getCategory = () => {
                                        getCategoryProductById(item.parent_id);
                                    };
                                    return (
                                        <Link to={`/product/product-by-category/${item.sub_id}`} onClick={refresh} >
                                            <Button sx={{ color: 'black', width: '100%', textAlign: 'left !important', justifyContent: 'left !important', alignItem: 'left !important', textTransform: 'capitalize' }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
