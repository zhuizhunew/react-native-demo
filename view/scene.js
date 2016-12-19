/**
 * Created by zhuzhui on 2016/12/6.
 */
import React, {Component} from 'react';
import {View, Text, Navigator, Button, Image, PickerIOS, ScrollView, Picker, WebView, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
import CardSlider from 'react-native-cards-slider';

export default class MyScene extends Component {

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
        console.log(this.props.departId);
        console.log(this.props.data);
        let api = 'http://192.168.102.28:8000/rest/default/V1/products/' + this.props.departId.sku;
        fetch(api).then(response => {
            return response.json();
        }).then(data => {
            // console.log('productDetail', data);
            this.setState({
                prodDetail: this.dataTransfer(data),
            })
            console.log('this.state.prodDetail', this.state.prodDetail)
        })

        this.interval = setInterval(
            () => {
                this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
            }, 5000
        );
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

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
                        <Image
                            source={{uri: this.state.prodDetail.src}} style={{width: 160, height: 200}}/>
                        <Text>{this.state.prodDetail.name}</Text>
                        {/*<ImageSlider images={[*/}
                        {/*this.state.prodDetail.src,*/}
                        {/*this.state.prodDetail.src,*/}
                        {/*this.state.prodDetail.src,*/}
                        {/*]} position={this.state.position} style={{height: 400,backgroundColor: '#ffffff'}}/>*/}
                        <Text style={{color: 'red', fontSize: 100}}>Slider</Text>
                        <CardSlider style={{height: 200, backgroundColor: 'yellow'}} autoplay={true}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text onPress={()=>alert('click')}>Slider One</Text>
                                <Text>{this.state.prodDetail.info}</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    source={{uri: this.state.prodDetail.src}} style={{width: 160, height: 200}}/>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center', height: 100}}><Text>Slider
                                Three</Text></View>
                        </CardSlider>
                        <WebView source={{html: this.state.prodDetail.info}}
                                 scrollEnabled={true}
                                 style={{width: (Dimensions.get('window').width), height: 100}}>
                        </WebView>
                        <Text style={{color: 'red', fontSize: 50}}>Slider</Text>
                        <Picker selectedValue={this.state.language} style={{backgroundColor: 'red'}}
                                onValueChange={(obj)=> {
                                    this.setState({language: obj})
                                }}>
                            <Picker.Item label="Java" value="java"/>
                            <Picker.Item label="JavaScript" value="js"/>
                        </Picker>
                    </View>
                </ScrollView>
                <View style={{height: 50, backgroundColor: 'green', flexDirection: 'row'}}>
                    <View style={{
                        flex: 1,
                        borderRightWidth: 1,
                        borderRightColor: 'red',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Image source={require('../img/tab_icon_cli_mine.png')} style={{width: 30}}/>
                            <View style={{
                                backgroundColor: 'red', height: 20, width: 20,
                                borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: -10
                            }}>
                                <Text style={{color: 'black', fontSize: 8}}>99+</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1}}><Text style={{lineHeight: 50, textAlign: 'center'}}>Footer</Text></View>
                </View>
            </View>
        )
    }
}
