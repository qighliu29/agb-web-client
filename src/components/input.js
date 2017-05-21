import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getLastError } from '../reducers';
import * as actions from '../actions';

class ImageInput extends Component {
    componentWillUpdate(nextProps) {
        if (this.error !== nextProps.error) {
            this.error = nextProps.error;
            setTimeout(this.forceUpdate.bind(this), 3 * 1000);
        }
        else {
            this.error = '';
        }
    }

    render() {
        return (
            <div>
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.fetchMatchImages(this.input.files[0]);
                }}>
                    <FormControl type="file" inputRef={ref => { this.input = ref; }} />
                    <Button bsStyle="primary" type="submit" >Submit</Button>
                </form>
                {this.error && <Alert bsStyle="warning">{this.error}</Alert>}
            </div>
        );
    }
}

ImageInput.PropTypes = {
    error: PropTypes.string,
    fetchMatchImages: PropTypes.func.isRequired
};

ImageInput = connect(
    (state) => ({ error: getLastError(state) }),
    actions
)(ImageInput);

export default ImageInput;