// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// export default class React_demo extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//         <Text>Simulator work</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('React_demo', () => React_demo);



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import MyScene from './view/scene';
import MyScene2 from './view/scene2';
import ModalExample from './view/slide';
import Home from './view/tab';
import Layout from './view/flex';
import PickerExample from './view/picker';

const scenes = Actions.create(
    <Scene key="root">
      {/*<Scene key="flex" component={Layout} title="flex"/>*/}
      {/*<Scene key="picker" component={PickerExample} title="picker"/>*/}
      <Scene key="hometab" component={Home} title="home154"/>
      <Scene key="modal" component={ModalExample} title="Slide"/>
      <Scene key="home2" component={MyScene2} title="home2"/>
      <Scene key="home" component={MyScene} title="home"/>
    </Scene>
)

// const reducerCreate = params => {
//     const defaultReducer = new Reducer(params);
//     return (state, action) => {
//         console.log('ACTION:', action);
//         return defaultReducer(state, action);
//     };
// };

export default class React_demo extends Component {

  render() {
    return <Router scenes={scenes}/>

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('React_demo', () => React_demo);

