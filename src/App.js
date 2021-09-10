import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    selectedImageUrl: null,
    query: "",
    page: 1,
  };

  closeModal = (e) => {
    this.setState({ selectedImageUrl: null });
  };

  handleSubmit = (query) => {
    this.setState({ query, page: 1 });
  };

  handleSelectImage = (imageUrl) => {
    this.setState({ selectedImageUrl: imageUrl });
  };

  incrementPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  makeNotification = (text) => {
    toast(text, {
      autoClose: 2500,
      type: "info",
      theme: "colored",
    });
  };

  render() {
    const { selectedImageUrl, query, page } = this.state;

    return (
      <div>
        <Searchbar submit={this.handleSubmit} notify={this.makeNotification} />

        <ImageGallery
          query={query}
          onSelect={this.handleSelectImage}
          incrementPage={this.incrementPage}
          page={page}
          notify={this.makeNotification}
        />

        {selectedImageUrl && (
          <Modal handleClose={this.closeModal}>
            <img src={selectedImageUrl} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
