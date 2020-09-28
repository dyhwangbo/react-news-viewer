import React, { useState, useCallback } from 'react';
import NewList from './components/NewsList';
import Categories from './components/Categories';

const App = () => {
  const [ category, setCategory ] = useState('all');
  const onSelect = useCallback(category => setCategory(category), []);
  return (
    <>
    <Categories category={category} onSelect={onSelect}/>
    <NewList category={category} />
    </>
  )
}

export default App; 