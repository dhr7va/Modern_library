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

        // Clear existing list items
        booksList.innerHTML = "";

        // Display the result in the books list
        if (booksPublishedAfterYear.length > 0) {
            booksPublishedAfterYear.forEach(title => {
                const listItem = document.createElement("li");
                listItem.textContent = title;
                booksList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement("li");
            listItem.textContent = "No books found published after " + year;
            booksList.appendChild(listItem);
        }
    } else {
        const listItem = document.createElement("li");
        listItem.textContent = "Invalid input. Please enter a valid year.";
        booksList.appendChild(listItem);
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

// Display the results on the webpage using appendChild
const resultsContainer = document.getElementById("results-container");

// Books Published After a Given Year
const yearInput = document.getElementById("year");
yearInput.addEventListener("input", function () {
    const year = parseInt(yearInput.value);
    if (!isNaN(year)) {
        const booksPublishedAfterYear = getBooksPublishedAfterYear(library, year);
        const booksPublishedAfterYearElement = document.createElement("div");
        booksPublishedAfterYearElement.innerHTML = "<h2>Books Published After " + year + ":</h2>";
        const booksListElement = document.createElement("ul");
        if (booksPublishedAfterYear.length > 0) {
            booksPublishedAfterYear.forEach(title => {
                const listItem = document.createElement("li");
                listItem.textContent = title;
                booksListElement.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement("li");
            listItem.textContent = "No books found published after " + year;
            booksListElement.appendChild(listItem);
        }
        booksPublishedAfterYearElement.appendChild(booksListElement);
        resultsContainer.innerHTML = "";
        resultsContainer.appendChild(booksPublishedAfterYearElement);
    } else {
        resultsContainer.innerHTML = "";
    }
});

function displayResults() {
    const totalPagesElement = document.querySelector(".total-pages");
    const bookTitlesElement = document.querySelector(".book-titles");
    const averagePagesElement = document.querySelector(".average-pages");
    const longestBookElement = document.querySelector(".longest-book");
    const authorsAndBooksElement = document.querySelector(".authors-and-books");
    const totalPagesByAuthorElement = document.querySelector(".total-pages-by-author");
    const shortestBookByAuthorElement = document.querySelector(".shortest-book-by-author");

    // Total Number of Pages
    const totalPageText = document.createTextNode("Total Number of Pages: " + getTotalPages(library));
    totalPageText.textContent = "Total Number of Pages: " + getTotalPages(library);
    totalPagesElement.appendChild(totalPageText);

    // Book Titles
    getBookTitles(library).forEach(title => {
        const listItem = document.createElement("li");
        listItem.textContent = title;
        bookTitlesElement.appendChild(listItem);
    });

    // Average Number of Pages
    const averagePagesText = document.createTextNode("Average Number of Pages: " + getAveragePages(library));
    averagePagesElement.appendChild(averagePagesText);

    // Longest Book
    const longestBookText = document.createTextNode("Longest Book: " + getLongestBook(library));
    longestBookElement.appendChild(longestBookText);

    // Authors and Books
    const authorsAndBooks = getAuthorsAndBooks(library);
    for (const author in authorsAndBooks) {
        const authorItem = document.createElement("li");
        authorItem.textContent = author;
        const bookList = document.createElement("ul");
        authorsAndBooks[author].forEach(title => {
            const bookItem = document.createElement("li");
            bookItem.textContent = title;
            bookList.appendChild(bookItem);
        });
        authorItem.appendChild(bookList);
        authorsAndBooksElement.appendChild(authorItem);
    }

    // Total Pages by Author
    const totalPagesByAuthor = getTotalPagesByAuthor(library);
    for (const author in totalPagesByAuthor) {
        const authorText = document.createTextNode(author + ": " + totalPagesByAuthor[author] + " pages");
        const authorItem = document.createElement("li");
        authorItem.appendChild(authorText);
        totalPagesByAuthorElement.appendChild(authorItem);
    }

    // Shortest Book by Author
    const shortestBookByAuthor = getShortestBookByAuthor(library);
    for (const author in shortestBookByAuthor) {
        const authorText = document.createTextNode(author + ": " + shortestBookByAuthor[author]);
        const authorItem = document.createElement("li");
        authorItem.appendChild(authorText);
        shortestBookByAuthorElement.appendChild(authorItem);
    }
}

displayResults();