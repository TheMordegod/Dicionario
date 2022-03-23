export async function FetchWord(link)
{
    try{
        const response = await fetch(link);
        const arrayResponse = await response.json();
        const objectsFromResponse = arrayResponse[0]
        return objectsFromResponse;
    }
    catch(e){
        console.log(e)
    }
}