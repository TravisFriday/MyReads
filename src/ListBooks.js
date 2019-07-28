import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'




export default class ListBooks extends Component{
    
   render(){
    
    const {shelfSwitch} = this.props;
    

    //filter the books into it's respective shelf

    const currentlyReading = this.props.books.filter((book) => book.shelf === this.props.shelfType[0])
    const wantToRead =this.props.books.filter((book) => book.shelf === this.props.shelfType[1])
    const read =this.props.books.filter((book) => book.shelf === this.props.shelfType[2])
    
   return(
    <div className="list-books">
        <div className="list-books-content">
         <div>
          <BookShelf bookShelfTitle='Currently Reading' bookShelfBooks={currentlyReading} shelfSwitch={shelfSwitch} />

          <BookShelf bookShelfTitle='Want to Read' bookShelfBooks={wantToRead} shelfSwitch={shelfSwitch} />
          
          <BookShelf bookShelfTitle='Finished Reading' bookShelfBooks={read} shelfSwitch={shelfSwitch} />
        </div>
      </div>
         <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
    </div>
  )
}
}
