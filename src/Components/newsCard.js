import React, { useState, useEffect} from "react"
import Collapsible from "react-collapsible";

const NewsCard = () => {

    console.log('State Effect did render');

    const[newType, setNewType] = useState('apple')

    const[jsonArr, setJsonArr] = useState([]) // warum leeres array?

    const[title, setTitle] = useState('')

    const[lang, setNewLang] = useState('de')
    const handlechange = (newValues) => {
        setNewLang(newValues)
    }

    //const Collabs = () =>{

    useEffect(() =>{
        let loaded = true

        console.log('newType wurde neu gerendert');

        fetch(`https://newsapi.org/v2/everything?q=${newType}&language=${lang}&apiKey=33957bdcbea740f8ab8092438e8b380e`)
            .then(response => response.json())
            .then(json =>{
                if(loaded){
                    console.log(json.articles)
                    setJsonArr(json.articles)
                }
                
            } )
            return() =>{
                loaded = false
                console.log('process stopped');
            }
    }, [newType, lang])

    return(
        <>
            <div id="div1">
                <button onClick={() => setNewType ('tesla')}>Tesla</button>
                {/* <button onClick={() => setNewType ('domains=wsj.com')}>Domains</button> */}
                <button onClick={() => setNewType ('apple')}>Appel</button>
                <select name="" id="" onChange={(e) => (handlechange(e.target.value))}value={lang}>
                    <option selected value="de">Deutsch</option>
                    <option value="en">Englisch</option>
                    <option value="fr">Französisch</option>
                </select>
                <input type="text" name="" id="" onChange={(e) => setTitle(e.target.value)} />

                <button onClick={() => setNewType (title)}>Search</button>



            </div>
        
        <div id="div2">
            
        {jsonArr.map((items) =>{
            return (
            <article>

                <div>
                    <img src={items.urlToImage} alt="randome mood" />
                </div>
                <h1>{items.title}</h1>
                <Collapsible trigger="Click here">
                <p>{items.description}</p>
                </Collapsible>
                <p>{items.publishedAt}</p>
                <a href={items.url}>Read more</a>
            </article>
            )
        })}
            </div>
        </>
    )
    
}

export default NewsCard