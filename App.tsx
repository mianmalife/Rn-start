/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Alert, Button, Pressable, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
const defaultList = [{
  name: '盗墓笔记全集',
  id: 1,
}, {
  name: '鬼吹灯全集',
  id: 2,
},{
  name: '三体',
  id: 3,
}, {
  name: '救世主',
  id: 4,
},{
  name: '山炮',
  id: 5,
}, {
  name: '🚗',
  id: 6,
}];
function wait(duration: number | undefined) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}
function App(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState(defaultList);
  const onPressTitle = (name: string) => {
    Alert.alert(name, name);
  };
  const onLongPressTitle = () => {
    Alert.alert('长按', 'ok');
  };
  const onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      const copyList = [...list];
      copyList.unshift({ id: copyList.length + 1, name: `demo${copyList.length + 1}` });
      setList(copyList);
    });
  };
  const resetList = () => {
    setList(defaultList);
  };
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: '#DDF2FD', height: '100%' }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {
          list.map((item, index) => <View key={item.id} style={{ display: 'flex', marginTop: index === 0 ? 20 : 0, flexDirection: 'row', justifyContent: 'space-evenly', height: 200, marginBottom: 20 }}>
            <View style={{ backgroundColor: '#427D9D', width: '90%' }}>
              <Pressable onPress={() => onPressTitle(item.name)} onLongPress={() => onLongPressTitle()} android_ripple={{ color: '#9BBEC8' }}>
                <Text style={styles.bookTitle}>{item.name}</Text>
              </Pressable>
            </View>
          </View>)
        }
      </ScrollView>
      <Pressable onPress={resetList} style={styles.resetBtn}>
        <Text style={{ textAlign: 'center' }}>重置列表</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  bookTitle: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
    paddingTop: 10,
    paddingBottom: 10,
  },
  resetBtn: {
    width: 80,
    borderRadius: 40,
    position: 'absolute',
    zIndex: 10,
    bottom: 30,
    left: '50%',
    marginLeft: -40,
    right: 0,
    backgroundColor: 'lightgreen',
    padding: 10,
  },
});

export default App;
