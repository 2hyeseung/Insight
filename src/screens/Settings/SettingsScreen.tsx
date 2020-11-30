import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert, Switch, Linking } from 'react-native';
import Audio from 'expo-av';
import { moderateScale } from 'react-native-size-matters';
import Service_info from '../Settings/Service_info'

interface Props {
  navigation: any,
  route: any,
}


const AUTORENDER = true;

export default class RoutineScreen extends React.Component<Props> {
  rafID?: number;
  
  headerStyle = () => {
    this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{backgroundColor: '#6B98FF'}}
            onPress={() => 
              Alert.alert(
                '도움말','\n현재 페이지는 설정 페이지입니다.\n 1. 시스템 설정을 위한 소리, 푸시알림, 로그아웃 버튼이 있습니다.\n2. 서비스 정보를 안내를 위한 서비스 안내, 개인정보 처리방침, 오픈소스 라이선스 고지 정보 버튼이 있습니다.\n',
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
    //const [isEnabled, setIsEnabled] = useState(false);
    //const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={{height: 90,justifyContent:'center', paddingLeft:13, flex:1}}>
            <Text style={{fontSize:40, fontWeight:'700'}}>시스템 설정</Text>
          </View>

          
          <View style={styles.SwitchStyle} accessibilityLabel='소리 설정'>
           <View style={{flex:1, justifyContent:'center'}}>
             <Text style={{fontSize:35}}>소리</Text>
           </View>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                style={{flex:1, justifyContent:'center',
                transform: [{ scaleX: .8 }, { scaleY: .8 }]  }}
                //thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                //onValueChange={toggleSwitch}
                //value={isEnabled}
            />
          </View>

          <TouchableOpacity style={styles.TouchableStyle}
            onPress={() => 
            Alert.alert(
              '알림','고대비 모드 서비스 준비 중입니다.',
              [{ text: "확인" }]
            )}>
            <Text style={{fontSize:35}}>화면 고대비 모드</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableStyle}
          onPress={() => 
            Alert.alert(
              '알림','푸시 알림 서비스 준비 중입니다.',
              [{ text: "확인" }]
            )}>
            <Text style={{fontSize:35}}>푸시알림</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subContainer}>
          <View style={{height: 80,justifyContent:'center', paddingLeft: 13,}}>
            <Text style={{fontSize:40, fontWeight:'700'}}>서비스 정보</Text>
          </View>
          <TouchableOpacity 
            style={styles.TouchableStyle}
            onPress={()=>this.props.navigation.navigate('Service_info')}>
            <Text style={{fontSize:35}}>서비스 안내</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.TouchableStyle}
            onPress={()=>this.props.navigation.navigate('Privacy_info')}>
            <Text style={{fontSize:35}}>개인정보 처리 방침</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.TouchableStyle}
            onPress={() => 
              Linking.openURL(
                'mailto:0000@gmail.com?subject=[서비스 문의]')} //[수정] 대표자 이메일 수정
            >
            <Text style={{fontSize:35}}>이메일 문의</Text>
          </TouchableOpacity>

        </View>
      </View>
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
  subContainer: {
    backgroundColor: '#CEdAd2',
    justifyContent:'center',
    marginBottom: 13,
    height:'48%'
  },
  TouchableStyle: {
    backgroundColor: 'white',
    marginBottom: 5,
    flex:1,
    justifyContent:'center',
    paddingLeft:13,
  },
  SwitchStyle: {
    backgroundColor: 'white',
    marginBottom: 5,
    flex:1,
    justifyContent:'center',
    paddingLeft:13,
    flexDirection: 'row'
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
