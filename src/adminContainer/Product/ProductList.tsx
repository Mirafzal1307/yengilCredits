import React, { useEffect } from 'react';
import { useTypedSelector } from "../../hook/useTypedSelector";
import { fetchProducts } from "../../redux/actions/productAction";
import { useActions } from "../../hook/useActions";
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
    deleteProductItem,
    getProductCreate,
    getProductItem,
    getProductSearch,
} from "../../Api/admin/AdminProductApi";
import { Button, CircularProgress, InputLabel, Tooltip } from "@mui/material";
import EditImage from "../../Images/edit.png";
import DetailsImage from "../../Images/detailsicon.svg";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link as RouterLink } from "react-router-dom";

import { useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import Modal from "../Modal/Modal";
import Notification from "../Snackbar/Notification";
import onSale from "../../Images/served.svg";
import notSale from "../../Images/notserved.svg";

import { Link as NavLink } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";


const useStyles = makeStyles({

    tableCell: {
        padding: '0 !important',
        fontStyle: 'normal !important',
        fontWeight: '300 !important',
        fontSize: '17px !important',
        color: '#000000 !important',
        borderBottom: 'solid 1px #000000 !important',
        paddingLeft: '10px !important'

    },
    tableSortLabel: {

        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '17px',
        color: '#065374 !important',
        padding: '0 !important',
        textAlign: 'left'

    },
    button: {
        padding: '0 !important',
        minWidth: '49px !important',
        cursor: 'pointer !important'
    },
    box: {
        padding: '30px 20px 1px 20px !important',
        boxShadow: '0px 0px 9px #dadada !important',
    },
    select: {
        padding: '0px !important',
        // lineHeight:"10px"
        'css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
            padding: '0px !important'
        }
    },
    searchInput: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    boxs: {
        textAlign: 'center',
    },
    h1: {

        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '22px',
        color: '#065374'

    },
    deleteButton: {
        border: 'none !important',
        background: 'transparent !important',

    },
    cancel: {
        background: '#065374 !important',
        borderRadius: '5px',
        color: '#ffffff !important',
        textTransform: 'lowercase',
        marginRight: '20px',
        padding: '9px 20px 8px 20px !important',

    },
    deletes: {
        background: '#FF4B4B !important',
        borderRadius: '5px',
        color: '#ffffff !important',
        textTransform: 'lowercase',
        margin: '0 0 0 20px !important',
        padding: '9px 20px 8px 20px !important',
    },
    h2: {
        fontSize: '17px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: '#000000'
    },
    deleteImage: {
        paddingTop: '6px !important'
    },
    addProduct: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '25px'
    },
    addProductButton: {
        background: '#065374 !important',
        borderRadius: '5px solid',
        fontStyle: 'normal !important',
        fontWeight: 'normal !important',
        fontSize: '17px !important',
        color: '#fff !important',
        textTransform: 'lowercase',
        padding: '5px 10px !important'
    },
    ProductName: {
        margin: ' 0 !important',
        fontSize: '28px !important',
        fontWeight: '600',

    },
    notFound: {
        width: '100% !important',
        height: '100% !important'
    },
    productsTitle: {
        display: 'flex !important',
        justifyContent: 'space-between !important',
        marginBottom: '25px !important',
    },
    product: {
        margin: '0 !important',
        fontSize: '28px !important',
        fontWeight: '600',
        color: '#000000',
        fontStyle: 'normal !important',
    },
    createButton: {
        background: '#065374 !important',
        borderRadius: '5px !important',
        fontStyle: 'normal !important',
        fontWeight: 'normal !important',
        fontSize: '17px !important',
        color: '#fff !important'
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
    pagination: {
        width: '315px',
        marginRight: 'unset !important',
        padding: '5px 5px 5px 5px !important'
    },
    paginationItem: {
        width: '100%',
        border: ' solid 1px #9F9F9F !important',
        margin: '0 !important',
        borderRadius: '3px !important',
        padding: '20px 14px 20px 14px !important'
    },
    imgDelete: {
        cursor: 'pointer !important'
    },
    onSale: {
        color: '#22AA00',
        margin: " 0px !important"
    },
    notSale: {
        color: '#FF4B4B',
        margin: " 0px !important"
    },
    icon: {
        textAlign: 'center',
        width: '15px',
        height: '15px',
        marginRight: '10px',

    }

})

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

interface Product {
    name: string,
    short_name: string,
    price: number,
    register_date: any,
    after_discount: number,
    availability: boolean,
    id: number,
    brand_id: number,
    category_id: number,
    discount: number,
    photo: string

}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: '# ID',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Mahsulot',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Mahsulot turkumi',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Holat',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Brand',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Amallar',
    },
];

interface EnhancedTableProps {
    numSelected?: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount?: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick } = props;
    const classes = useStyles()

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" className={classes.tableCell}>
                    <Checkbox
                        color="primary"
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        className={classes.tableCell}

                    >
                        <TableSortLabel className={classes.tableSortLabel}>
                            {headCell.label}

                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}




const ProductList: React.FC = () => {

    const { products, error, loading } = useTypedSelector(state => state.product)
    let p: number = products.totalPages
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(1);
    const [text, setText] = React.useState<string>('')
    const [pageQty, setPageQty] = useState(products.totalPages)
    const [query, setQuery] = useState('react')
    const [notify, setNotify] = React.useState<any>({ isOpen: false, message: '', type: '' });
    const [category, setCategory] = React.useState([])
    console.log(products);

    const [param, setParam] = React.useState('');
    const [prod, setProducts] = React.useState<any>();

    const handleInputChange = (e: any) => {
        setParam(e.target.value);
    };

    const getData = async () => {
        const response: any = await getProductSearch(param);
        setProducts(response.data.content);
    };
    React.useEffect(() => {
        getData();
    }, [param]);
   
    


    const classes = useStyles()
    const product: any[] = products.content
console.log(product);

    React.useEffect(() => {
        fetchProducts(`${page - 1}`)
        if (pageQty < page) {
            setPage(3)
            // props.history.replace("/");
        }
    }, [query, page]);

    React.useEffect(() => {
        getCategory()
    }, [])

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = product.map((pro) => pro.name);
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
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const [status, setStatus] = React.useState('');
    const [categoryName, setCategoryName] = React.useState('');
    const handleChange = (event: any) => {
        setStatus(event.target.value);
    };
    const handleChangeCategory = (event: SelectChangeEvent) => {
        setCategoryName(event.target.value);
    };
    const deleteUserData = async (id: any) => {
        let product = await deleteProductItem(id)
            .then(res => {
                if (res.status === 200) {
                    setNotify({
                        isOpen: true,
                        message: 'Muvaffaqiyatli o\'chirildi...',
                        type: 'error'
                    })
                } else if (res.status === 400) {
                    setNotify({
                        isOpen: true,
                        message: 'Xatolik yuz berdi...',
                        type: 'error'
                    })
                }
            })

    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getProductByID = async (id: any) => {
        const response = await getProductItem(id)
    }
    const getCategory = async () => {
        const res: any = await getProductCreate()
        setCategory(res?.data?.all_categories[0])
    }
    const { fetchProducts } = useActions()
    if (loading) {
        return <CircularProgress />
    }
    if (error) {
        return <h1>{error}</h1>
    }
    return (
        <>

            <div className={classes.productsTitle}>
                <h1 className={classes.product}>Mahsulotlar</h1>
                <Button className={classes.createButton} component={RouterLink as any} to='/product/create' sx={{textTransform: 'capitalize'}}  >+ Qo'shish</Button>
            </div>
            <Box sx={{ maxWidth: '1200px', margin: 'auto' }} >
                <Paper sx={{ width: '100%', mb: 2 }} className={classes.box}>
                    <TableContainer>

                        <div className={classes.searchInput}>
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


                            <div>
                                <FormControl sx={{ m: 1, minWidth: 120, }}>



                                    <Select

                                        displayEmpty
                                        value={status}
                                        onChange={handleChange}
                                        sx={{ padding: '0px' }}
                                        renderValue={(selected) => {
                                            if (selected?.length === 0) {
                                                return <p style={{ margin: '0px', padding: '0px !important' }}>Mahsulot turkumi </p>;
                                            }
                                            return selected;
                                        }}

                                        // className={classes.select}
                                        className=".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input "
                                    >
                                        <MenuItem value="">
                                            Barchasi
                                        </MenuItem>

                                        {category.map((cat: any, index: any) => (
                                            <MenuItem value={cat.name} >
                                                {cat.name}

                                            </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>

                            </div>
                        </div>

                        <Table
                            sx={{ minWidth: '100%' }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                // numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                            // rowCount={users.length}
                            />

                            <TableBody>

                                {
                                    param && prod ?
                                    param && prod?.map((user: any, index: any) =>  {
                                        const delProduct = () => {
                                            deleteUserData(user.id)
                                        }
                                        const getProductToUpdate = () => {
                                            getProductByID(user.id)
                                            console.log(user.id)
                                        }
                                        const getProductToDetails = () => {
                                            getProductByID(user.id)
                                            console.log(user.id)
                                        }

                                        const isItemSelected = isSelected(user.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <>
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, user.id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={user.id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox" className={classes.tableCell}>
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        align="left"
                                                        scope="row"
                                                        padding="none"
                                                        className={classes.tableCell}
                                                    >
                                                        {user?.id}
                                                    </TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>{user?.short_name}</TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>{user?.category?.name}</TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>
                                                        {user?.availability === true
                                                            ? <p className={classes.onSale} >
                                                                <img src={onSale} alt="rasm" className={classes.icon} />sotuvda</p>
                                                            : <p className={classes.notSale}>
                                                                <img src={notSale} alt="rasm" className={classes.icon} />
                                                                Sotuvda yo'q</p>}</TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>{user?.brand?.name}</TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>
                                                        <Button className={classes.button}
                                                            component={RouterLink as any} to={`/product/details/${user.id}`}
                                                            onClick={getProductToDetails}
                                                        ><img src={DetailsImage} alt="rasm bor edi" /></Button>

                                                        <Button className={classes.button}
                                                            component={RouterLink as any} to={`/product/edit/${user.id}`}
                                                            onClick={getProductToUpdate}
                                                        ><img src={EditImage}
                                                            alt="rasm bor edi" /></Button>


                                                        <Button className={classes.button} >
                                                            <Modal data={delProduct} className={classes.imgDelete} />
                                                        </Button>


                                                    </TableCell>
                                                </TableRow>
                                            </>

                                        );
                                     }
                                    )
                               
                                  :   product?.filter((val: any) => {
                                        if (!status) {
                                            return val;

                                        } else if (val?.category?.name == status) {
                                            return val;
                                        }

                                    }).map((user, index) => {

                                        const delProduct = () => {
                                            deleteUserData(user.id)
                                        }
                                        const getProductToUpdate = () => {
                                            getProductByID(user.id)
                                            console.log(user.id)
                                        }
                                        const getProductToDetails = () => {
                                            getProductByID(user.id)
                                            console.log(user.id)
                                        }

                                        const isItemSelected = isSelected(user.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <>
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, user.id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={user.id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox" className={classes.tableCell}>
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        align="left"
                                                        scope="row"
                                                        padding="none"
                                                        className={classes.tableCell}
                                                    >
                                                        {user?.id}
                                                    </TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>{user?.short_name}</TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>{user?.category?.name}</TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>
                                                        {user?.availability === true
                                                            ? <p className={classes.onSale} >
                                                                <img src={onSale} alt="rasm" className={classes.icon} />sotuvda</p>
                                                            : <p className={classes.notSale}>
                                                                <img src={notSale} alt="rasm" className={classes.icon} />
                                                                Sotuvda yo'q</p>}</TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>{user?.brand?.name}</TableCell>
                                                    <TableCell align="left" className={classes.tableCell}>
                                                        <Button className={classes.button}
                                                            component={RouterLink as any} to={`/product/details/${user.id}`}
                                                            onClick={getProductToDetails}
                                                        ><img src={DetailsImage} alt="rasm bor edi" /></Button>

                                                        <Button className={classes.button}
                                                            component={RouterLink as any} to={`/product/edit/${user.id}`}
                                                            onClick={getProductToUpdate}
                                                        ><img src={EditImage}
                                                            alt="rasm bor edi" /></Button>


                                                        <Button className={classes.button} >
                                                            <Modal data={delProduct} className={classes.imgDelete}  />
                                                        </Button>


                                                    </TableCell>
                                                </TableRow>
                                            </>

                                        );
                                    })
                                
                                }





                            </TableBody>

                        </Table>
                    </TableContainer>

                    <Pagination
                        className={classes.pagination}
                        count={products.totalPages}
                        page={page}
                        onChange={(_, num) => setPage(num)}
                        sx={{ marginY: 3, marginX: 'auto' }}
                        renderItem={
                            (item) => (
                                <PaginationItem
                                    className={classes.paginationItem}
                                    component={NavLink}
                                    to={`/product/?page${page}`}
                                    {...item}
                                    variant='outlined'
                                    shape={'rounded'}
                                />
                            )
                        }
                    />



                </Paper>
            </Box>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};

export default ProductList;
