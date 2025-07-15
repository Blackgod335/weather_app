
const api_key = '985f60bdb3bc15276124c9627c35b72d';

export default async function fetchData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        const data = await response.json()
        console.log(data)
        return data
    }
    catch(err){
        return err.message
        console.log(Error.message)
    }

}