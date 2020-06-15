import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
 */
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', flex: 1, marginTop: 64}}>
        <Image
          source={require('./assets/home.jpg')}
          style={{width: undefined, height: undefined, flex: 1}}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        <Text style={{fontWeight: '100', fontSize: 32}}>Home Screen</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Music', {
              userName: 'Israel',
              action: 'Like the video!',
            });
          }}>
          <Text style={{color: '#fff'}}>Go to the Music Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor: '#23a6d9',
              borderWidth: 1,
              backgroundColor: '#ffffff',
            },
          ]}
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Text style={{color: '#23a6d9'}}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MusicScreen({route, navigation}) {
  let [liked, setLiked] = React.useState(false);
  let {userName, action} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setLiked(preState => !preState);
          }}>
          <FontAwesome
            name={liked ? 'heart' : 'heart-o'}
            size={24}
            color="#ffffff"
            style={{marginRight: 16}}
          />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <View style={{width: '100%', flex: 1, marginTop: 64}}>
        <Image
          source={require('./assets/music.jpg')}
          style={{width: undefined, height: undefined, flex: 1}}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        <Text style={{fontWeight: '100', fontSize: 32}}>Music Screen</Text>
        <Text style={{fontWeight: '600', marginVertical: 32}}>
          {userName} says to {action}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={{color: '#fff'}}>Go to the Home Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor: '#23a6d9',
              borderWidth: 1,
              marginTop: 12,
              backgroundColor: '#ffffff',
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{color: '#12a6d9'}}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CustomHeader() {
  return <FontAwesome name="music" size={24} color="#ffffff" />;
}

function SettingScreen() {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', flex: 1, marginTop: 64}}>
        <Image
          source={require('./assets/cats.jpg')}
          style={{width: undefined, height: undefined, flex: 1}}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 2, aligItems: 'center'}}>
        <Text style={{fontWeight: '100', fontSize: 32}}>Setting Screen</Text>
      </View>
    </View>
  );
}

function DetailScreen() {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', flex: 1, marginTop: 64}}>
        <Image
          source={require('./assets/cats2.jpg')}
          style={{width: undefined, height: undefined, flex: 1}}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 2, aligItems: 'center'}}>
        <Text style={{fontWeight: '100', fontSize: 32}}>Detail Screen</Text>
      </View>
    </View>
  );
}

function Badge({name, count, color, size}) {
  return (
    <View style={{width: 23, height: 24}}>
      <FontAwesome name={name} size={size} color={color} />

      {count > 0 && (
        <View style={styles.badge}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: '600'}}>
            {count}
          </Text>
        </View>
      )}
    </View>
  );
}

const Main = createStackNavigator();
const Setting = createBottomTabNavigator();

function SettingTabs() {
  return (
    <Setting.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          if (route.name === 'SettingScreen') {
            return <Badge name="cog" color={color} size={size} count="8" />;
          }
          return <FontAwesome name="paperclip" color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#23a6d9',
        inactiveTintColor: 'gray',
      }}>
      <Setting.Screen name="SettingScreen" component={SettingScreen} />
      <Setting.Screen name="DetailScreen" component={DetailScreen} />
    </Setting.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Main.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#23a6d9',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '200',
            fontSize: 30,
          },
        }}>
        <Main.Screen name="Home" component={HomeScreen} />
        <Main.Screen
          name="Music"
          component={MusicScreen}
          options={{
            headerTitle: props => <CustomHeader {...props} />,
          }}
        />
        <Main.Screen name="Setting" component={SettingTabs} />
      </Main.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#23a6d9',
    paddingVertical: 12,
    width: 250,
    borderRadius: 12,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#ff6583',
    borderRadius: 6,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
