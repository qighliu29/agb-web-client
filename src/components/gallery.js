import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

class Gallery extends Component {
    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src="http://placehold.it/350x150"/>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Gallery;