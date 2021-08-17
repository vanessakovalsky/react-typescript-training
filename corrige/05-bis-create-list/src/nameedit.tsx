import * as React from "react";

interface Props {
  initialGameName: string;
  editingName: string;
  onNameUpdate: () => any;
  onEditingNameUpdated: (newEditingName: string) => any;
}

const NameEditComponent = (props: Props) => {
    
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        props.onEditingNameUpdated(e.target.value)
    }
    
    const onNameSubmit = (event: any): any => {
       props.onNameUpdate();
    }
    
    return (
        <>
            <label>Update game name:</label>
            <input value={props.editingName} onChange={onChange} />
            <button onClick={onNameSubmit}>Change</button>
        </>
    );
};

export default NameEditComponent;