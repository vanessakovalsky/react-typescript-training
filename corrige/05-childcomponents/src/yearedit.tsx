import * as React from "react";

interface Props {
  initialGameYear: number;
  onYearUpdate: (newYear: number) => any;
}

const YearEditComponent = (props: Props) => {
  const [editingYear, setEditingYear] = React.useState(props.initialGameYear);
    
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEditingYear(Number(e.target.value));
  }
  
  const onYearSubmit = (event: any): any => {
     props.onYearUpdate(editingYear);
  }
  return (
    <>
      <label>Update game year:</label>
      <input value={editingYear} onChange={onChange} />
      <button onClick={onYearSubmit}>Change Year</button>
    </>
  );
};

export default YearEditComponent;