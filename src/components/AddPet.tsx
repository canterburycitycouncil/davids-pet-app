import React from "react";
import { DEV_REST_ENDPOINT, REST_ENDPOINT } from '../env';


function addPet(event) {

    console.log('ADD PET EVENT:', event)
    event.preventDefault();

    let data = new URLSearchParams({
        "petType": event.target[1].value,
        "petName": event.target[0].value
    })


    const url = `https://km8x5d64ke.execute-api.eu-west-2.amazonaws.com/dev/pets`;
    fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: data,
    })
    .then((res) => res.json())
    .catch((err) => {
        console.log(err);
    })
}

export class AddPet extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={(event) => addPet(event)}>
                    <h2>Pet to add</h2><br />
                    <label htmlFor="petType">Pet Name:</label><br />
                    <input id="petName" name="petName" type="text" /><br />
                    <label>Pet Type:</label><br />
                    <input id="petType" name="petType" type="text" /><br />
                    <button type="submit">Add pet</button>
                </form>
            </div>
        )
    }
}