import React, { Component } from 'react';
import { FormControl, Alert } from 'react-bootstrap';

class ImageInput extends Component {
    submitHandler(e) {
        let file = e.target.files[0], reader = new FileReader();
        reader.onloadend = (e) => fetchMatchImages(new Uint8Array(e.target.result));
    }

    render() {
        let alert = <Alert bsStyle="warning"><strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.</Alert>;

        return (
            <div>
                <form action="" onSubmit={this.submitHandler}>
                    <FormControl type="file" />
                </form>
                {fetchError && alert}
            </div>
        );
    }
}

export default ImageInput;