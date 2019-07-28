import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

export default class BooksApp extends Component {

  state = {
    //list of all the current books
    books: [],
    shelfType: ['currentlyReading', 'wantToRead', 'read'],
  }

  //API call to get the books that are on the shelfs
  componentDidMount() {
    BooksAPI.getAll().then(books => {
        this.setState({books})
      })
  }

  //Moves a book from it's current shelf
  shelfSwitch = (book, shelf) => {
    book.shelf = shelf
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([book])
    }))
    BooksAPI.update(book, shelf)
  }
  //returns a book
  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks books={this.state.books} shelfSwitch={this.shelfSwitch} shelfType={this.state.shelfType}/>
          </div>
        )}/>

        <Route path="/search" render={({history}) => (
        <SearchBooks shelfSwitch={this.shelfSwitch} history={history} books={this.state.books}/>)}/>
      </div>
    )
  }
}

 
