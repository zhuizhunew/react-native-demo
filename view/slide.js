// /**
//  * Created by zhuzhui on 2016/12/8.
//  */
// import React, {Component} from 'react';
// import {Slider, Text, StyleSheet, View} from 'react-native';
//
// export default class SlidingCompleteExample extends React.Component {
//     state = {
//         slideCompletionValue: 0,
//         slideCompletionCount: 0,
//     };
//
//     render() {
//         return (
//             <View style={{marginTop: 70}}>
//                 <SliderExample
//                     {...this.props}
//                     onSlidingComplete={(value) => this.setState({
//                         slideCompletionValue: value,
//                         slideCompletionCount: this.state.slideCompletionCount + 1
//                     })}/>
//                 <Text style={{backgroundColor: 'red'}}>
//                     Completions: {this.state.slideCompletionCount} Value: {this.state.slideCompletionValue}
//                 </Text>
//             </View>
//         );
//     }
// }
//
// class SliderExample extends React.Component {
//     static defaultProps = {
//         value: 0,
//     };
//
//     state = {
//         value: this.props.value,
//     };
//
//     render() {
//         return (
//             <View>
//                 <Text style={styles.text}>
//                     {this.state.value && +this.state.value.toFixed(3)}
//                 </Text>
//                 <Slider
//                     {...this.props}
//                     onValueChange={(value) => this.setState({value: value})}/>
//             </View>
//         );
//     }
// }
//
// var styles = StyleSheet.create({
//     slider: {
//         height: 10,
//         margin: 10,
//     },
//     text: {
//         fontSize: 14,
//         textAlign: 'center',
//         fontWeight: '500',
//         margin: 10,
//     },
// });
//
//
// exports.title = '<Slider>';
// exports.displayName = 'SliderExample';
// exports.description = 'Slider input for numeric values';
// exports.examples = [
//     {
//         title: 'Default settings',
//         render() {
//             return <SliderExample />;
//         }
//     },
//     {
//         title: 'Initial value: 0.5',
//         render() {
//             return <SliderExample value={0.5}/>;
//         }
//     },
//     {
//         title: 'minimumValue: -1, maximumValue: 2',
//         render() {
//             return (
//                 <SliderExample
//                     minimumValue={-1}
//                     maximumValue={2}
//                 />
//             );
//         }
//     },
//     {
//         title: 'step: 0.25',
//         render() {
//             return <SliderExample step={0.25}/>;
//         }
//     },
//     {
//         title: 'onSlidingComplete',
//         render() {
//             return (
//                 <SlidingCompleteExample />
//             );
//         }
//     },
//     {
//         title: 'Custom min/max track tint color',
//         platform: 'ios',
//         render() {
//             return (
//                 <SliderExample
//                     minimumTrackTintColor={'red'}
//                     maximumTrackTintColor={'green'}
//                 />
//             );
//         }
//     },
//     {
//         title: 'Custom thumb image',
//         platform: 'ios',
//         render() {
//             return <SliderExample thumbImage={require('../img/1.png')}/>;
//         }
//     },
//     {
//         title: 'Custom track image',
//         platform: 'ios',
//         render() {
//             return <SliderExample trackImage={require('../img/1.png')}/>;
//         }
//     },
//     {
//         title: 'Custom min/max track image',
//         platform: 'ios',
//         render() {
//             return (
//                 <SliderExample
//                     minimumTrackImage={require('../img/1.png')}
//                     maximumTrackImage={require('../img/1.png')}
//                 />
//             );
//         }
//     },
// ];


import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';

const width = Dimensions.get('window').width;

const goNext = ()=> {
    Actions.home2();
}

export default class ModalExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    // state = {
    //     modalVisible: false,
    // }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    slide() {
        this.slider.scrollTo({x: 0, animated: true})
    }

    render() {
        return (
            <View style={{marginTop: 70}}>
                <Modal
                    animationType={"none"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                    style={{backgroundColor: 'red'}}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World hot reloading!</Text>

                            <TouchableHighlight onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Show Modal</Text>
                </TouchableOpacity>
                <Text onPress={goNext}>Go</Text>
                <ScrollView
                    ref={slide=>this.slider = slide}
                    style={{backgroundColor: 'red'}}
                    horizontal={true}
                    keyboardDismissMode={'interactive'}
                    onScroll={(e) => {
                        console.log('e.nativeEvent', e.nativeEvent)
                    }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={500}
                    pagingEnabled={true}>
                    <View style={{width: width}}><Text>Scroll View</Text></View>
                    <View style={{width: width}}><Text>Scroll View</Text></View>
                    <View style={{width: width}}><Text>Scroll View</Text></View>
                    <View style={{width: width}}><Text>Scroll View</Text></View>
                    <View style={{width: width}}><Text>Scroll View</Text></View>
                    <View style={{width: width}}><Text>Scroll View</Text></View>
                </ScrollView>
                <Text onPress={this.slide.bind(this)}>ScrollView Slide</Text>
            </View>
        );
    }
}