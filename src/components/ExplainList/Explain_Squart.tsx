import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack'



interface Props {
  navigation: any,
  route: any,
}


const AUTORENDER = true;

export default class Explain_Squart extends React.Component<Props> {
  rafID?: number;
  headerStyle = () => {
    this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{backgroundColor: '#6B98FF'}}
            onPress={() => 
              Alert.alert(
                '도움말','스쿼트 동작에 대한 자세한 설명을 제공하는 페이지입니다. 스쿼트에 대한 설명을 통해 정확한 자세를 익혀보세요.',
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
    return (
      <ScrollView style={styles.mainContainer} bounces={true}>
          <View style={styles.sectionContainer}>
            <Text style={{fontSize:20, fontWeight:'700'}}>운동 설명설명1</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={{fontSize:20, fontWeight:'700'}}>운동 설명설명2</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={{fontSize:20, fontWeight:'700'}}>운동 설명설명3</Text>
          </View>
          
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
