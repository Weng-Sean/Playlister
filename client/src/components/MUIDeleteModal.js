import { useContext } from "react";
import GlobalStoreContext from "../store";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 1,
};

export default function MUIDeleteModal() {
  const { store } = useContext(GlobalStoreContext);
  let name = "";
  if (store.listMarkedForDeletion) {
    name = store.listMarkedForDeletion.name;
  }
  function handleDeleteList(event) {
    store.deleteMarkedList();
  }
  function handleCloseModal(event) {
    store.unmarkListForDeletion();
  }

  return (
    <Modal open={store.listMarkedForDeletion !== null}>
      <Box sx={style}>
        <div className="modal-dialog">
          <header className="dialog-header">Delete the {name} List?</header>
          <div id="confirm-cancel-container">
            <button
              id="dialog-yes-button"
              className="modal-button"
              onClick={handleDeleteList}
              style={{ width: 100, height: 30, fontSize: 20 }}
            >
              Confirm
            </button>
            <button
              id="dialog-no-button"
              className="modal-button"
              onClick={handleCloseModal}
              style={{ width: 100, height: 30, fontSize: 20 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
