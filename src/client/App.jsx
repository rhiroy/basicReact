import React from 'react';
import {GOOGLE_API_KEY} from './config';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            myLatlng: null,
            marker: null,
            pinLatlng: null
        }

        this.initMap = this.initMap.bind(this);
        this.clickListener = this.clickListener.bind(this);
    };

    componentWillMount() {
        window.initMap = this.initMap;
        loadJS( {'https://maps.googleapis.com/maps/api/js?key=$\${GOOGLE_API_KEY}&callback=initMap'} )
    }

    initMap() {
        let myLatlng = {lat: 30.2672, lng: -97.7431};
        let map = new google.maps.Map(this.refs.map, {
            zoom: 4,
            center: myLatlng
        });

        /* let marker = new google.maps.Marker({
         *     position: myLatlng,
         *     map: map,
         *     title: 'Click to zoom',
         *     draggable: true
         * });
         */
        this.setState({
            map: map,
            myLatlng: myLatlng
         });


        /* let nextMarker = new google.maps.Marker({
         *     position: myLatlng,
         *     map: map,
         *     title: 'Drag to move',
         *     draggable: true
         * })
         */
        /* map.addListener('center_changed', function() {
         *     window.setTimeout(function() {
         *         map.panTo(marker.getPosition());
         *     }, 3000);
         * });
         */
        /* marker.addListener('click', function() {
         *     map.setZoom(16);
         *     map.setCenter(marker.getPosition());
         * });*/
    }

    clickListener() {
        let self = this;
        let pin = new google.maps.Marker({
            position: this.state.myLatlng,
            map: this.state.map,
            title: 'this is your marker!',
            draggable: true
        });

        this.setState({
            pinLatlng: this.state.myLatlng 
        });

        pin.addListener('dragend', function() {
            self.setState({
                pinLatlng: pin.getPosition() 
            });
        });

    }


    render() {
        return (
            <div>
                <button onClick={() => this.clickListener()} type="button">Drop New Pin</button>
                <div
                    ref="map"
                    style={{height: '500px', width: '500px'}}></div>
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






/* const App = (props) => (
 *   <div>
 * 	<p>Hello World! zomg React works. okay coolz</p>
 *   <p>Hey life is good</p>
 *   </div>
 * );
 *
make a click handler with a marker and add it to the map
   when you add it to the map, how do you actually add it to the mapsneed to update state.
 */

