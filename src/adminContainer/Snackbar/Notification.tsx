import { Alert, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";

const theme = createTheme();

const useStyles = makeStyles({
  root: {
    top: theme.spacing(9),
  },
});

const Notification = (props: any) => {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = (event?: any, reason?: any): any => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <div>
      <Snackbar
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          severity={notify.type}
          onClose={() => {
            handleClose();
          }}
        >
          {notify.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;