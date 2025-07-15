
const api_key = '';

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
