let books = null;
let addBook = null;
let overlay = null;
let modal = null;

const myLibrary = [
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        pages: 768,
        read: true,
    },
    {
        title: "Narnia",
        author: "IDK",
        pages: 345,
        read: false,
    }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    for (const [i, literature] of myLibrary.entries()) {
        const book = document.createElement("div");
        book.classList.add("book");
        for (const prop in literature) {
            book.innerHTML += `${prop}: ${literature[prop]}` + "<br>";
        }

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.onclick = () => {
            myLibrary.splice(i, 1);
            books.innerHTML = "";
            displayBooks();
        };

        const readStatus = document.createElement("button");
        toggleReadStatus(readStatus, i);
        readStatus.onclick = () => {
            myLibrary[i].read = !myLibrary[i].read;
            toggleReadStatus(readStatus, i);
        };

        books.appendChild(book);
        book.appendChild(readStatus);
        book.appendChild(remove);
    }
}

function toggleReadStatus(readStatus, i) {
    if (myLibrary[i].read) {
        readStatus.textContent = "Read";
        readStatus.classList.add("read");
    } else {
        readStatus.textContent = "Not Read";
        readStatus.classList.remove("read")
    }
}

window.onload = () => {
    books = document.querySelector("#books");
    displayBooks();

    addBook = document.querySelector("#add-book");
    overlay = document.querySelector(".overlay");
    modal = document.querySelector(".modal");
    addBook.onclick = () => {
        overlay.classList.toggle("active");
        modal.classList.toggle("active");

        overlay.onclick = () => {
            overlay.classList.toggle("active");
            modal.classList.toggle("active");
        }; 
    };

}
