/**
 * Created by zhuzhui on 2016/12/14.
 */
import React, {Component} from 'react';
import {View, Text, Navigator, Button, Image, PickerIOS, ScrollView, Picker, WebView, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
import CardSlider from 'react-native-cards-slider';

export default class AndroidSlide extends Component {

    constructor(props) {
        super(props)
        this.state = {
            prodDetail: {},
            position: 1,
            interval: null,
            language: 'java'
        }

        this.interval = null;
    }

    componentDidMount() {
        let api = 'http://192.168.102.28:8000/rest/default/V1/products/24-MG04';
        fetch(api).then(response => {
            return response.json();
        }).then(data => {
            // console.log('productDetail', data);
            this.setState({
                prodDetail: this.dataTransfer(data),
            })
            console.log('this.state.prodDetail', this.state.prodDetail)
        })

        // this.interval = setInterval(
        //     () => {
        //         this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
        //     }, 5000
        // );
    }

    // componentWillUnmount() {
    //     if (this.interval) {
    //         clearInterval(this.interval);
    //     }
    // }

    dataTransfer(obj) {
        return {
            name: obj.name,
            src: 'http://112.74.169.211:9999/pub/media/catalog/product' + obj['custom_attributes'][3].value,
            info: obj['custom_attributes'][0].value,
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <ScrollView>
                    <View style={{marginTop: 70, flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <WebView source={{html: this.state.prodDetail.info}}
                                 scrollEnabled={true}
                                 style={{width: (Dimensions.get('window').width), height: 100}}>
                        </WebView>
                    </View>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD</Text>
                    <Text>DDDDDDDD785121</Text>
                </ScrollView>
            </View>
        )
    }
}
