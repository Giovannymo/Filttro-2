export async function removeItem(URL, id){
    try {
        let config = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        };      
        const response = await fetch(URL+id, config);
        const data = await response.json();

        // now do whatever you want with the data  
         console.log(data);

    }catch (error) {
        console.log(error)
    }



}