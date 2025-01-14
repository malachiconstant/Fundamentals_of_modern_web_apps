import axios from 'axios'

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (lat, lon) => {
  const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
  return request.then(response => {
    return response.data
  })
}
export default {getWeather}
