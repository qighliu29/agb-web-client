import React, { Component } from 'react';
import { FormControl, Alert } from 'react-bootstrap';

class ImageInput extends Component {
    render() {
        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    <FormControl type="file" />
                </form>
                <Alert bsStyle="warning">
                    <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                </Alert>
            </div>
        );
    }
}

export default ImageInput;