export const refetchBooks = async () => {
    try{
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        console.log(data);
        return data.data.books;
    }
    catch(error){
        console.error("Error fetching books:", error);
    }
}