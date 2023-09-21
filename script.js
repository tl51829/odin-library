let books = null;
let addBook = null;
let overlay = null;
let modal = null;
let submitBtn = null;

let myLibrary = [
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

// Display all books and its information in body
function displayBooks() {
    for (const [i, literature] of myLibrary.entries()) {
        const book = document.createElement("div");
        book.classList.add("book");
        for (const prop in literature) {
            if (prop == "read") {
                continue;
            }
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

        book.appendChild(readStatus);
        book.appendChild(remove);
        books.appendChild(book);
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

    submitBtn = document.querySelector("#submit");
    const form = document.querySelector("form");
    const newTitle = document.querySelector("#title");
    const newAuthor = document.querySelector("#author");
    const newPages = document.querySelector("#pages");
    const newIsRead = document.querySelector("#isRead");
    submitBtn.onclick = (event) => {
        let newBook = new Book(newTitle.value, newAuthor.value, newPages.value, newIsRead.checked);
        myLibrary.push(newBook);

        books.innerHTML = "";
        displayBooks();
        event.preventDefault();

        overlay.classList.remove("active");
        modal.classList.remove("active");

        form.reset();
    };
}
