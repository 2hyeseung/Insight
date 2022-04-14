import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert, Dimensions, ActivityIndicator, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import AppIntroSlider from 'react-native-app-intro-slider';

interface Props {
  navigation: any,
}


const slides = [
  {
    key: 1,
    text:
      '안녕하세요, 배리어프리 헬스 트레이닝 어플리케이션 INSIGHT입니다. 각 화면 상단에는 헤더가 위치하여 뒤로가기 버튼과 도움말 버튼을 이용하실 수 있습니다.'
    ,
    backgroundColor: '#abf5f7',
    image: require('../../assets/favicon.png'),
  },
  {
    key: 2,
    title: '1. 운동 시작',
    text:
      '\'운동 시작\' 메뉴를 통해 리스트 모드, 스트리 모드를 선택할 수 있습니다. 모드 선택 후 카메라 가이드와 운동 음성 피드백을 이용하여 안전하고 효과적인 헬스케어를 체험하세요.\n\n*음성 피드백을 위해 카메라 볼륨을 알맞게 조절하세요.\n*높은 동작 인식률과 안전을 위해 최대한 주위 사물이 없는 곳에서 운동을 진행하세요.\n'
    ,
    backgroundColor: '#abf7f7',
    image: require('../../assets/icons/1.png'),
  },
  {
    key: 3,
    title: '2. 운동 동작 설명',
    text: '여러 운동 동작 중 따라하기 어렵거나 헷갈리는 운동을 선택하여 자세한 설명을 듣고 정확한 운동 동작을 배우실 수 있습니다.',
    backgroundColor: '#abf7e9',
    image: require('../../assets/icons/2.png'),
  },
  {
    key: 4,
    title: '3. 마이페이지',
    text: '마이페이지에서는 \'히스토리\'와 \'업적\' 기능을 제공합니다. \n\'히스토리\'는 최근 7일간 사용자의 운동 시간과 종목 기록을 사용자가 체계적으로 운동 습관을 관리할 수 있도록 돕습니다. \n\'업적\' 기능은 운동 횟수와 시간 등 일정 조건을 만족하면 업적 타이틀을 제공하여 운동에 재미와 성취감을 느끼실 수 있습니다.',
    backgroundColor: '#abf7d6',
    image: require('../../assets/icons/3.png'),
  },
  {
    key: 5,
    title: '4. 설정',
    text: '설정 페이지에서는 \'고대비 테마\'를 제공합니다. 고대비 테마를 on/off 하여, 개인의 특성에 따라 어플리케이션의 사용성과 접근성을 향상시킬 수 있습니다.\n또한, 공식 인스타그램 링크와 메일을 통해 개발자와 소통하실 수 있습니다.',
    backgroundColor: '#abf7be',
    image: require('../../assets/icons/4.png'),
  }
];


export default class HomeScreen extends React.Component<Props> {
  rafID?: number;
  state = {
    dark: 'false',
    isReady: false,
    modalVisible: false
  }

  headerStyle = () => {
    this.props.navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: this.state.dark == 'false' ? '#43d5e9' : '#0d0d0d',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 40
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => Alert.alert(
            '도움말', '\n안녕하세요 AI 홈트레이닝 서비스 INSIGHT입니다. 각 페이지 상단 좌측에는 뒤로가기 버튼, 우측에는 도움말 버튼이 있습니다.\n\n현재 페이지는 Insight 홈화면 입니다. 운동시작을 원하시면 ‘운동 시작’ 버튼을, 운동에 대한 자세한 설명을 확인하시려면 ‘운동 동작 설명’ 버튼을, 운동 히스토리 및 업적을 확인하려면 ‘마이페이지’ 버튼, 시스템 설정 및 서비스 안내를 원하시면 ‘설정’ 버튼을 눌러주세요.\n', [{ text: "확인" }])}
          accessibilityLabel='도움말'
        >
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={this.state.dark == 'false' ? require('../../assets/icons/help_black.png') : require('../../assets/icons/help_yellow.png')} />

        </TouchableOpacity>
      )
    })
  }

  headerStyle2 = () => {
    this.props.navigation.setOptions({
      headerShown: false
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Gong': require('../../assets/fonts/Gong_Gothic_Medium.ttf'),
      'SCDream3': require('../../assets/fonts/SCDream3.otf'),
      'SCDream5': require('../../assets/fonts/SCDream5.otf'),
    });
    this.setState({ isReady: true })

    try {
      const isFirstLaunched = await AsyncStorage.getItem('keyFirstLaunch'); //우선 값을 읽자.
      if (isFirstLaunched === null) {  // 값이 없다면,
        AsyncStorage.setItem('keyFirstLaunch', 'true'); // 키값에 true로고 저장하고,
        this.setState({ modalVisible: true });
      } else {
        this.setState({ modalVisible: false });
      } // 값이 없다면, 최초 실행 아님 !!
    } catch (error) {
      // 에러 발생 시에도 false 로 반환 
      this.setState({ modalVisible: false });
    }
  }


  _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <View style={styles.ImageContainer}>
          <Image source={item.image} style={styles.Image} accessible={false} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  }
  _onDone = () => {
    this.setState({ modalVisible: false });
  }

  _renderDoneButton = () => {
    return (
      <View style={{
        height: height * 0.1,
        justifyContent: 'center', alignItems: 'flex-end',
        marginHorizontal: 25, paddingBottom: height * 0.05
      }}>
        <Text style={{ fontSize: 25, color: '#3a3d3d' }}>종료</Text>
      </View>
    );
  }
  _renderNextButton = () => {
    return (
      <View style={{
        height: height * 0.1,
        justifyContent: 'center', alignItems: 'flex-end',
        marginHorizontal: 25, paddingBottom: height * 0.05
      }}>
        <Text style={{ fontSize: 25, color: '#3a3d3d' }}>다음</Text>
      </View>
    );
  }
  _renderPrevButton = () => {
    return (
      <View style={{
        height: height * 0.1,
        justifyContent: 'center', alignItems: 'flex-start',
        marginHorizontal: 25, paddingBottom: height * 0.05
      }}>
        <Text style={{ fontSize: 25, color: '#3a3d3d' }}>이전</Text>
      </View>
    );
  }

  _renderSkipButton = () => {
    return (
      <View style={{
        height: height * 0.1,
        justifyContent: 'center', alignItems: 'flex-start',
        marginHorizontal: 25, paddingBottom: height * 0.05
      }}>
        <Text style={{ fontSize: 25, color: '#3a3d3d' }}>건너뛰기</Text>
      </View>
    );
  }



  render() {
    
    AsyncStorage.getItem('dark', (err, result) => {
      if (result == null) {
        this.setState({ dark: 'false' })
      } else {
        this.setState({ dark: result })
      }
    })

    const { width, height } = Dimensions.get('window');


    if (this.state.isReady) {
      if (this.state.modalVisible) {
        this.headerStyle2();
        return (
          <AppIntroSlider
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            renderPrevButton={this._renderPrevButton}
            renderSkipButton={this._renderSkipButton}
            dotClickEnabled={false}
            activeDotStyle={{
              backgroundColor: 'rgba(255, 255, 255, .9)', marginBottom: height * 0.15
            }}
            dotStyle={{
              backgroundColor: 'rgba(0, 0, 0, .2)', marginBottom: height * 0.15
            }}
            showSkipButton
            showPrevButton

            renderItem={this._renderItem}
            data={slides}
            onDone={this._onDone} />
        )
      } else {
        this.headerStyle();
        return (
          <View style={{ flex: 1, backgroundColor: this.state.dark == 'false' ? 'white' : '#434248', }}>
            <View style={{
              height: '17%', backgroundColor: this.state.dark == 'false' ? '#43d5e9' : '#0d0d0d',
              borderBottomLeftRadius: 50, borderBottomRightRadius: 50,
              shadowColor: 'black',
              shadowOpacity: 60,//그림자 투명도
              shadowOffset: { width: 2, height: 2 }, //그림자 위치
              elevation: 10,
            }}>
              <Text style={{
                fontSize: width * 0.09, fontWeight: '900', color: this.state.dark == 'false' ? '#19202E' : 'yellow',
                marginLeft: '10%', letterSpacing: 10, lineHeight: height * 0.07, fontFamily: 'Gong'
              }}>
                INSIGHT
          </Text>
              <Text style={{
                fontSize: width * 0.036, fontWeight: '100', color: this.state.dark == 'false' ? 'black' : 'yellow',
                marginLeft: '10.2%', letterSpacing: 8, fontFamily: 'SCDream3'
              }}>
                당신의 헬스 트레이너
             </Text>
            </View>

            <View style={this.state.dark == 'false' ? styles.buttonContainer : styles.buttonContainer_dark}>
              <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: this.state.dark == 'false' ? '#3feddc' : '#0d0d0d' }]}
                onPress={() => {
                  this.props.navigation.navigate('Exercise');
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: height * 0.1, marginLeft: '7%', marginRight: '5%' }}
                  source={require('../../assets/icons/1.png')} />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[styles.buttonText, this.state.dark == 'false' ? { color: 'black' } : { color: 'yellow' }]}>운동 시작</Text>
                  <Text style={styles.buttonText2}>Start workout</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { this.props.navigation.navigate('Explain'); }}
                style={[styles.buttonStyle, { backgroundColor: this.state.dark == 'false' ? '#62f4c7' : '#0d0d0d' }]}>
                <Image
                  resizeMode="contain"
                  style={{ width: height * 0.1, marginLeft: '7%', marginRight: '5%' }}
                  source={require('../../assets/icons/2.png')} />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[styles.buttonText, this.state.dark == 'false' ? { color: 'black' } : { color: 'yellow' }]}>운동 동작 설명</Text>
                  <Text style={styles.buttonText2}>Exercise Tutorial</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: this.state.dark == 'false' ? '#37f5ad' : '#0d0d0d' }]}
                onPress={() => { this.props.navigation.navigate('MyPage'); }}>
                <Image
                  resizeMode="contain"
                  style={{ width: height * 0.1, marginLeft: '7%', marginRight: '5%'}}
                  source={require('../../assets/icons/3.png')} />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[styles.buttonText, this.state.dark == 'false' ? { color: 'black' } : { color: 'yellow' }]}>마이 페이지</Text>
                  <Text style={styles.buttonText2}>My page</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: this.state.dark == 'false' ? '#04f099' : '#0d0d0d' }]}
                onPress={() => { this.props.navigation.navigate('Settings'); }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: height * 0.1, marginLeft: '7%', marginRight: '5%' }}
                  source={require('../../assets/icons/4.png')} />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[styles.buttonText, this.state.dark == 'false' ? { color: 'black' } : { color: 'yellow' }]}>설정</Text>
                  <Text style={styles.buttonText2}>Settings</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    else {
      return <View style={styles.loadingIndicator}><ActivityIndicator size='large' color='#43d5e9' /></View>;
    }
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: '10%'
  },
  buttonContainer_dark: {
    flex: 1,
    backgroundColor: '#434248',
    marginVertical: '10%'
  },
  buttonStyle: {
    backgroundColor: '#91AAF2',
    marginBottom: '4%',
    borderRadius: 25,
    height: '23%',
    alignItems: 'center',
    marginHorizontal: '4%',
    flexDirection: "row",
  },
  buttonText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#4a5455',
  },
  buttonText2: {
    fontSize: width * 0.045,
    lineHeight: height * 0.033,
    fontWeight: '500',
    color: '#4a5455',
    fontFamily: 'SCDream3'
  },
  slide: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 17,
    color: '#3a3d3d',
    textAlign: 'center',
    marginTop: 7
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 0.55,
    marginHorizontal: 20
  },
  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.45,
  },
  Image: {
    width: width * 0.6, height: width * 0.6, borderRadius: width * 0.6,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3a3d3d',
    textAlign: 'center',
    marginTop: 20
  },
});
