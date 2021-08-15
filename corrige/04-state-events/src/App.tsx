import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameComponent from './game';
import NameEditComponent from './nameedit';
import EditorEditComponent from './editoredit';
import YearEditComponent from './yearedit';
import CategoryEditComponent from './categoryedit';

function App() {

  const [name, setName] = React.useState("Les aventuriers du rail");

  const setGamenameState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const [editor, setEditor] = React.useState("Days of wonders");

  const setEditornameState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditor(event.target.value);
  }

  const [year, setYear] = React.useState(2004);

  const setYearState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
  }

  const [category, setCategory] = React.useState("Familiale");

  const setCategoryState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <GameComponent gameName={name} editorName={editor} gameYear={year} category="familiale" />
      <NameEditComponent gameName={name} onChange={setGamenameState} />
      <EditorEditComponent editorName={editor} onChange={setEditornameState} />
      <YearEditComponent gameYear={year} onChange={setYearState} />
      <CategoryEditComponent category={category} onChange={setCategoryState} />

    </div>
  );
}

export default App;
