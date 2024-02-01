/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, Animated, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MetrIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as Animatable from 'react-native-animatable';
// @ts-ignore
import SvgWoodenFish from './WoodenFish.svg';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Sound from 'react-native-sound';

const Tab = createBottomTabNavigator();

const playSound = () => {
  const newSound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.error('failed to load the sound', error);
      return;
    }
    newSound.setVolume(1);
    newSound.play(() => {
      newSound.release();
    });
  });
};
function HomeScreen() {
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const {position} = useProgress();
  useEffect(() => {
    const setup = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.stop();
    };
    setup();
  }, []);
  const animationScale = (value: number) => {
    return Animated.timing(scale, {
      toValue: value,
      duration: 100,
      useNativeDriver: false,
    });
  };
  async function onPressAdd() {
    setCount(count + 1);
    animationScale(0.8).start(() => {
      animationScale(1).start();
    });
    playSound();
  }
  async function onPlayBgMusic() {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.add({
        id: 1,
        url: 'https://wfish.netlify.app/assets/bgm-ff2cc27b.mp3',
      });
      await TrackPlayer.setVolume(0.3);
      await TrackPlayer.play();
      await TrackPlayer.seekTo(position);
    }
    setIsPlaying(!isPlaying);
  }
  function resetCount() {
    setCount(0);
  }
  return (
    <View style={styles.subPageStyleMu}>
      <MetrIcon
        name={!isPlaying ? 'music-off' : 'music-note'}
        color="#fff"
        size={30}
        style={styles.musicIcon}
        onPress={onPlayBgMusic}
      />
      <View>
        <Animated.View style={{transform: [{scale}]}}>
          <Text style={styles.countStyle}>{count}</Text>
        </Animated.View>
        <Text style={styles.gdText}>功德</Text>
      </View>
      <Pressable onPress={onPressAdd}>
        <SvgWoodenFish width="100" height="100" />
      </Pressable>
      <Pressable onPress={resetCount} style={styles.resetButtonStyle}>
        <Text style={styles.resetStyle}>重置</Text>
      </Pressable>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.subPageStyleEat}>
      <Text>开发中...</Text>
    </View>
  );
}

function MyTabBar({state, descriptors, navigation}: any) {
  return (
    <View style={styles.flexRow}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label = route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.touchable}>
            <Icon
              name={index === 0 ? 'fish-outline' : 'sad-outline'}
              size={28}
              color={isFocused ? '#eda314' : '#222'}
              style={styles.tabBarStyle}
            />
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: isFocused ? '#eda314' : '#222',
                textAlign: 'center',
                fontSize: 10,
              }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="电子木鱼" component={HomeScreen} />
        <Tab.Screen name="今天吃什么" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  subPageStyleMu: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111',
    flexDirection: 'column',
  },
  subPageStyleEat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    height: 50,
  },
  touchable: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  tabBarStyle: {
    textAlign: 'center',
  },
  gdText: {
    color: '#444',
    textAlign: 'center',
  },
  countStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 120,
  },
  currentGdStyle: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#fff',
  },
  resetButtonStyle: {
    width: 70,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  resetStyle: {
    color: '#000',
    textAlign: 'center',
    lineHeight: 30,
  },
  musicIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
});

export default App;
