import React from 'react';
import {Image, Text, StyleSheet, View, TouchableOpacity,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderBackButton } from 'react-navigation-stack'

import * as tf from '@tensorflow/tfjs';

interface Props {
  navigation: any,
  route: any,
}

const AUTORENDER = true;
const BACKEND_TO_USE = 'rn-webgl';


export default class Exercise_list extends React.Component<Props> {
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
                '도움말','\n운동시작 페이지입니다. 운동루틴 목록에서 시작하려는 운동루틴을 골라 선택해 주세요.\n운동루틴에 담긴 운동 종목을 확인하시려면 ‘루틴 확인’버튼을,\n운동루틴을 선택하시려면 ‘루틴 시작’버튼을 눌러주세요.\n',
                [{ text: "확인" }]
              )}
            //color="green"
            accessibilityLabel='도움말'
          >
            <Image 
            style={{width: 30, height: 30, marginRight:10}}
            source={require('../../../assets/icons/help.png')} />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <HeaderBackButton 
          onPress={() =>this.props.navigation.navigate("Exercise")}
          tintColor='#ffffff'
          />
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
            <Text style={{fontSize:30, fontWeight:'700'}}>나의 운동루틴 목록</Text>
          </View>

         <TouchableOpacity 
           style={styles.TouchableStyle}
           onPress={()=>{this.props.navigation.navigate('exercise_guide', {exerciseName:'squart'});}}>
            <Text style={{fontSize:35}}>스쿼트</Text>
         </TouchableOpacity>


          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('exercise_guide', {exerciseName:'tree'});}}>
            <Text style={{fontSize:35}}>나무 자세</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('exercise_guide', {exerciseName:'standingside'});}}>
            <Text style={{fontSize:35}}>스탠딩 사이드</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('exercise_guide', {exerciseName:'backback'});}}>
            <Text style={{fontSize:35}}>백 익스텐션</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('exercise_guide', {exerciseName:'ChestOpener'});}}>
            <Text style={{fontSize:35}}>체스트 오프너</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('exercise_guide', {exerciseName:'RussianTwist'});}}>
            <Text style={{fontSize:35}}>러시안 트위스트</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('exercise_guide', {exerciseName:'BellyBomb'});}}>
            <Text style={{fontSize:35}}>벨리 밤</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('exercise_guide', {exerciseName:'SideBomb'});}}>
            <Text style={{fontSize:35}}>사이드 밤</Text>
          </TouchableOpacity>                              
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
