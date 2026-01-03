const mongoose = require('mongoose');
const config = require('config');

const MONGODB_URL = config.get('mongoDBUrl')

const connectToMongoDB = async () => { 
    try{
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB database connected!')
    } catch(err){
        console.log('MongoDB database connection error!')

        process.exit(1);
    }
};

const disconnectFromMongoDB = async () => {
    await mongoose.disconnect();
    console.log('MongoDB database disconnected successfuly!')
};

const initDB = async() => {
    console.log("started");
    const database = mongoose.connection.db;
    const booksCollection = database.collection("books");
    console.log("trying to initialize");
    const books = [
        { id: 1, title: 'Harry Potter 1', author: 'JK Rolling', price: 100.80, cover: "uploads/book_1.jpg" },
        { id: 2, title: 'Harry Potter 2', author: 'JK Rolling', price: 100.80, cover: "uploads/book_2.jpg" },
        { id: 3, title: 'Harry Potter 3', author: 'JK Rolling', price: 115.20, cover: "uploads/book_3.jpg" },
        { id: 4, title: 'Harry Potter 4', author: 'JK Rolling', price: 115.20, cover: "uploads/book_4.jpg" },
        { id: 5, title: 'Harry Potter 5', author: 'JK Rolling', price: 115.20, cover: "uploads/book_5.jpg" },
        { id: 6, title: 'Harry Potter 6', author: 'JK Rolling', price: 115.20, cover: "uploads/book_6.jpg" },
        { id: 7, title: 'Harry Potter 7', author: 'JK Rolling', price: 115.20, cover: "uploads/book_7.jpg" },
        { id: 8, title: 'Harry Potter 8', author: 'JK Rolling', price: 106.20, cover: "uploads/book_8.jpg" },
    
        // Lord of the Rings
        { id: 9, title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', price: 120.00, cover: "uploads/lotr_1.jpg" },
        { id: 10, title: 'The Two Towers', author: 'J.R.R. Tolkien', price: 120.00, cover: "uploads/lotr_2.jpg" },
        { id: 11, title: 'The Return of the King', author: 'J.R.R. Tolkien', price: 120.00, cover: "uploads/lotr_3.jpg" },
    
        // Percy Jackson
        { id: 12, title: 'The Lightning Thief', author: 'Rick Riordan', price: 90.00, cover: "uploads/pj_1.jpg" },
        { id: 13, title: 'The Sea of Monsters', author: 'Rick Riordan', price: 90.00, cover: "uploads/pj_2.jpg" },
        { id: 14, title: 'The Titan\'s Curse', author: 'Rick Riordan', price: 90.00, cover: "uploads/pj_3.jpg" },
    
        // The Hunger Games
        { id: 15, title: 'The Hunger Games', author: 'Suzanne Collins', price: 95.50, cover: "uploads/hg_1.jpg" },
        { id: 16, title: 'Catching Fire', author: 'Suzanne Collins', price: 95.50, cover: "uploads/hg_2.jpg" },
        { id: 17, title: 'Mockingjay', author: 'Suzanne Collins', price: 95.50, cover: "uploads/hg_3.jpg" },
    ];
    
    for(const book of books){
        const existingBook = await booksCollection.findOne({ id: book.id });

        if (!existingBook) {
            await booksCollection.insertOne(book);
            console.log(`Inserted book: ${book.id}`);
        } else {
            console.log(`Book ${book.id} already exists, skipping initialization.`);
        }
    }
    console.log("initialized!")
}

module.exports = {
    connectToMongoDB,
    disconnectFromMongoDB,
    initDB
}