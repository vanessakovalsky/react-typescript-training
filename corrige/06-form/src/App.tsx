import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import { GameComponent, NameEditComponent, EditorEditComponent, YearEditComponent, CategoryEditComponent, GameForm} from './components';

function App() {

  const [name, setName] = React.useState("Les aventuriers du rail");

  const [editingName, setEditingName] = React.useState("Les aventuriers du rail");

  // Fonction qui simule un appel asynchrone toutes les 50s
  const loadGamename = () => {
    setTimeout(() => {
      setName("name from async call");
      setEditingName("name from async call");
    }, 50);
  };

  React.useEffect(() => {
    loadGamename();
  },
  []);

  const setGamenameState = () => {
    setName(editingName);
  }

  const [editor, setEditor] = React.useState("Days of wonders");

  const setEditornameState = (newEditor: string) => {
    setEditor(newEditor);
  }

  const [year, setYear] = React.useState(2004);

  const setYearState = (newYear: number) => {
    setYear(newYear);
  }

  const [category, setCategory] = React.useState("Familiale");

  const setCategoryState = (newCategory: string) => {
    setCategory(newCategory);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <GameComponent gameName={name} editorName={editor} gameYear={year} category={category} />
      <NameEditComponent 
        initialGameName={name} 
        editingName={editingName}
        onNameUpdate={setGamenameState}
        onEditingNameUpdated={setEditingName}
      />
      <EditorEditComponent initialEditorName={editor} onEditorUpdate={setEditornameState} />
      <YearEditComponent initialGameYear={year} onYearUpdate={setYearState} />4
      <CategoryEditComponent initialCategory={category} onCategoryUpdate={setCategoryState} />
      
      <GameForm />

    </div>
  );
}

export default App;
