import { Alert, AlertColor, Snackbar, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    top: theme.spacing(9),
  },
});

interface notifyType {
  isOpen?: boolean;
  message?: string;
  type?: AlertColor | undefined | any;
}

function Notification({
  notify,
  setNotify,
}: {
  notify: notifyType;
  setNotify: any;
}): JSX.Element {
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
}

export default Notification;
