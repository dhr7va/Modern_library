const library = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        pages: 180
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        pages: 281
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        pages: 328
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        pages: 432
    }
];

// Function to calculate the total number of pages
function getTotalPages(library) {
    return library.reduce((total, book) => total + book.pages, 0);
}

// Function to get an array of book titles
function getBookTitles(library) {
    return library.map(book => book.title);
}

// Function to get an array of book titles published after a given year
function getBooksPublishedAfterYear(library, year) {
    return library
        .filter(book => book.year > year)
        .map(book => book.title);
}

const getBooksButton = document.getElementById("get-books-button");
const booksList = document.getElementById("books-list");

getBooksButton.addEventListener("click", function () {
    const yearInput = document.getElementById("year");
    const year = parseInt(yearInput.value);

    if (!isNaN(year)) {
        const booksPublishedAfterYear = getBooksPublishedAfterYear(library, year);

        // Display the result in the books list
        if (booksPublishedAfterYear.length > 0) {
            booksList.innerHTML = booksPublishedAfterYear.map(title => `<li>${title}</li>`).join("");
        } else {
            booksList.innerHTML = "<li>No books found published after " + year + "</li>";
        }
    } else {
        booksList.innerHTML = "<li>Invalid input. Please enter a valid year.</li>";
    }
});

// Function to calculate the average number of pages
function getAveragePages(library) {
    const totalPages = getTotalPages(library);
    return totalPages / library.length;
}

// Function to find the title of the longest book
function getLongestBook(library) {
    const longestBook = library.reduce((prev, current) => {
        return prev.pages > current.pages ? prev : current;
    });
    return longestBook.title;
}

// Function to create an object with authors and their books
function getAuthorsAndBooks(library) {
    const authorMap = {};
    library.forEach(book => {
        if (!authorMap[book.author]) {
            authorMap[book.author] = [];
        }
        authorMap[book.author].push(book.title);
    });
    return authorMap;
}

// Function to create an object with total pages by author
function getTotalPagesByAuthor(library) {
    const authorMap = {};
    library.forEach(book => {
        if (!authorMap[book.author]) {
            authorMap[book.author] = 0;
        }
        authorMap[book.author] += book.pages;
    });
    return authorMap;
}

// Function to create an object with the shortest book by author
function getShortestBookByAuthor(library) {
    const shortestBooks = {};
    library.forEach(book => {
        if (!shortestBooks[book.author]) {
            shortestBooks[book.author] = book;
        } else if (book.pages < shortestBooks[book.author].pages) {
            shortestBooks[book.author] = book;
        }
    });
    const result = {};
    for (const author in shortestBooks) {
        result[author] = shortestBooks[author].title;
    }
    return result;
}

// Display the results on the webpage
document.querySelector(".total-pages").textContent = "Total Number of Pages: " + getTotalPages(library);
document.querySelector(".book-titles").innerHTML = getBookTitles(library).map(title => `<li>${title}</li>`).join("");
document.querySelector(".average-pages").textContent = "Average Number of Pages: " + getAveragePages(library);
document.querySelector(".longest-book").textContent = "Longest Book: " + getLongestBook(library);
const authorsAndBooks = getAuthorsAndBooks(library);
document.querySelector(".authors-and-books").innerHTML = Object.keys(authorsAndBooks).map(author => {
    const books = authorsAndBooks[author].map(title => `<li>${title}</li>`).join("");
    return `<li>${author}:<ul>${books}</ul></li>`;
}).join("");
const totalPagesByAuthor = getTotalPagesByAuthor(library);
document.querySelector(".total-pages-by-author").innerHTML = Object.keys(totalPagesByAuthor).map(author => {
    return `<li>${author}: ${totalPagesByAuthor[author]} pages</li>`;
}).join("");
const shortestBookByAuthor = getShortestBookByAuthor(library);
document.querySelector(".shortest-book-by-author").innerHTML = Object.keys(shortestBookByAuthor).map(author => {
    return `<li>${author}: ${shortestBookByAuthor[author]}</li>`;
}).join("");
