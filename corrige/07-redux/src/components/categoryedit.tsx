import * as React from "react";

interface Props {
  initialCategory: string;
  onCategoryUpdate: (newCategory: string) => any;
}

export const CategoryEditComponent = (props: Props) => {
  const [editingCategory, setEditingCategory] = React.useState(props.initialCategory);
    
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEditingCategory(e.target.value);
  }
  
  const onCategorySubmit = (event: any): any => {
     props.onCategoryUpdate(editingCategory);
  }
  return (
  <>
    <label>Update category:</label>
    <input value={editingCategory} onChange={onChange} />
    <button onClick={onCategorySubmit}>Change Category</button>
  </>
  );
};