import React from 'react';
import GOOGLE_API_KEY from './config';
import axios from 'axios';
/* import * as picture from './dancing.png';
 * */
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            myLatlng: null,
        }

        this.initMap = this.initMap.bind(this);
        this.clickListener = this.clickListener.bind(this);
    };

    componentWillMount() {
        window.initMap = this.initMap;
        loadJS(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`)
    }

    initMap() {
        let myLatlng = {lat: 30.2672, lng: -97.7431};
        let map = new google.maps.Map(this.refs.map, {
            zoom: 12,
            center: myLatlng
        });

        this.setState({
            map: map,
            myLatlng: myLatlng
        });

        axios.get('/pin')
             .then(res => {
                 console.log(res.data, 'these are the pins');
                 return res.data
             })
             .then(pins => {
                 pins.forEach(pin => {
                     new google.maps.Marker({
                         position: pin,
                         map: this.state.map,
                         title: 'this may be someone else\'s marker!',
                         icon: 'purple-heart.png'
                     });
                 }) 
             })
    }

    clickListener() {
        let self = this;
        let pin = new google.maps.Marker({
            position: {lat: 30.2672, lng: -97.7431},
            map: this.state.map,
            title: 'this is your marker!',
            draggable: true,
            icon: 'heavy-heart.png'
        });
  
        pin.addListener('dragend', function(e) {
            console.log(e.latLng.lat());
            console.log(pin.getPosition().lat());
            var marker = {
                lat: pin.getPosition().lat(),
                lng: pin.getPosition().lng() 
            }
            self.setState({
                myLatlng: marker
            });

            axios.post('/pin', marker)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });

        });
    }


    render() {
        return (
            <div>
                <button onClick={() => this.clickListener()} type="button">Drop New Pin</button>
                <div
                    ref="map"
                    style={{height: '726px', width: '1280px'}}></div>
            </div>
        );
    }
}

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default App;

