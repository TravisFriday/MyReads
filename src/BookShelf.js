import React,{Component} from 'react'
import Book from './Book'

export default class BookShelf extends Component{
    

    render(){

        
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/*creates a list item for each book with it's current status*/}
                        {this.props.bookShelfBooks.map((bk) => {
                                    return <li key={bk.id}>
                                    <Book book={bk} shelfSwitch={this.props.shelfSwitch}/>
                                </li>
                            })
                        }
                    </ol>
                </div>
            </div>
                )
            }
}
