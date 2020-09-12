import React from 'react'
import {Link} from 'react-router-dom'

const Card = ({character}) => {

    const location = {
        pathname: '/Card/' + character.id ,
        state: { fromDashboard: true }
      }

    return <div className='tc bg-light-green dib b3 pa3 ma2 grow bw2 shadow-5 br4 mw5'>
        <div >
            <Link to = {location } > <img src={character.image} alt='characters'/> </Link>
        </div>
        
        <div className='mv0'>
            <Link className='f4 fw6 db dark-green no-underline underline-hover mv0 pa0 h3 ' to = { '/Card/' + character.id }> <h5 className='pv3 mv0'>{character.name}</h5> </Link>
            <div className='f6 mv0 tl' > <div className={ character.status === 'Alive' ? 'dib si-alive': character.status==='Dead' ? 'dib si-dead' : 'dib si-unknown' }></div> {character.status} - {character.species} </div>
            
        </div>
    </div>
            
        
    
}

export default Card;