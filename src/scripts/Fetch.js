export async function FetchWord(link)
{
   try{
        const response = await fetch(link);
        const arrayResponse = await response.json();
        return arrayResponse;
    }
    catch(error) {
        console.log(error);
    }
}
