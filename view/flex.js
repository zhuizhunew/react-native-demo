/**
 * Created by zhuzhui on 2016/12/9.
 */
import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

const styles = {
    wrap: {
        flex: 1,
        flexDirection: 'column',
    },
    top: {
        height: 40,
        backgroundColor: 'red',
        marginTop: 70
    },
    cententWrap: {
        flex: 1,
        flexDirection: 'column',
    },
    bottom: {
        height: 40,
        backgroundColor: 'yellow',
    }
}

export default class Layout extends Component {
    render() {
        return (
            <View style={styles.wrap}>
                <View style={styles.top}>
                    <Text>头部</Text>
                </View>
                <ScrollView>
                    <View style={styles.cententWrap}>
                        <Text style={{backgroundColor: 'green'}}>新闻主题</Text>
                        <Text>新闻主题</Text>
                        <Text style={{backgroundColor: 'red'}}>新闻主题</Text>
                    </View>
                </ScrollView>
                <View style={styles.bottom}>
                    <Text>
                        尾部导航
                    </Text>
                </View>
            </View>
        )
    }
}