import { getRandomWord } from './Helpers/getRandomWord';
import { useEffect, useState } from 'react';
import { HangImage } from './components/HangImage';
import { letters } from './Helpers/letters';
import './App.css'

function App() {
  const [ word, setWord] = useState(getRandomWord);
  const [ hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [ attempts, setAttempts ] = useState (0);
  const [ lose, setLose ] = useState(false);
  const [ won, setWon ] = useState(false);

// Determinar si la persona perdió

useEffect( () => {
  if(attempts >= 9){
    setLose( true );
  }
}, [attempts])

// Determinar si la persona Ganó

useEffect( () => {
  const currentHiddenWord = hiddenWord.split(' ').join('');
  if(currentHiddenWord === word){
    setWon (true);
  }
})

  const checkLetter = (letter:string) => {
    if ( lose ) return;
    if ( won ) return;
    
    if(!word.includes(letter)){
    setAttempts(Math.min(attempts + 1,9));
    return;
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for(let i = 0; i < word.length; i++){
      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));
  }

    const newGame = () => {
      const newWord = getRandomWord();
      setWord( newWord );
      setHiddenWord( ('_ '.repeat(word.length)) );
      setAttempts( 0 );
      setLose( false );
      setWon ( false );
// Determinar si la persona perdió
        }
    
  return ( 
  <div className='App'> 

    {/* Imágenes */}
    <HangImage imageNumber={attempts}/>
    {/* Palabra oculta */}
    <h3>{hiddenWord}</h3>

    {/* Contador de intentos */}
    <h3>Intentos: {attempts}</h3>

    {/* Mensaje de que perdió */}
    {
      ( lose ) 
      ? <h2>Perdiste : {word}</h2> 
      : ''
    }

    {/* Mensaje de que ganó*/}
    {
      ( won ) 
      ? <h2>Felicidades ganaste el juego</h2> 
      : ''
    }

    {/* Botones del juego */}
    {
      letters.map( (letter) =>(
        <button
         onClick={() => checkLetter(letter)}
         key={letter}>
           { letter } 
        </button>
      ))
    }
    
      <br /> 
      <button onClick={newGame}>
        ¿Nuevo juego?
        </button>

  </div>
  )
}

export default App
