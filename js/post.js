export async function setData(URL, obj){
    try {
        
        fetch(URL, {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(obj)
            
        })


    } catch (error) {
        console.log(error);
    }
}