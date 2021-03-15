import React, { useState } from "react";
import Modal from "react-modal";

let entry = document.location.pathname;
let entryID = entry.slice(10);
console.log(entryID);

//Styles for Modal//
const modalStyles = {
  content: {
    top: "40%",
    left: "15%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "green",
    zIndex: "10",
    height: "150px",
    width: "50vw",
  },
};

//-----------Function to return Dropdown Modal-------//
function ModalToggle() {
  const [setModal, setModalToOpen] = useState(false);
//modal with the same logic as the posting form just reversed, did not work. Internet said it should. 
  return (
    <>
      <button id="delete" disabled={false} onClick={() => setModalToOpen(true)}>
        Delete
      </button>

      <Modal
        isOpen={setModal}
        style={modalStyles}
        onRequestClose={() => setModalToOpen(false)}
      >
        <button onClick={() => setModalToOpen(false)}>x</button>
        <h3>Are you sure you want to delete this post?</h3>
        <form action={`/remove/${entryID}`} method="GET">
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
}
export default ModalToggle;
