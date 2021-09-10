import { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem";
import Button from "components/Button";
import { ToastContainer } from "react-toastify";
import { fetchImages } from "../../services/images-api";
import Loader from "components/Loader";

class ImageGallery extends Component {
  state = {
    totalHits: 0,
    images: [],
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.images;
    const prevQuery = prevProps.query;
    const prevPage = prevProps.page;
    const nextQuery = this.props.query;
    const nextPage = this.props.page;
    const notify = this.props.notify;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: "pending" });

      fetchImages(nextPage, nextQuery)
        .then((response) => {
          const { totalHits, hits } = response;

          if (nextPage === 1) {
            this.setState({
              images: [...hits],
              status: "resolved",
              totalHits,
            });
          } else {
            this.setState({
              images: [...prevImages, ...hits],
              status: "resolved",
              totalHits,
            });
          }

          if (totalHits === 0) {
            notify("No results");
          }
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  render() {
    const { images, status, error, totalHits } = this.state;
    const { onSelect, page, incrementPage } = this.props;

    const maxPage = Math.ceil(totalHits / 12);

    return (
      <div>
        <ul className="ImageGallery">
          {images.map((item) => {
            return (
              <ImageGalleryItem
                key={item.id}
                item={item}
                onClick={() => onSelect(item.largeImageURL)}
              />
            );
          })}
        </ul>
        {status === "pending" && <Loader />}

        {status === "resolved" && page < maxPage && (
          <Button page={page} onClick={incrementPage} />
        )}

        {status === "rejected" && <h1>{error.message}</h1>}
        <ToastContainer />
      </div>
    );
  }
}

export default ImageGallery;
