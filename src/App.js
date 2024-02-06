import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const YOUR_APP_ID = 'a913e0d2';
  const YOUR_APP_KEY = '7905dd7ffc36d8744893248d676879cf';

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      );
      setRecipes(response.data.hits);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Recetas de Edamam</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar recetas..."
        />
        <button type="submit">Buscar</button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.recipe.uri} className="recipe">
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <p>Servings: {recipe.recipe.yield}</p>
            <p>Calories: {Math.round(recipe.recipe.calories)}</p>
            
          </div>
        ))}
      </div>
    </div>
  );}
   export default App