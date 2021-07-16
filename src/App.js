import './App.css';
import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';

function App() {
    const APP_ID = "914d8fca";
    const APP_KEY = "36642867c24e62d450bde099f85c1232";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');


    useEffect(() => {
        getRecipes();
    }, [query]); 


    const getRecipes = async () =>  {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
       
              
    };

    
    const updateSearch = e =>{
        setSearch(e.target.value);
    }
    
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('')
    }


    return (
        <div className="App">
            <h1>RECIPE SEARCHER</h1>
            <form onSubmit = {getSearch} className="search-form" type="text">
                <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">Search</button>
            </form>
            <div className="recipe-container">
                <div className = "recipes">
                    {recipes.map(recipe => (
                        
                        <Recipe
                            key = {Math.random()}
                            title={recipe.recipe.label}
                            calories={recipe.recipe.calories}
                            image={recipe.recipe.image}
                            ingredients={recipe.recipe.ingredients}
                            
                            
                            >
                            
                        </Recipe>
                    ))}
                </div>
            </div>
        </div>
    )
  
 }

export default App;
