import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import GalleryItem from './gallery-item';
import * as actions from '../actions';

class Gallery extends Component {
    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src="http://placehold.it/350x150" />
                    </Carousel.Item>
                    {images.map((image) => (
                        <GalleryItem image={image} onImageClick={submitMatchImage} />
                    ))}
                </Carousel>
            </div>
        );
    }
}

Gallery = connect(
    mapStateToProps,
    actions
)(Gallery);

export default Gallery;