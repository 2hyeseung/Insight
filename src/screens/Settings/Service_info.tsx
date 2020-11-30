import React from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Image, Alert, Switch, Linking } from 'react-native';
import Audio from 'expo-av';
import { moderateScale } from 'react-native-size-matters';


interface Props {
  navigation: any,
  route: any,
}


const AUTORENDER = true;

export default class Service_info extends React.Component<Props> {
  rafID?: number;
  
  headerStyle = () => {
    this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{backgroundColor: '#6B98FF'}}
            onPress={() => 
              Alert.alert(
                '도움말','\n현재 페이지는 [설정]-[서비스 안내] 페이지 입니다.\n 서비스 기능, 페이지 이동 방법, 제작 지원에 대해 안내합니다.',
                [{ text: "확인" }],
                
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
      <ScrollView style={styles.mainContainer}>
        <View style={styles.subContainer}>

          <Text style={{fontSize:40, fontWeight:'700'}}>서비스 안내</Text>

          <Text style={{fontSize:25}}>
          안녕하세요, 배리어프리 헬스 트레이닝 어플리케이션 'INSIGHT'입니다.
          'INSIGHT'를 통해 건강한 신체와 마음을 가꾸실 수 있도록 노력하겠습니다.{"\n"}{"\n"}
          </Text>

          <Text style={{fontSize:30, fontWeight:'700'}}>[기능소개]</Text>
          <Text style={{fontSize:25, fontWeight:'700'}}>1. 운동시작 기능</Text>
          <Text style={{fontSize:25}}>
          - 모바일 기기의 전면카메라를 이용하여 사용자의 운동자세의 정확도를 판단하고 청각 피드백을 제공합니다.{"\n"}
          - 운동 동작에 대한 자세한 설명과 동작 수행에 대한 피드백을 음성을 통해 제공합니다.{"\n"}
          </Text>
          
          <Text style={{fontSize:25, fontWeight:'700'}}>2. 체력테스트 기능</Text>
          <Text style={{fontSize:25}}>
          - 트레이닝에 따른 체력 향상 정도를 파악하기 위한 기능입니다.{"\n"}
          - 특정 운동종목을 통해 체력을 측정하고 수행 정확도와 횟수 등을 고려하여 상/중/하 세 단계로 체력 등급을 측정받습니다.{"\n"}
          </Text>

          <Text style={{fontSize:25, fontWeight:'700'}}>3. 히스토리 기능</Text>
          <Text style={{fontSize:25}}>
          - 최근 일주일 간 수행한 운동의 종목과 총 운동 시간을 기록하여 그래프로 제공합니다.{"\n"}{"\n"}
          </Text>


          <Text style={{fontSize:30, fontWeight:'700'}}>[페이지 이동 안내]</Text>
          <Text style={{fontSize:25}}>
          - 각 페이지의 최상단에 위치한 헤더에 '뒤로가기 버튼'과 현재 페이지 이름, '도움말 버튼'이 있습니다.{"\n"}
          - 현재 페이지 이름을 확인하시고, 이전 페이지로 돌아가기를 원하신다면 '뒤로가기 버튼'을 이용해주세요.{"\n"}
          - 현재 페이지가 제공하는 기능과 구성이 궁금하시다면 도움말 버튼을 이용주시길 바랍니다.{"\n"}
          {"\n"}
          </Text>


          <Text style={{fontSize:30, fontWeight:'700'}}>[제작지원 안내]</Text>
          <Text style={{fontSize:25}}>
          'Insight'는 현대오토에버와 서울사회복지공동모금회의 지원으로 제작되었습니다. 
          </Text>

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
    backgroundColor: 'white',
    //justifyContent:'center',   
  },
  subContainer: {
    backgroundColor: 'white',
    flex:1,
    paddingHorizontal:15
  },
  TitleText: {
    fontSize:40,
    fontWeight: 'bold'
  }

});
