import { useState, createContext } from "react";
import axios from "axios";
const ClimaContext = createContext()

const ClimaProvider =({children}) => {
   const [busqueda, setBusqueda] = useState({
        ciudad:'',
        pais:''
    })

    const [resultado, setResultado] = useState({
    
    })
    const [cargando, setCargando] = useState(false)
    const [noResultado, setNoResultado] = useState(false)
    
    const datosBusqueda=  e=>{
        setBusqueda({
            ...busqueda,[e.target.name]:e.target.value
        })
    }

    const consultarClima = async datos =>{
       setCargando(true)
       setNoResultado(false)

       
        try {
            const{ciudad, pais} = datos
            const appId = import.meta.env.VITE_API_KEY
            const url =`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`
            const {data} = await axios(url)
            const {lat,lon} = data[0]
            console.log(lat,lon)

            const urlClima =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}` 
            const {data : clima} = await axios(urlClima)
            setResultado(clima)
            
        } catch (error) {
            setNoResultado('No hay resultados')

        }finally{
            setCargando(false)
        }
    }

    return(
        <ClimaContext.Provider
        value={{noResultado,cargando,resultado,busqueda, datosBusqueda, consultarClima}}
        >
            {children}

        </ClimaContext.Provider>
    )

}
export{
    ClimaProvider
}
export default ClimaContext