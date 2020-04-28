import React, { Component } from "react";
import { Route, Switch, NoMatch } from "react-router-dom";
import SearchBooks from "./Components/SearchBooks";
import ListBooks from "./Components/ListBooks";
import * as BooksAPI from "./Components/BooksAPI";
import "./App.css";

export default class BooksApp extends Component {
  state = {
    //list of all the current books
    books: [],
  };

  //API call to get the books that are on the shelfs
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  //Moves a book from it's current shelf
  shelfSwitch = (book, shelf) => {
    book.shelf = shelf;
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id).concat([book]),
    }));
    BooksAPI.update(book, shelf);
  };
  //returns a book
  render() {
    const shelfType = ["currentlyReading", "wantToRead", "read"];
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <ListBooks
                  books={this.state.books}
                  shelfSwitch={this.shelfSwitch}
                  shelfType={shelfType}
                />
              </div>
            )}
          />

          <Route
            path="/search"
            render={({ history }) => (
              <SearchBooks
                shelfSwitch={this.shelfSwitch}
                history={history}
                books={this.state.books}
              />
            )}
          />
          <Route render={() => <h1>404 Not Found</h1>}>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    );
  }
}
