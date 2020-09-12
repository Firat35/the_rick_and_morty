import React, {useEffect, useState} from 'react'
import axios from 'axios'


const CardScreen = React.memo(({ match }) => {

    const [char, setChar] = useState({})
    const [episodeIds, setEpisodeIds] = useState('')
    const [episodeNames, setEpisodeNames] = useState([])
    const [charLocationUrl, setCharLocationUrl] = useState('')
    const [residentIds, setResidentIds] = useState('')
    const [residents, setResidents] = useState([])

    const getId = (txt) => {
        const n = txt.length
        const digits = '1234567890'
        let id = ''
        
        for(let i=n-1; i>=0 ; i--){
            if(digits.includes(txt[i])){
                id = txt[i] + id
            }
            else{
                break
            }
        }
        return id
    }

    useEffect(() => {
        if(!match.params.id)
        return
        axios.get(`https://rickandmortyapi.com/api/character/${match.params.id}`)
        .then( res => {
            // karakateri getir
            setChar(res.data) 
            // karakterin oynadığı bölümlerin id lerini getir
            let arr = []
            for(let i of res.data.episode) {
                arr.push(getId(i))  
            }
            setEpisodeIds( arr.join(',')  )
            setCharLocationUrl(res.data.location.url)
            }
        )  

    },[]);

    useEffect(() => {
        //karakterin gezenindeki karakterlerin id lerini getir
        if(!charLocationUrl)
        return
        axios.get(charLocationUrl)
        .then( res => {
                let arr = []
                for(let i of {...res.data}.residents) {
                    arr.push(getId(i))
                }
                setResidentIds(arr.filter(item => item !== match.params.id).join(','))  
            }
        )
           
    }, [charLocationUrl])

    useEffect(() => {
        //karakterin oynadığı bölümlerin isimlerini getir
        if(!episodeIds)
        return
        axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`)
        .then( res => {
                let arr = []
                if(Array.isArray(res.data)){
                    for(let i of res.data) {
                        arr.push(i)
                    }
                    setEpisodeNames(arr)
                }
                else{
                    setEpisodeNames(res.data)
                }
                
            }
        )
           
    }, [episodeIds])

    useEffect(() => {
        //karakterin gezegenindeki diğer karakterleri getir
        if(!residentIds)
        return
        axios.get(`https://rickandmortyapi.com/api/character/${residentIds}`)
        .then( res => {
                setResidents( res.data )
            }
        )         
    }, [residentIds])

        
    return <div className='flex flex-wrap items-start pa3 tc'>
        <div className='bg-light-green dib ba b--dark-gray pa3 bw2 br4 shadow-5 char'>
            <img src={char.image} alt='character'/>   
            <ul className='pl1 list tl'>
                <li className='mr0'><b>Name :</b> {char.name} </li>
                <li><b>Status :</b> {char.status} </li>
                <li><b>Species :</b> {char.species} </li>
                <li><b>Type :</b> {char.type ? char.type : "-" } </li>
                <li><b>Gender :</b> {char.gender} </li>
                <li><b>Origin :</b> { {...char.origin}.name } </li>
                <li><b>Location :</b> { {...char.location}.name  } </li> 
            </ul>
        </div>
        
        <div className='bg-light-green ba b--dark-gray bw2 br4 dib list2 pa3 tl '>
            <p className='tl mt0'><b>{ {...char.location}.name  } lokasyonundaki diğer karakterler </b></p>
            <ul className='pl0'>
                {Array.isArray(residents) ? residents.map((resident) => {
                    return <li className='dib mr3' key={resident.id}> <div className={ resident.status === 'Alive' ? 'dib si-alive': resident.status==='Dead' ? 'dib si-dead' : 'dib si-unknown' }></div>{resident.name } </li>
                }) : <li className='dib' key={residents.id}> { residents.name  }</li> }
            </ul>
        </div>

        <div className='bg-light-green ba b--dark-gray bw2 br4 dib list1 pa3 tl'>
            <p className='tl mt0'> <b> Karakterin Oynadığı Bölümler </b> </p>
            <ul className='pl0'>
                {Array.isArray(episodeNames) ? episodeNames.map((episode) => {
                    return <li className='dib mr3' key={episode.id}> <div className='dib si-unknown'></div>{episode.name } </li>
                }) : <li className='dib' key={episodeNames.id}> <div className='dib si-unknown'></div> {episodeNames.name}</li>}
            </ul>
        </div>
        {/* {console.log('Lokasyon URL',charLocationUrl)}
        {console.log('Episode IDS', episodeIds)}
        {console.log('Episode names',episodeNames)}
        {console.log('Resident IDS',residentIds)}
        {console.log('Residents',residents)} */}
    </div>

})

export default CardScreen