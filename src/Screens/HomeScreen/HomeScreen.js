import React, { useState, useEffect } from 'react'
import CardList from './Components/CardList'
import SearchBox from './Components/SearchBox'

const HomeScreen = ({characters, nextChars}) => {

    const [searchField, setSearchField] =  useState('')
    const [chars, setChars] = useState([])
    const [showMore,setShowMore] = useState(true);
    const [index,setIndex] = useState(0);

    useEffect(() => {
        setChars(characters)
      }, [characters]);
   
    const filteredChars = [...new Set([...chars, ...nextChars])].filter(user =>{
        return user.name.toLowerCase().includes(searchField.toLowerCase())
        })

    const handleChange = (e) => {
        setSearchField(e.target.value);
    }

    const loadMore = () => {
        const newIndex = index + 20
        const newShowMore = newIndex < 380
        const arr = nextChars.slice(index, newIndex)
        setChars(chars => [...chars, ...arr ]  ) 
        setIndex(newIndex)   
        setShowMore(newShowMore)
    }


    return <div className='tc'>
        <h1 className='f2 lh-title courier mv1'>THE RICK AND MORTY</h1>
        <SearchBox searchChange = { handleChange }/>
        <CardList characters= { searchField ? filteredChars : chars } />
        {!searchField && showMore && <button className='f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-purple mv4' onClick={loadMore}> Load More... </button>}
    </div>
}
export default HomeScreen


