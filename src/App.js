import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
// import Loader from "./components/Loader";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        <Searchbar />
        <ImageGallery />
        {/* <Button /> */}
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />

        {showModal && (
          <Modal handleClose={this.toggleModal}>
            <img src="" alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
