//Book class : Represent a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class : UI task handle
class UI {
    static addtobooklist(book) {
        const list = document.querySelector('#book-form');
        const row = document.createElement('tr');
        row.innerHTML(
            `<td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class= "btn btn-danger btn-sm delete">X</a></td>
            `
        )
        list.appendChild(row);
    }
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static showAlert(message, classname) {
        const div = document.createElement('div');
        div.classname = `alert alert-${classname}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

    }



}

//Store Class : Handles storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }
    static addbook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}

// Display a book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event : Add a book
document.querySelector('#book-form').addEventListener('sumbit', (e) => {
    e.preventDefault(); //prevent actual sumbit
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in blanks.', 'danger');

    } else {
        const book = new Book(title, author, isbn);
        UI.addtobooklist(book); // add book to UI
        Store.addbook(book); //store book to local storage
        UI.showAlert('Book added', 'success');
        UI.clearFields();
    }
});

// Event : Remove a book