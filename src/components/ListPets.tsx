import React from "react";
import { DEV_REST_ENDPOINT, REST_ENDPOINT } from '../env';

export class ListPets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pets: null
        };
    }

    getAllPets() {
        // {REST_ENDPOINT/get-all}
        
        fetch (`http://localhost:3003/local/pets/get-all`, {
           method: "GET",
           mode: 'cors'
       })
       .then((res) => res.json())
       .then( data => {
           console.log('DATA:', data)
           if( !this.state.pets ) {
               this.setState({pets: data})
           }
       })
       .catch((err) => {
           console.log('GET ALL PETS:', err);
       })
   }

   // UPDATES BUT SEEMS TO KEEP ORIGINAL??????
   updatePet(event, id) {
        console.log('UPDATE - ID:', id)
        console.log('UPDATE - EVENT:', event.target[0].value)

        event.preventDefault();

        let data = new URLSearchParams({
            "petType": event.target[1].value,
            "petName": event.target[0].value
        })

        // {REST_ENDPOINT/id}

        fetch (`http://localhost:3003/local/pets/${id}`, {
           method: "PATCH",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event.target[0].value),
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log('UPDATE PET:', err);
        });
   }



    deletePet(event, id, type) {
        console.log('DELETE - ID:', id)
        console.log('DELETE - EVENT:', type)

        event.preventDefault();

        // {REST_ENDPOINT/id}

        fetch (`http://localhost:3003/local/pets/${id}`, {
           method: "DELETE",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(type),
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log('UPDATE PET:', err);
        });
    }
    
    componentDidMount() {
        if(this.state.pets === null) {
            this.getAllPets()
        }
    }

    render() {

        console.log('STATE PETS:', this.state.pets)

        return (
            <div>
                <div><h2>All the pets:</h2></div>

                    {this.state.pets && this.state.pets.map( (pet) => {
                        console.log('PET DATA:', pet)
                        return (
                            <div>
                                <span>PET: {pet.petType}</span><br />
                                <span>NAME: {pet.name}</span>
                                <form onSubmit={(event) => this.updatePet(event, pet.uuid)}>
                                    <label>Update pet type:</label>
                                    <input type="text" />
                                    <button type="submit">Update Pet Type</button>
                                </form>
                                <form onSubmit={(event) => this.deletePet(event, pet.uuid, pet.petType)}>
                                    <button type="submit">Delete Pet</button>
                                </form>
                            </div>
                        )
                    })}

            </div>
        )
    }
}