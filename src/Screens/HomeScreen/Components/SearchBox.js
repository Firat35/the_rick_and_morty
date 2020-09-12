import React from 'react'

const SearchBox = ({searchChange}) => {
    return <div>
        <input 
        className='ph3 pv2 mb3 ba b--green bg-lightest-blue br4'
        type='search' placeholder='search characters...'
        onChange= { searchChange } />
    </div> 
}

export default SearchBox