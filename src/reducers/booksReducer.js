
export const booksDataInitialState = {
    likedBooks:  [],
    addedToCart:  []
}
   
const booksReducer = (booksData, action) =>{
    switch(action.type){
        case "ADD_LIKED_BOOK":
           const existingLikedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
           console.log(existingLikedBooks.some((b) => b.bookID === action.Book.bookID))
            const updatedLikedBooks = existingLikedBooks.some((b) => b.bookID === action.Book.bookID)
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
            const updatedBooksInCart = existingBooksInCart.some((b) => b.bookID === action.Book.bookID)
            ? existingBooksInCart
                : [...existingBooksInCart, action.Book];
            localStorage.setItem('addedToCart', JSON.stringify(updatedBooksInCart));
            console.log('addedToCart:', (JSON.parse(localStorage.getItem('addedToCart'))));
            return {
                ...booksData,
                addedToCart: [...booksData.addedToCart, action.Book]
            };

            // const updatedCart = [...booksData.addedToCart, action.Book];
            // localStorage.setItem('addedToCart', JSON.stringify(updatedCart));
            // return {
            //     ...booksData,
            //     addedToCart: updatedCart,
            // };
            // return {
            //     ...booksData,
            //     //likedBooks: booksData.likedBooks.concat(action.Book)
            //     addedToCart: [...booksData.addedToCart, action.Book]
            // };
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
        default: 
            return {...booksData};

    }
}

export default booksReducer;