import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack'



interface Props {
  navigation: any,
  route: any,
}


const AUTORENDER = true;

export default class ExplainScreen extends React.Component<Props> {
  rafID?: number;
  headerStyle = () => {
    this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{backgroundColor: '#6B98FF'}}
            onPress={() => 
              Alert.alert(
                '도움말','운동 동작 설명 페이지입니다. 자세한 동작 설명을 원하는 운동을 선택하여 정확한 자세를 익혀보세요.',
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
      <ScrollView style={styles.mainContainer} bounces={true}>
          <View style={{height: 90,justifyContent:'center', paddingLeft:13, flex:1}}>
            <Text style={{fontSize:30, fontWeight:'700'}}>운동 동작 목록</Text>
          </View>

         <TouchableOpacity 
           style={styles.TouchableStyle}
           onPress={()=>{this.props.navigation.navigate('Explain_Squart');}}>
            <Text style={{fontSize:35}}>스쿼트</Text>
         </TouchableOpacity>


          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('Explain_Tree');}}>
            <Text style={{fontSize:35}}>나무 자세</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('Explain_StandingSide');}}>
            <Text style={{fontSize:35}}>스탠딩 사이드</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('Explain_Backback');}}>
            <Text style={{fontSize:35}}>백 익스텐션</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('Explain_ChestOpener');}}>
            <Text style={{fontSize:35}}>체스트 오프너</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('Explain_RussianTwist');}}>
            <Text style={{fontSize:35}}>러시안 트위스트</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('Explain_BellyBomb');}}>
            <Text style={{fontSize:35}}>벨리 밤</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableStyle}
          onPress={()=>{this.props.navigation.navigate('Explain_SideBomb');}}>
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
