import React, { Component } from "react";

export default class Book extends Component {
  //Handles select input on book, to change the bookshelf.
  onChange = (event) => {
    const shelf = event.target.value;
    console.log(event.target.value);

    this.props.shelfSwitch(this.props.book, shelf);
  };

  render() {
    const { book } = this.props;

    //if the book cover exists it will be displayed, else, a blank cover will be displayed
    let img;
    if (book.imageLinks) {
      img = book.imageLinks.thumbnail;
    } else {
      img = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
    }

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundPosition: "center",
              backgroundImage: `url("${img}")`,
              backgroundSize: "cover",
            }}
          />

          <div className="book-shelf-changer">
            <select onChange={this.onChange} value={book.shelf}>
              <option value="" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Finished Reading</option>
              <option value="none" selected="selected">
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors
            ? book.authors.map((author) => <p key={author}>{author}</p>)
            : null}
        </div>
      </div>
    );
  }
}
