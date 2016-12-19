/**
 * Created by zhuzhui on 2016/12/9.
 */
'use strict';

import React, {Component} from 'react';
import {
    PickerIOS,
    Text,
    View,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import Storage from 'react-native-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
})

const PickerItemIOS = PickerIOS.Item;

const CAR_MAKES_AND_MODELS = {
    amc: {
        name: 'AMC',
        models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
    },
    alfa: {
        name: 'Alfa-Romeo',
        models: ['159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider'],
    },
    aston: {
        name: 'Aston Martin',
        models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage'],
    },
    audi: {
        name: 'Audi',
        models: ['90', '4000', '5000', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q5', 'Q7'],
    },
    austin: {
        name: 'Austin',
        models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess'],
    },
    borgward: {
        name: 'Borgward',
        models: ['Hansa', 'Isabella', 'P100'],
    },
    buick: {
        name: 'Buick',
        models: ['Electra', 'LaCrosse', 'LeSabre', 'Park Avenue', 'Regal',
            'Roadmaster', 'Skylark'],
    },
    cadillac: {
        name: 'Cadillac',
        models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville'],
    },
    chevrolet: {
        name: 'Chevrolet',
        models: ['Astro', 'Aveo', 'Bel Air', 'Captiva', 'Cavalier', 'Chevelle',
            'Corvair', 'Corvette', 'Cruze', 'Nova', 'SS', 'Vega', 'Volt'],
    },
};

export default class PickerExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carMake: 'cadillac',
            modelIndex: 3,
        }
    }

    store() {
        console.log('store');
        storage.save({
            key: 'store',
            rawData: {
                from: 'some other site',
                userid: 'some userid',
                token: 'some token'
            },
            expires: 1000 * 3600
        })
    }

    load() {
        storage.load({
            key: 'store',
            autoSync: true,
            syncInBackground: true
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    break;
            }
        })
    }

    keyId() {
        var userA = {
            name: 'A',
            age: 20,
            tags: [
                'geek',
                'nerd',
                'otaku'
            ]
        };

        storage.save({
            key: 'user',  // Note: Do not use underscore("_") in key!
            id: '1001',   // Note: Do not use underscore("_") in id!
            rawData: userA,
            expires: 1000 * 3600
        });
    }

    loadId() {
        // storage.load({
        //     key: 'user',
        //     id: '1001'
        // }).then(ret => {
        //     // found data goes to then()
        //     console.log(ret);
        // }).catch(err => {
        //     // any exception including data not found
        //     // goes to catch()
        //     console.warn(err.message);
        //     switch (err.name) {
        //         case 'NotFoundError':
        //             // TODO;
        //             break;
        //         case 'ExpiredError':
        //             // TODO
        //             break;
        //     }
        // });
        storage.getIdsForKey('user').then(ids => {
            console.log(ids);
        });
    }

    clear() {
        // storage.clearMapForKey('user');
        storage.clearMap();
    }

    render() {
        var make = CAR_MAKES_AND_MODELS[this.state.carMake];
        var selectionString = make.name + ' ' + make.models[this.state.modelIndex];
        return (
            <View style={{marginTop: 70}}>
                <Text>Please choose a make for your car:</Text>
                <PickerIOS
                    selectedValue={this.state.carMake}
                    onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}>
                    {Object.keys(CAR_MAKES_AND_MODELS).map((carMake) => (
                        <PickerItemIOS
                            key={carMake}
                            value={carMake}
                            label={CAR_MAKES_AND_MODELS[carMake].name}
                        />
                    ))}
                </PickerIOS>
                <Text>Please choose a model of {make.name}:</Text>
                <PickerIOS
                    selectedValue={this.state.modelIndex}
                    key={this.state.carMake}
                    onValueChange={(modelIndex) => this.setState({modelIndex})}>
                    {CAR_MAKES_AND_MODELS[this.state.carMake].models.map((modelName, modelIndex) => (
                        <PickerItemIOS
                            key={this.state.carMake + '_' + modelIndex}
                            value={modelIndex}
                            label={modelName}
                        />
                    ))}
                </PickerIOS>
                <Text onPress={this.store.bind(this)}>You selected: {selectionString}</Text>
                <Text onPress={this.load.bind(this)}>Load storage data</Text>
                <Text onPress={this.keyId.bind(this)}>Store key, id</Text>
                <Text onPress={this.loadId.bind(this)}>Load key, id</Text>
                <Text onPress={this.clear.bind(this)}>Clear storage</Text>
            </View>
        );
    }
};

// class PickerStyleExample extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             carMake: 'cadillac',
//             modelIndex: 0,
//         }
//     }
//
//     render() {
//         var make = CAR_MAKES_AND_MODELS[this.state.carMake];
//         var selectionString = make.name + ' ' + make.models[this.state.modelIndex];
//         return (
//             <PickerIOS
//                 itemStyle={{fontSize: 25, color: 'red', textAlign: 'left', fontWeight: 'bold'}}
//                 selectedValue={this.state.carMake}
//                 onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}>
//                 {Object.keys(CAR_MAKES_AND_MODELS).map((carMake) => (
//                     <PickerItemIOS
//                         key={carMake}
//                         value={carMake}
//                         label={CAR_MAKES_AND_MODELS[carMake].name}
//                     />
//                 ))}
//             </PickerIOS>
//         );
//     }
// };
//
// // exports.displayName = (undefined);
// exports.title = '<PickerIOS>';
// exports.description = 'Render lists of selectable options with UIPickerView.';
// exports.examples = [
//     {
//         title: '<PickerIOS>',
//         render() {
//             return <PickerExample />;
//         },
//     },
//     {
//         title: '<PickerIOS> with custom styling',
//         render() {
//             return <PickerStyleExample />;
//         },
//     }];