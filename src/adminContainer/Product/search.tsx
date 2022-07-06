import React from "react";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { getProductSearch } from "../../Api/admin/AdminProductApi";

const useStyles = makeStyles({
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
});
function Search(): JSX.Element {
  const [param, setParam] = React.useState("");
  const [products, setProducts] = React.useState<any>();
  const classes = useStyles();
  const handleInputChange = (e: any): void => {
    setParam(e.target.value);
  };
  const getData = async (): Promise<any> => {
    const response: any = await getProductSearch(param);
    setProducts(response.data.content);
  };
  React.useEffect(() => {
    getData();
  }, [param]);
  return (
    <div style={{ display: "flex" }}>
      <input
        type="text"
        placeholder="Izlash..."
        onChange={handleInputChange}
        className={classes.SearchInput}
      />
      <button type="button" className={classes.SearchIcon}>
        <SearchIcon />
      </button>
      {param && products?.map((i: any) => <p key={i.id}>{i.name}</p>)}
    </div>
  );
}

export default Search;
