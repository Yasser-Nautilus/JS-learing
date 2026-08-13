class Book {
  #isCheckedOut = false;
  constructor(id, title, auther) {
    this.id = id;
    this.title = title;
    this.auther = auther;
  }
  checkOut() {
    if (!this.#isCheckedOut) {
      this.#isCheckedOut = true;
      return true;
    } else {
      return false;
    }
  }
  returnBook() {
    this.#isCheckedOut = false;
  }
  getStatus() {
    return this.#isCheckedOut ? "Checked Out" : "Available";
  }
}
class Library {
  #books = new Map();
  static totalBooksInSystem = 0;

  addBook(book) {
    this.#books.set(book.id, book);
    Library.totalBooksInSystem++;
  }
  checkOutBook(bookId) {
    const book = this.#books.get(bookId);
    if (!book) return false;
    return book.checkOut();
  }
  async fetchAndAddBook(bookId) {
    try {
      const repo = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${bookId}`,
      );
      const data = await repo.json();
      const book = new Book(data.id, data.title, "Unknown");

      this.addBook(book);
      return book;
    } catch (error) {
      console.log("Failed: ", error);
      return null;
    }
  }
  getAvailableBooks() {
    const availableBooks = [];
    for (const book of this.#books.values()) {
      if (book.getStatus() === "Available") {
        availableBooks.push(book);
      }
    }
    return availableBooks;
  }
}
async function main() {
  const library = new Library();

  // إضافة كتب من API، بالتوازي (فكر في Promise.all)
  const bookIds = [1, 2, 3];
  await Promise.all(bookIds.map(id => library.fetchAndAddBook(id)));

  console.log(library.getAvailableBooks().length);   // 3

  console.log(library.checkOutBook(1));   // true
  console.log(library.checkOutBook(1));   // false (متأجر بالفعل)

  console.log(library.getAvailableBooks().length);   // 2

  console.log(Library.totalBooksInSystem);   // 3
}

main();