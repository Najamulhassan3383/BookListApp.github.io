//book class:: represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//ui class:: handle events in ui
class UI {
    static display_books() {

        const books = store.getbook();
        books.forEach((book) => UI.addbooktolist(book));


    }

    static addbooktolist(book) {
        const list = document.querySelector('.book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td> <a href = "#" class = "btn btn-danger btn-sm delete">X
            </a> </td>
            `;
        list.appendChild(row);
    }

    static showalert(message, classname) {
        const div = document.createElement('div');
        div.className = `alert alert-${classname}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);


        //disappear after 3 seconds
        setTimeout(() =>
            document.querySelector('.alert').remove()
            , 2000);

    }

    //clear the fields
    static clearfields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }

    static deletebook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}

//store class:: handle storage
class store {
    static getbook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }

    static addbook(book) {
        const books = store.getbook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removebook(isbn) {
        const books = store.getbook();
        books.forEach((book, index) => {
            if (books.isbn === isbn) {
                books.splice(index, 1);
            }

        });
        localStorage.setItem('books', JSON.stringify(books));


    }
}

//envent:: dispaly books

document.addEventListener('DOMContentLoaded', UI.display_books);


//event:: add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    console.log("i am being called");
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    //validating a book entry
    if (title === '' || author === '' || isbn === '') {
        UI.showalert('Plz fill in all the places', 'danger');

    }
    else {
        const book = new Book(title, author, isbn);
        console.log(book);

        //adding a book
        UI.addbooktolist(book);


        //add book to the store
        store.addbook(book);

        //show alert

        UI.showalert('Book Has Been Added', 'success');


        //clearing the fiels
        UI.clearfields();


    }







});


//event:: remove a book in ui and local storage

document.querySelector('.book-list').addEventListener('click', (e) => {

    //remove book from UI
    UI.deletebook(e.target);



    //remove book from local storage
    store.removebook()
    //show alert message
    UI.showalert("Book Deleted", 'success')
})