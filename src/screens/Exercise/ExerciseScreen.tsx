import React from 'react';
import {Image, Text, StyleSheet, View, TouchableOpacity,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as tf from '@tensorflow/tfjs';

interface Props {
  navigation: any,
  route: any,
}

const AUTORENDER = true;
const BACKEND_TO_USE = 'rn-webgl';


export default class ExerciseScreen extends React.Component<Props> {
  rafID?: number;
  
  async componentDidMount() {
    await tf.setBackend(BACKEND_TO_USE);
    await tf.ready();
  }

  headerStyle = () => {
    this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{backgroundColor: '#6B98FF'}}
            onPress={() => 
              Alert.alert(
                '도움말','\n운동시작 페이지입니다. 개별 운동을 연습하시려면 \'운동 리스트\'를, 스토리모드를 진행하시려면 \'스토리 모드\'버튼을 눌러주세요.\n',
                [{ text: "확인" }]
              )}
            //color="green"
            accessibilityLabel='도움말'
          >
            <Image 
            style={{width: 30, height: 30, marginRight:10}}
            source={require('../../../assets/icons/help.png')} />
          </TouchableOpacity>
        )
    })
  }

  render() {
    this.headerStyle();

    const {params} = this.props.route;
    const userIdx = params? params.userIdx : null;
    const userName = params? params.userName : null;
    const userLastName = params? params.userLastName : null;

    return (
      <ScrollView style={styles.mainContainer} bounces={true}>
          <View style={{height: 90,justifyContent:'center', paddingLeft:13, flex:1}}>
            <Text style={{fontSize:30, fontWeight:'700'}}>운동 모드 선택</Text>
          </View>

         <TouchableOpacity style={styles.TouchableStyle}
           onPress={()=>{this.props.navigation.navigate('exercise_list');}}>
            <Text style={{fontSize:30}}>운동 리스트</Text>
         </TouchableOpacity>


          <TouchableOpacity style={styles.TouchableStyle}
            onPress={()=>Alert.alert("알림","스토리 모드 서비스 준비 중입니다.", [{ text: "확인" }],)}>
            <Text style={{fontSize:30}}>스토리 모드</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.TouchableStyle}
           onPress={()=>{this.props.navigation.navigate('RussianTwist');}}>
            <Text style={{fontSize:30}}>테스트</Text>
         </TouchableOpacity> */}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  mainContainer: {
    height: '100%',
    backgroundColor: '#CEEAE2',
    //justifyContent:'center',   
  },
  TouchableStyle: {
    backgroundColor: 'white',
    marginBottom: 15,
    height:100,
    justifyContent:'center',
    paddingLeft:13,
    borderRadius:10,
    marginHorizontal:10,
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
