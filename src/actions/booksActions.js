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