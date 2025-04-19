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
        { 
            id: 1, 
            title: 'Harry Potter 1', 
            author: 'JK Rolling', 
            price: 100.80, 
            cover: "/book_1.jpg" 
        },
        {  
            id: 2, 
            title: 'Harry Potter 2', 
            author: 'JK Rolling', 
            price: 100.80, 
            cover: "/book_2.jpg" 
        },
        { 
            id: 3, 
            title: 'Harry Potter 3', 
            author: 'JK Rolling', 
            price: 115.20, 
            cover: "/book_3.jpg" 
        },
        { 
            id: 4, 
            title: 'Harry Potter 4', 
            author: 'JK Rolling', 
            price: 115.20, 
            cover: "/book_4.jpg" 
        },
        { 
            id: 5,
            title: 'Harry Potter 5', 
            author: 'JK Rolling', 
            price: 115.20, 
            cover: "/book_5.jpg" 
        },
        { 
            id: 6, 
            title: 'Harry Potter 6', 
            author: 'JK Rolling', 
            price: 115.20, 
            cover: "/book_6.jpg" 
        },
        { 
            id: 7, 
            title: 'Harry Potter 7', 
            author: 'JK Rolling', 
            price: 115.20, 
            cover: "/book_7.jpg" 
        },
        { 
            id: 8, 
            title: 'Harry Potter 8', 
            author: 'JK Rolling', 
            price: 106.20, 
            cover: "/book_8.jpg" 
        }
    ]
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