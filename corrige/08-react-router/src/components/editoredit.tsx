import * as React from "react";

interface Props {
  initialEditorName: string;
  onEditorUpdate: (newEditor: string) => any;

}

export const EditorEditComponent = (props: Props) => {
  const [editingEditor, setEditingEditor] = React.useState(props.initialEditorName);
    
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEditingEditor(e.target.value);
  }
  
  const onEditorSubmit = (event: any): any => {
     props.onEditorUpdate(editingEditor);
  }
  return (
  <>
    <label>Update game editor name:</label> 
    <input value={editingEditor} onChange={onChange} />
    <button onClick={onEditorSubmit}>Change Editor</button>
  </>
  );
};