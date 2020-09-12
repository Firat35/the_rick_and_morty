import React from 'react'
import Card from './Card'

const CardList =  ({characters}) => {
   
    return  <div>
       {  characters.map( (character) =>  <Card character = { character } key = { character.id}/> ) }
    </div>
}

export default CardList