import './index.css';
import { ReactComponent as SearchIcon } from './ic-search.svg';
import { ReactComponent as CloseIcon } from './ic-close-input.svg';
import { useCallback, useState, memo } from 'react';


function Search({ onSubmit: propsOnSubmit, onInput }) {
  const [inputText, setInputText] = useState('')

  console.log('Search rerender')

  const handleInput = useCallback((e) => {
    setInputText(e.target.value)
    onInput && onInput(e.target.value)
  }, [setInputText, onInput])
  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    propsOnSubmit(inputText)
    // setInputText("")
  }, [propsOnSubmit, inputText])

  const handleClearInput = useCallback((e) => {
    e.stopPropagation()
    setInputText("");
    onInput && onInput("")
  }, [setInputText, onInput])

  return (
    <form className="search" onSubmit={handleFormSubmit}>
      <input type="text" value={inputText} className='search__input' placeholder='Поиск' onInput={handleInput} />
      <button type='button' className='search__btn'>
        {inputText && <CloseIcon onClick={handleClearInput} className='search__icon-clear' />}
        {inputText && <SearchIcon onClick={handleFormSubmit} className='search__icon' />}
      </button>
    </form>
  )
}

export default memo(Search);
