import React, { useEffect, useState } from "react";
import close_button from './assets/close_button.jpg'

//Note: For checking what the are the info that a particular api returns can be checked 
//      in the console by just printing the data in console.log() after fetching it

const API_KEY = import.meta.env.VITE_API_KEY;
  
//layout of the game in the card
function GameCard({games, onClick}){
  return(
    <div className="game-card" onClick={onClick}>
      <img src={games.background_image} alt={games.name} className="game-img-on-the-card" ></img>
      <h3 className="game-name-on-the-card">{games.name}</h3>
      <p className="game-info-on-the-card">Rating: {games.rating}</p>
      <p className="game-info-on-the-card">Released: {games.released}</p>
    </div>
  )
}

//implementing the search bar and its logic
function SearchBar({onselect, onclickedGame}){
  //for storing the typed character
  const [search,setsearch]=useState("");
  //array for storing the matched game with the character entered by user
  const [suggestion,setsuggestion]=useState([]);

  useEffect(()=>{
    //if seacrh has only 2 characters, then no suggestion array will be
    if (search.trim().length<2){
      setsuggestion([]);
      return;
    }

    //fetching the game based on the user typed character from the api and storing it in setsuggestion array
    const searchGame = setTimeout(async()=>{
      try{
        const url=`https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`;
        const response=await fetch(url);
        const data= await response.json();
        setsuggestion(data.results);
      }
      catch(error){
        console.log("Something went wrong...",error);
      }
    },300);
    //to remove the unecessary api call due to the timeout function
    return () => clearTimeout(searchGame); 
  },[search]);

  //after the game had been displayed in the drop down
  const afterSearch=(game)=>{
    //send the game to whereever this component will be called (in app component)
    onselect(game);
    //empty the values once the search is done
    setsearch("");
    setsuggestion([]);
  }

  return(
    <div>
      <div className="search">
        <input type="text" placeholder="Enter game name..." className="searchbar" onChange={(e)=>setsearch(e.target.value)}></input>
      </div>

      {/* when the suggestion array is not empty, then only the list will be shown */}
      {/* here curly braces are used to indicate the js code in html */}
      {suggestion.length>0?
        (<ul className="game-dropdown-list">
         {suggestion.map((game) => (
            <li 
              key={game.id} 
              className="search-item" 
              //calling after to clean and onclickedGame to display the popup
              onClick={() => {afterSearch(game); onclickedGame(game)}}
            >
              <img src={game.background_image} alt="" className="search-icon" />
              <span>{game.name}</span>
            </li>
          ))}
        </ul>):null}
    </div>
  );
}

//on clicking the game card
function GameDetail({ onClick, game }) {
  if (!game) return null;

  return (
    <div className="game-detail" 
    style={{
      // backgroundImage: `url(${game.background_image})`,
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      // backgroundRepeat: 'no-repeat'
    }}>
      {/* top section- includes game background, close button*/}
      <div className="game-detail-top-section">
        <img src={game.background_image} alt={game.name}className="game-detail-top-section-game_background"></img>
        <img src={close_button} alt="close" className="game-detail-top-section-close_button" onClick={onClick}></img>
      </div>

      {/* middle section- includes game name, metacritic, release date*/}
      <div className="game-detail-middle-section">
        <h3>{game.name}</h3>

        <div className="game-detail-middle-section-metacritic">
          {game.metacritic}
        </div>

        <p className="game-detail-middle-section-game_release">
          {game.released}
        </p>
      </div>

      {/* info section- includes genres and platform */}
      <div className="game-detail-info-section">

        <p style={{
          marginTop: '10px'
        }}>
          Genres:
        </p>

        {game.genres.map((g) => (
          <span key={g.id} className="game-detail-info-section-genre">{g.name}</span>
        ))}

            {/* for moving the content to the next line */}
            <div className="line-break"></div>

        <p style={{
          marginTop: '10px'
        }}>
          Platform:
        </p>

        {game.parent_platforms.map((p) => (
          <span key={p.platform.id} className="game-detail-info-section-platform">{p.platform.name}</span>
        ))}
      </div>

      {/* gallery includes screenshots */}
      <div className="game-detail-gallery">
        <p>Screenshots:</p>
        {game.short_screenshots.map((image) => (
          <img key={image.id} src={image.image} alt="screenshot"className="game-detail-gallery-screenshot"></img>
        ))}
      </div>
    </div>
  );
}


function App(){
  const [games,setgames]=useState([]);
  const [SelectedGame,setSelectedGame]=useState(null);
  //used to store the clicked game card
  const [clickedGame, setclickedGame]=useState(null);
  //to store the current page of the fetched game (1 page=>20 games)
  const [currentPage, setcurrentPage]=useState(1);

  useEffect(()=>{
    const fetchGame = async()=>{
      try{
        //url 
        const url=`https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}`;

        //fetching the data
        const response=await fetch(url);
        const data= await response.json();

        //data
        //if the current page is 1 it will directly fetch the game, else it will fetch 
        //the pages and append it with the previous pages
        if (currentPage==1){
          setgames(data.results);//data is fetched and stored
        }
        else{
          setgames(prev=>[...prev, ...data.results]);
        }
      }
      catch(error){
        console.error("Something went wrong...",error);
      }
    }

    fetchGame();
  },[currentPage])
  //dependency is set to current page, thus will execute when the page number changes

  return(
    //this div is used for wrapping all the elements of the app component
    <div>
      <h1>GamesHub</h1>
      <SearchBar onselect={(game)=>{setSelectedGame(game)}} onclickedGame={setclickedGame}/>
      {/* this div is used for adjusting the game card design */}
      <div className="cards">
        {/* mapping the game in the gamecard component by giving the props as the element of the games array */}
        {games.map((game) => (<GameCard key={game.id} games={game} onClick={()=>setclickedGame(game)}/>))}
      </div>

      {/* load more games by increasing the page number in the api */}
      <div className="load-more">
        <button className="load-more-button" onClick={()=>{setcurrentPage(prev=>prev+1)}}>
          Load more games
        </button>
      </div>

      {/* clicking on the game card */}
      <GameDetail onClick={()=>setclickedGame(null)} game={clickedGame}/>

    </div>
  );
}
export default App