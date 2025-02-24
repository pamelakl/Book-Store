
export const booksDataInitialState = {
    allBooks: [{ id: 1, title: 'Harry Potter 1', author: 'JK Rolling', price: 100.80, cover: "/book_1.jpg" },
                { id: 2, title: 'Harry Potter 2', author: 'JK Rolling', price: 100.80, cover: "/book_2.jpg" },
                { id: 3, title: 'Harry Potter 3', author: 'JK Rolling', price: 115.20, cover: "/book_3.jpg" },
                { id: 4, title: 'Harry Potter 4', author: 'JK Rolling', price: 115.20, cover: "/book_4.jpg" },
                { id: 5, title: 'Harry Potter 5', author: 'JK Rolling', price: 115.20, cover: "/book_5.jpg" },
                { id: 6, title: 'Harry Potter 6', author: 'JK Rolling', price: 115.20, cover: "/book_6.jpg" },
                { id: 7, title: 'Harry Potter 7', author: 'JK Rolling', price: 115.20, cover: "/book_7.jpg" },
                { id: 8, title: 'Harry Potter 8', author: 'JK Rolling', price: 106.20, cover: "/book_8.jpg" }],
    likedBooks:  [],
    addedToCart:  []
}
   
const booksReducer = (booksData, action) =>{
    switch(action.type){
        case "ADD_LIKED_BOOK":
           const existingLikedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
          // console.log(existingLikedBooks.some((b) => b.bookID === action.Book.bookID && b.bookID === action.Book.bookID))
            const updatedLikedBooks = existingLikedBooks.some((b) => b.bookID === action.Book.bookID && b.user.id === action.Book.user.id)
        //    book.bookID === action.Book.book.bookID && book.user.id === action.Book.user.id
            ? existingLikedBooks
                : [...existingLikedBooks, action.Book];
            localStorage.setItem('likedBooks', JSON.stringify(updatedLikedBooks));
            console.log('addedToCart:', (JSON.parse(localStorage.getItem('addedToCart'))));
            return {
                ...booksData,
                likedBooks: [...booksData.likedBooks, action.Book]
            };
        case "ADD_BOOK_TO_CART":
            console.log('likedBooks:', (JSON.parse(localStorage.getItem('likedBooks'))));
            console.log('addedToCart:', (JSON.parse(localStorage.getItem('addedToCart'))));
            const existingBooksInCart = JSON.parse(localStorage.getItem('addedToCart')) || [];
           console.log(existingBooksInCart.some((b) => b.bookID === action.Book.bookID))
            const updatedBooksInCart = existingBooksInCart.some((b) => b.bookID === action.Book.bookID && b.user.id === action.Book.user.id)
            ? existingBooksInCart
                : [...existingBooksInCart, action.Book];
            localStorage.setItem('addedToCart', JSON.stringify(updatedBooksInCart));
            console.log('addedToCart:', (JSON.parse(localStorage.getItem('addedToCart'))));
            return {
                ...booksData,
                addedToCart: [...booksData.addedToCart, action.Book]
            };
        case "REMOVE_LIKED_BOOK":
            const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
            const filteredLikedBooks = likedBooks.filter(
                (book) => !(book.bookID === action.Book.book.bookID && book.user.id === action.Book.user.id)
            );
            localStorage.setItem('likedBooks', JSON.stringify(filteredLikedBooks));
            return {
                ...booksData,
                likedBooks: filteredLikedBooks,
            };
        case "REMOVE_BOOK_FROM_CART":
            const booksInCart = JSON.parse(localStorage.getItem('addedToCart')) || [];
            const filteredbooksInCart = booksInCart.filter(
                (book) => !(book.bookID === action.Book.book.bookID && book.user.id === action.Book.user.id)
            );
            localStorage.setItem('addedToCart', JSON.stringify(filteredbooksInCart));
            return {
                ...booksData,
                likedBooks: filteredbooksInCart,
            };
        case "CHANGE_BOOK_TITLE":
            const allBooks = JSON.parse(localStorage.getItem('allBooks')) || [];
            const allLikedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
            const allBooksInCart = JSON.parse(localStorage.getItem('addedToCart')) || [];
            const allBooksChanged = allBooks.map(book => ({
                ...book,
                title: book.id === action.Book.bookID ? action.Book.name : book.title,
                author: book.id === action.Book.bookID ? action.Book.bookAuthor : book.author,
                price: book.id === action.Book.bookID ? action.Book.bookPrice : book.price
            })) 
            localStorage.setItem('allBooks', JSON.stringify(allBooksChanged));
            const allLikedBooksChanged = allLikedBooks.map(book => ({
                ...book,
                title: book.id === action.Book.bookID ? action.Book.name : book.title,
                author: book.id === action.Book.bookID ? action.Book.bookAuthor : book.author,
                price: book.id === action.Book.bookID ? action.Book.bookPrice : book.price
            })) 
            localStorage.setItem('likedBooks', JSON.stringify(allLikedBooksChanged));
            const allBooksInCartChanged = allBooksInCart.map(book => ({
                ...book,
                title: book.id === action.Book.bookID ? action.Book.name : book.title,
                author: book.id === action.Book.bookID ? action.Book.bookAuthor : book.author,
                price: book.id === action.Book.bookID ? action.Book.bookPrice : book.price
            })) 
            localStorage.setItem('addedToCart', JSON.stringify(allBooksInCartChanged));
            return {
                ...booksData,
                allBooks: allBooksChanged,
                likedBooks: allLikedBooksChanged,
                addedToCart: allBooksInCartChanged
            };
        case "REMOVE_BOOK":
            const allBooks_r = JSON.parse(localStorage.getItem('allBooks')) || [];
            const allLikedBooks_r = JSON.parse(localStorage.getItem('likedBooks')) || [];
            const allBooksInCart_r = JSON.parse(localStorage.getItem('addedToCart')) || [];
            const allBooksChanged_r = allBooks_r.filter((book) => !(book.id === action.Book.book.id))
            localStorage.setItem('allBooks', JSON.stringify(allBooksChanged_r));
            const allLikedBooksChanged_r = allLikedBooks_r.filter((book) => !(book.id === action.Book.book.id))
            localStorage.setItem('likedBooks', JSON.stringify(allLikedBooksChanged_r));
            const allBooksInCartChanged_r = allBooksInCart_r.filter((book) => !(book.id === action.Book.book.id))
            localStorage.setItem('addedToCart', JSON.stringify(allBooksInCartChanged_r));
            return {
                ...booksData,
                allBooks: allBooksChanged_r,
                likedBooks: allLikedBooksChanged_r,
                addedToCart: allBooksInCartChanged_r
            };
        case "ADD_BOOK":
            console.log("recieved new book event")
            const allBooks_n = JSON.parse(localStorage.getItem('allBooks')) || [];
            const newBook = { id: action.Book.nextId, title: action.Book.title, author: action.Book.author, price: action.Book.price, cover: "/general_book.jpg" }
            const updatedBooks = [...allBooks_n, newBook]
            localStorage.setItem('allBooks', JSON.stringify(updatedBooks))
            return {
                ...booksData,
                allBooks: [...booksData.allBooks, newBook]
            };
        default: 
            return {...booksData};

    }
}

export default booksReducer;