import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity,Image,Alert} from 'react-native';

interface Props {
  navigation: any,
  route: any,
}

const AUTORENDER = true;

export default class HomeScreen extends React.Component<Props> {
  rafID?: number;


  headerStyle = () => {
    this.props.navigation.setOptions({         
      headerStyle:{
        backgroundColor: '#ffffff',
      },
      headerTitleAlign: 'center',
      headerTitleStyle:{
        fontWeight: 'bold',
        color:'black',
        fontSize: 40
      },
      headerRight: () => (
        <TouchableOpacity
            onPress={() => Alert.alert(
            '도움말','\n안녕하세요 AI 홈트레이닝 서비스 INSIGHT입니다. 각 페이지 상단 좌측에는 뒤로가기 버튼, 우측에는 도움말 버튼이 있습니다.\n\n현재 페이지는 Insight 홈화면 입니다. 운동시작을 원하시면 ‘운동시작 버튼’을, 운동 루틴 생성을 원하시면 ‘운동시작 버튼’을, 체력측정 및 운동 히스토리를 확인하려면 ‘마이페이지 버튼’, 시스템 설정 및 서비스 안내를 원하시면 ‘설정 버튼’을 눌러주세요.\n',[{ text: "확인" }])}
            accessibilityLabel='도움말'
          >
            <Image 
                style={{width: 30, height: 30, marginRight:10}}
                source={require('../../assets/icons/help_black.png')} 
            />
          </TouchableOpacity>
      )
    })
  }

  render() {
    this.headerStyle();
    
    return (
      <View style={styles.buttonContainer}>
        <Text style={{
          alignItems:'center',justifyContent:'center', textAlign:'center',
          fontSize:24,fontWeight:'600'
          ,marginTop:15,marginBottom:10}}>
          당신 근처의 헬스 트레이너</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={()=>{
          this.props.navigation.navigate('Exercise',{
              userIdx: 100,
              userName: 'gildong',
              userLastName: 'Hong',
            });
          }}
        >
          <Text style={styles.buttonText}>운동 시작</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={()=>{this.props.navigation.navigate('Explain');}}
          style={styles.buttonStyle}>
            <Text style={styles.buttonText}>운동 동작 설명</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={()=>{this.props.navigation.navigate('MyPage');}}
        >
            <Text style={styles.buttonText}>마이 페이지</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={()=>{this.props.navigation.navigate('Settings');}}
        >
          <Text style={styles.buttonText}>설정</Text>
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: '#CEEAE2',
    justifyContent:'center',   //^^felx-end로 하고 빈 곳 이미지로 채우든지??
  },
  buttonStyle: {
    backgroundColor: '#91AAF2',
    marginBottom: '5%',
    borderRadius: 20,
    height:'19%',
    alignItems: 'center',
    justifyContent:'center',
    marginHorizontal:5,
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
