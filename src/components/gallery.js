import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { getImages, getCurrentMatch } from '../reducers';
import * as actions from '../actions';

class Gallery extends Component {
    base64Encode(input) {
        let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
            chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    };

    render() {
        const { images, submitMatchImage } = this.props;
        if (!(images.length > 0)) return null;
        return (
            <Carousel>
                {images.map((image) => (
                    <Carousel.Item key={image.id}>
                        <img alt="" src={"data:image/gif;base64," + this.base64Encode(image.data)} style={{ cursor: 'pointer' }} onClick={() => submitMatchImage(image.id)} />
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
}

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        data: PropTypes.instanceOf(Uint8Array).isRequired
    }).isRequired).isRequired
};

Gallery = connect(
    (state) => ({ images: getImages(state, getCurrentMatch(state)) }),
    actions
)(Gallery);

export default Gallery;