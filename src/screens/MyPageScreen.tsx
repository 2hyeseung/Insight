import React from 'react';
import {ActivityIndicator, Button, Text, StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';



interface Props {
  navigation: any,
  route: any,
}



const AUTORENDER = true;

export default class MyPageScreen extends React.Component<Props> {
  rafID?: number;
  headerStyle = () => {
    this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{backgroundColor: '#6B98FF'}}
            onPress={() => 
              Alert.alert(
                '도움말','마이 페이지입니다.',
                [{ text: "확인" }]
              )}
            //color="green"
            accessibilityLabel='도움말'
          >
            <Image 
            style={{width: 30, height: 30, marginRight:10}}
            source={require('../../assets/icons/help.png')} />
          </TouchableOpacity>
        )
    })
  }
  render() {
    this.headerStyle();
    return (
      <View style={{width:'100%'}}>
        <View style={styles.sectionContainer}>
          <Text>MyPage screen</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 200,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  cameraContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  camera : {
    position:'absolute',
    left: 50,
    top: 100,
    width: 600/2,
    height: 800/2,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
  },
  modelResults: {
    position:'absolute',
    left: 50,
    top: 100,
    width: 600/2,
    height: 800/2,
    zIndex: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
  }
});
