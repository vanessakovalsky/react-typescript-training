import React from "react";

type State = {
    isGoing: boolean,
    numberOfGuests: number
};

interface Props {
    isGoing: boolean,
    numberOfGuests: number
}

class Reservation extends React.Component<Props, State> {

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;
    
        this.setState<any>({
          [name]: value
        });
    }
    state = {
        isGoing: true,
        numberOfGuests: 2
    };
    render() {
      return (
        <form>
          <label>
            Participe :
            <input
              name="isGoing" type="checkbox" checked={this.state.isGoing}          
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Nombre d'invités :
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }
  
  export default Reservation;