export const addLikedBookAction = (Book) => ({
    type: "ADD_LIKED_BOOK",
    Book
});

export const removeLikedBookAction = (Book) => ({
    type: "REMOVE_LIKED_BOOK",
    Book
})

export const addBookToCartAction = (Book) => ({
    type: "ADD_BOOK_TO_CART",
    Book
});

export const removeBookFromCartAction = (Book) => ({
    type: "REMOVE_BOOK_FROM_CART",
    Book
});

export const changeBookSettingsAction = (Book) => ({
    type: "CHANGE_BOOK_TITLE",
    Book
})

export const removeBookAction = (Book) => ({
    type: "REMOVE_BOOK",
    Book
})

export const addNewBookAction = (Book) => ({
    type: "ADD_BOOK", 
    Book
})