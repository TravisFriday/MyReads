import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

export default class SearchBooks extends Component {
  state = {
    searchBooks: [],
  };

  updateQuery = (query) => {
    !query
      ? this.setState({ searchBooks: [] })
      : BooksAPI.search(query, 8).then((books) => {
          this.setState({
            searchBooks: books.error ? [] : books,
          });
        });
  };

  render() {
    // update book.shelf
    const bookCollection = this.state.searchBooks.map((searchBook) => {
      const bookMatch = this.props.books.find((book) => {
        return book.id === searchBook.id;
      });
      searchBook.shelf = bookMatch ? bookMatch.shelf : "none";

      return searchBook;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search By Book Author Or Title"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {bookCollection.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelfSwitch={this.props.shelfSwitch}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
