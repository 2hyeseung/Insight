import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert, ScrollView, Dimensions } from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useKeepAwake } from 'expo-keep-awake';

interface Props {
  navigation: any,
  route: any,
}


const AUTORENDER = true;

const KeepAwake = () => {
  useKeepAwake();
  return null;
};

export default class Explain_Squart extends React.Component<Props> {
  rafID?: number;

  state={
    dark: 'false',
  }

  headerStyle = () => {
    this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity

            onPress={() => 
              Alert.alert(
                '도움말','스쿼트 동작에 대한 자세한 설명을 제공하는 페이지입니다. 스쿼트에 대한 설명을 통해 정확한 자세를 익혀보세요.',
                [{ text: "확인" }]
              )}
            
            accessibilityLabel='도움말'
          >
            <Image 
            style={{width: 30, height: 30, marginRight:10}}
 source={this.state.dark=='false'?require('../../../assets/icons/help_black.png'):require('../../../assets/icons/help_yellow.png')} />
          </TouchableOpacity>
        )
        
    })
  }

  UNSAFE_componentWillMount(){
    AsyncStorage.getItem('dark', (err, result) => {
      if (result == null) {
        this.setState({dark:'false'})
      } else {
        this.setState({dark:result})
      }
    })
  }


  render() {
    this.headerStyle();

    return (
      <ScrollView style={this.state.dark=='false'?styles.mainContainer:styles.mainContainer_dark} bounces={true}>
        <KeepAwake />
        <Image
            resizeMode='contain'
            style={{ width: Dimensions.get('window').width*0.9, 
            height: Dimensions.get('window').height*0.3, alignSelf:'center', marginTop:5,marginBottom:1}}
            source={require('../../../assets/icons/squart.png')} />
          <View style={styles.sectionContainer}>
            <Text style={{fontSize:20, fontWeight:'700'}}>먼저 왼쪽으로 90도 돌아주세요. 어깨넓이로 다리를 벌리고, 양팔은 가슴근처에 가볍게 모아주세요. </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={{fontSize:20, fontWeight:'700'}}>그대로 무릎을 굽혀 허리 위 상반신을 내려주세요. 이때 상체를 가능한 똑바로 세워주세요. 허벅지와 바닥이 평행을 이룰 때까지 허리를 낮춰주세요. 그리고 가능하면 평행 상태에서 1초 정도 머뭅니다. </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={{fontSize:20, fontWeight:'700'}}>숨을 뱉으면서 무릎과 등을 세우면서 허리를 올려주세요.</Text>
          </View>
          
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#ddf7f7',
      
  },
  mainContainer_dark: {
    height: '100%',
    backgroundColor: '#434248',
      
  },
  sectionContainer: {
    backgroundColor: 'white',
    justifyContent:'center',
    padding:10,
    borderRadius:10,
    marginHorizontal:10,
    marginTop:10,
  },
  buttonText: {
    fontSize:45,
    fontWeight:'700',
  },
  TitleText: {
    fontSize:40,
    fontWeight: 'bold'
  }

});
