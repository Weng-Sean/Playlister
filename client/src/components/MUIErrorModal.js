import { useContext } from "react";
import GlobalStoreContext from "../store";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "transparent",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 4,
  padding: 0,
};

export default function MUIErrorModal() {
  const { store } = useContext(GlobalStoreContext);

  function handleCloseModal() {
    store.setErrorMessage(null);
  }

  return (
    <Modal open={store.errorMessage !== null}>
      <Box sx={style}>
        <div className="modal-dialog">
          <header className="dialog-header">
            <Alert
              style={{ fontSize: 20, width: "90%", height: 100 }}
              severity="error"
            >
              {store.errorMessage}
            </Alert>
          </header>
          <div className="ErrorModalSouth">
            <Button
              variant="contained"
              className="ErrorModalButton"
              onClick={handleCloseModal}
            >
              Try Again
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
