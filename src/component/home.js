import React from 'react';
import {Carousel} from 'react-bootstrap'
class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
            <Carousel interval={1000}>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src={require('../component/b1.jpg')} />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src={require('../component/b2.jpg')} />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src={require('../component/b3.jpg')} />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
        )
    }
}
export default Home