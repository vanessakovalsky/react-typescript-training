import * as React from "react";

interface Props {
  gameName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameEditComponent = (props: Props) => (
  <>
    <label>Update game name:</label>
    <input value={props.gameName} onChange={props.onChange} />
  </>
);

export default NameEditComponent;