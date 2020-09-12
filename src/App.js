import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import CardScreen from './Screens/CardScreen/CardScreen';



const App = React.memo( () => {

    const [characters, setCharacters] =  useState([])

    useEffect(  () => {
        const fetchData = async () => {
            let arr = []
            for(let i=1; i<=34; i++){
                await axios.get(`https://rickandmortyapi.com/api/character/?page=${i}`)
                .then( res => {
                    arr = [...arr, ...res.data.results]
                })                           
            }  
            setCharacters(arr)             
        } 

        fetchData()
    }, []) 

    return <div>
        <Router>                   
            <Route 
                path="/card/:id" 
                render={(props) => (
                    <CardScreen {...props} characters={characters}  />
                )}
                 /> 
            
            <Route
                path='/' 
                exact={true} 
                render={(props) => (
                    <HomeScreen {...props} characters={characters} />
                )}
            /> 
        </Router>  
    </div>
})

export default App