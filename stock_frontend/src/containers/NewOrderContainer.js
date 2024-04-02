import { useState, useEffect } from "react"
import NewOrderForm from "../components/NewOrderForm";
import NewOrderedItemForm from "../components/NewOrderedItemForm";
const NewOrderContainer = () => {

    // For NewOrderForm
    const [supermarkets, setSupermarkets] = useState([]);
    const [supermarketId , setSupermarketId] = useState(null);
    
    // For NewOrderedItemForm
    const [stocks, setStocks] = useState([]);

    // Fetching Data
    const loadStocksData = async () => {
        const response = await fetch("http://localhost:8080/stocks");
        const jsonData = await response.json();
        setStocks(jsonData);
    
    }

    const loadSupermarketsData = () => {
        return [
            {"id": 1, "name": "Tesco"},
            {"id": 2, "name": "Morrisons"},
            {"id": 3, "name": "Sainsburys"},
            {"id": 4, "name": "Lidl"},
            {"id": 5, "name": "Waitrose"}          
        ]
    }

    // Post Requests
    const postNewOrder = async (supermarketId) => {
        const response = await fetch("http://localhost:8080/orders", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "supermarketId" : supermarketId
                })
        })
        const newOrder = await response.json();
        console.log(newOrder);
    }
    
    useEffect(() => {
        loadStocksData();
        setSupermarkets(loadSupermarketsData());
    }, []);

    return ( 
        <>
        <NewOrderForm supermarkets={supermarkets} supermarketId = {supermarketId} setSupermarketId={setSupermarketId} postNewOrder={postNewOrder} />
        <NewOrderedItemForm  />
        </>
    );
}
 
export default NewOrderContainer;