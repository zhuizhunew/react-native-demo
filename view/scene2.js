/**
 * Created by zhuzhui on 2016/12/6.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Navigator,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    ListView,
    Image,
    Dimensions,
    Platform,
    RefreshControl,
    AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
import {Actions} from 'react-native-router-flux';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
})

const popNext = (obj) => {
    // console.log('popnext', obj);
    Actions.home({hideNavBar: false, hideTabBar: true, departId: obj, data: '1452224'});
}

const styles = StyleSheet.create({
    container: {
        borderRightColor: '#dddddd',
        flex: 1,
        // width: 50,
        borderRightWidth: 1,
        backgroundColor: '#eeeeee',
    },
    child: {
        minHeight: 40,
        lineHeight: 40,
    },
    child_selected: {
        minHeight: 40,
        lineHeight: 40,
        backgroundColor: '#ffffff',
        color: 'red'
    },
    parent: {
        height: 40,
        lineHeight: 40,
    },
    parent_selected: {
        height: 40,
        lineHeight: 40,
        backgroundColor: '#ffffff',
        color: 'green'
    },
    parent_border: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1
    },
    child_border: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
    }
})

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class MyScene2 extends Component {

    constructor(props) {
        if (Platform.OS == 'android') {
            console.log(Dimensions.get('window'))
        }
        super(props)
        this.state = {
            word: 'button',
            category: [],
            showChild: 38,
            childSelected: 0,
            dataSource: ds.cloneWithRows([{
                name: 'Job',
                src: 'http://192.168.102.28:8000/pub/media/catalog/product/m/g/mg04-bk-0.jpg',
                sku: '24-MG04'
            }])
        }
    }

    componentDidMount() {
        fetch('http://192.168.102.28:8000/rest/default/V1/categories', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({
                category: json['children_data']
            })
        })
    }

    change() {
        console.log(3333)
        this.setState({
            word: 'click'
        })
    }

    longchange() {
        this.setState({
            word: 'longPress'
        })
    }

    selectItem(obj) {
        // console.log(obj);
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
        if (obj.level == 2) {
            this.getProductSku(obj.id + 1)
            this.setState({
                showChild: obj.id,
                childSelected: obj.children_data.length > 0 ? obj.children_data[0].id : 0
            })
        } else if (obj.level == 3) {
            this.getProductSku(obj.id);
            this.setState({
                childSelected: obj.id,
            })
        }
    }

    getProductSku(id) {
        let api = `http://192.168.102.28:8000/rest/default/V1/categories/${id}/products`;
        fetch(api).then(response => {
            return response.json()
        }).then(obj => {
            // console.log('sku', obj);
            this.getProductList(obj);
        })
    }

    getProductList(obj) {
        // console.log(this.searchProductsBySkus(obj));
        fetch('http://192.168.102.28:8000/rest/default/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_gear&searchCriteria[filter_groups][0][filters][0][value]=86&searchCriteria[filter_groups][0][filters][0][condition_type]=finset').then(response => {
            return response.json()
        }).then(obj => {
            let newData = obj.items.map(item => {
                return this.dataTransfer(item)
            })
            this.setState({
                dataSource: ds.cloneWithRows(newData)
            })
            return obj
        })
    }

    dataTransfer(obj) {
        return {
            name: obj.name,
            src: `http://192.168.102.28:8000/pub/media/catalog/product${obj.custom_attributes[3].value}`,
            sku: obj.sku
        }
    }

    searchProductsBySkus(skus) {
        let params = {};
        let skuIds = skus.map(sku => sku.sku);
        // params[`searchCriteria[filter_groups][0][filters][0][field]`] = 'sku';
        // params[`searchCriteria[filter_groups][0][filters][0][value]`] = skuIds.join(',');
        // params[`searchCriteria[filter_groups][0][filters][0][condition_type]`] = 'in';
        skuIds.forEach((sku, i) => {
            params[`searchCriteria[filter_groups][0][filters][${i}][field]`] = 'sku';
            params[`searchCriteria[filter_groups][0][filters][${i}][value]`] = sku;
            params[`searchCriteria[filter_groups][0][filters][${i}][condition_type]`] = 'eq';
        });
        // console.log('skuIds', params);
        return params;
    }

    click() {
        this.getProductSku(21);
        // console.log('list');

    }

    render() {
        let item = this.state.category.map(item => {
            if (item['children_data'].length > 0) {
                let child = item['children_data'].map(child => {
                    return (
                        (this.state.showChild !== item.id) || <View style={styles.child_border} key={child.id}><Text
                            style={this.state.childSelected == child.id ? styles.child_selected : styles.child}
                            onPress={()=> {
                                this.selectItem(child)
                            }} numberOfLines={1}>{child.name}</Text></View>
                    )
                })
                return (
                    <View key={item.id}>
                        <View style={styles.parent_border}><Text
                            style={this.state.showChild == item.id ? styles.parent_selected : styles.parent}
                            onPress={()=> {
                                this.selectItem(item)
                            }}>{item.name}</Text></View>
                        {child}
                    </View>
                )
            } else {
                return (
                    <View style={styles.parent_border} key={item.id}><Text
                        style={this.state.showChild == item.id ? styles.parent_selected : styles.parent} onPress={()=> {
                        this.selectItem(item)
                    }}>{item.name}</Text></View>
                )
            }
        })
        return (
            <View style={{marginTop: 70, flexDirection: 'row', flex: 1}}>
                <ScrollView style={styles.container}
                            refreshControl={<RefreshControl refreshing={false} onRefresh={()=> {
                                console.log('refreshing')
                            }}/>}
                >
                    {item}
                </ScrollView>
                <ListView style={{width: 200}} dataSource={this.state.dataSource}
                          renderRow={(rowData) => {
                              return (
                                  <TouchableOpacity onPress={()=> popNext(rowData)}>
                                      <View style={{
                                          flex: 1,
                                          flexDirection: 'row',
                                          borderBottomWidth: 1,
                                          borderBottomColor: '#dddddd',
                                          padding: 10,
                                          justifyContent: 'space-between',
                                          alignItems: 'flex-end'
                                      }}>
                                          <View style={{flexDirection: 'row'}}>
                                              <Image source={{uri: rowData.src}} style={{width: 70, height: 85}}/>
                                              <Text>
                                                  {rowData.name}
                                              </Text>
                                          </View>
                                          <TouchableHighlight onPress={() => this.click()}><View
                                              style={{marginRight: 10}}><Image
                                              source={require('../img/1.png')}
                                              style={{
                                                  width: 20,
                                                  height: 20,
                                                  backgroundColor: 'red'
                                              }}/>
                                          </View>
                                          </TouchableHighlight>
                                      </View>
                                  </TouchableOpacity>
                              )
                          }}/>
            </View>
        )
    }
}