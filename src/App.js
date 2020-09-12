import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import CardScreen from './Screens/CardScreen/CardScreen';



const App = React.memo( () => {

    const [characters, setCharacter] =  useState([])
    const [nextChars, setNextChars] = useState([])

    useEffect(  () => {
        const fetchData = async () => {
            
            await axios.get(`https://rickandmortyapi.com/api/character/?page=1`)
            .then( res => {
            setCharacter(res.data.results)
            })

            var arr = []
            for(let i=2; i<=20; i++){
                 await axios.get(`https://rickandmortyapi.com/api/character/?page=${i}`)
                .then( res => {
                 arr = arr.concat(res.data.results)
                })                           
            }  
            setNextChars(arr)             
        }
        
        fetchData()
        
    }, []) 

    return <div>
        <Router>                   
            <Route 
                path="/card/:id" 
                component={ CardScreen }
                 /> 
            
            <Route
                path='/' 
                exact={true} 
                render={(props) => (
                    <HomeScreen {...props} characters={characters} nextChars= {nextChars} />
                )}
            /> 
        </Router>  
    </div>
})

export default App