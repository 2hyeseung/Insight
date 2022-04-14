import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any,
}

const { width, height } = Dimensions.get('window');

var moment = require('moment');
let start_date = moment();//.format("YYYY-MM-DD")
let today_date = moment()//.add(4,'d');

var diff = 0

var Backback = '_Backback'
var day1_Backback = 0
var day2_Backback = 0
var day3_Backback = 0
var day4_Backback = 0
var day5_Backback = 0
var day6_Backback = 0
var day7_Backback = 0
var BellyBomb = '_BellyBomb'
var day1_BellyBomb = 0
var day2_BellyBomb = 0
var day3_BellyBomb = 0
var day4_BellyBomb = 0
var day5_BellyBomb = 0
var day6_BellyBomb = 0
var day7_BellyBomb = 0
var ChestOpener = '_ChestOpener'
var day1_ChestOpener = 0
var day2_ChestOpener = 0
var day3_ChestOpener = 0
var day4_ChestOpener = 0
var day5_ChestOpener = 0
var day6_ChestOpener = 0
var day7_ChestOpener = 0
var RussianTwist = '_RussianTwist'
var day1_RussianTwist = 0
var day2_RussianTwist = 0
var day3_RussianTwist = 0
var day4_RussianTwist = 0
var day5_RussianTwist = 0
var day6_RussianTwist = 0
var day7_RussianTwist = 0
var SideBomb = '_SideBomb'
var day1_SideBomb = 0
var day2_SideBomb = 0
var day3_SideBomb = 0
var day4_SideBomb = 0
var day5_SideBomb = 0
var day6_SideBomb = 0
var day7_SideBomb = 0
var Squart = '_Squart'
var day1_Squart = 0
var day2_Squart = 0
var day3_Squart = 0
var day4_Squart = 0
var day5_Squart = 0
var day6_Squart = 0
var day7_Squart = 0
var Standingside = '_Standingside'
var day1_Standingside = 0
var day2_Standingside = 0
var day3_Standingside = 0
var day4_Standingside = 0
var day5_Standingside = 0
var day6_Standingside = 0
var day7_Standingside = 0
var Tree = '_Tree'
var day1_Tree = 0
var day2_Tree = 0
var day3_Tree = 0
var day4_Tree = 0
var day5_Tree = 0
var day6_Tree = 0
var day7_Tree = 0


AsyncStorage.getItem('start_date', (err, result) => {
  if (result == null) { start_date = null }
  else {
    start_date = moment(result)//.format("YYYY-MM-DD")

  }
})




export default class History extends React.Component<Props> {
  rafID?: number;

  state = {
    dark: 'false',
    isLoading: true,
    day1: '',
    day2: '',
    day3: '',
    day4: '',
    day5: '',
    day6: '',
    day7: '',
  }

  headerStyle = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity

          onPress={() =>
            Alert.alert(
              '도움말', '\n현재 페이지는 [마이페이지]-[운동 기록] 화면입니다. 최근 일주일 간 운동한 시간과 운동 종목 기록을 확인하실 수 있습니다.\n',
              [{ text: "확인" }],
            )}
          accessibilityLabel='도움말'
        >
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={this.state.dark == 'false' ? require('../../../assets/icons/help_black.png') : require('../../../assets/icons/help_yellow.png')} />
        </TouchableOpacity>
      )
    })
  }

  UNSAFE_componentWillMount() {
    AsyncStorage.getItem('dark', (err, result) => {
      if (result == null) {
        this.setState({ dark: 'false' })
      } else {
        this.setState({ dark: result })
      }
    })

    this.history()
  }

  async history() {

    if (today_date != null && start_date != null) {
      diff = today_date.diff(start_date, 'days')
    }

    //백익스텐션
    await AsyncStorage.getItem(diff.toString() + Backback, (err, result) => {
      if (result == null) { }
      else { day1_Backback = Number(result); }
    })
    await AsyncStorage.getItem((diff - 1).toString() + Backback, (err, result) => {
      if (result == null) { }
      else { day2_Backback = Number(result); }
    })
    await AsyncStorage.getItem((diff - 2).toString() + Backback, (err, result) => {
      if (result == null) { }
      else { day3_Backback = Number(result); }
    })
    await AsyncStorage.getItem((diff - 3).toString() + Backback, (err, result) => {
      if (result == null) { }
      else { day4_Backback = Number(result); }
    })
    await AsyncStorage.getItem((diff - 4).toString() + Backback, (err, result) => {
      if (result == null) { }
      else { day5_Backback = Number(result); }
    })
    await AsyncStorage.getItem((diff - 5).toString() + Backback, (err, result) => {
      if (result == null) { }
      else { day6_Backback = Number(result); }
    })
    await AsyncStorage.getItem((diff - 6).toString() + Backback, (err, result) => {
      if (result == null) { }
      else { day7_Backback = Number(result); }
    })
    //밸리밤
    await AsyncStorage.getItem(diff.toString() + BellyBomb, (err, result) => {
      if (result == null) { }
      else { day1_BellyBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 1).toString() + BellyBomb, (err, result) => {
      if (result == null) { }
      else { day2_BellyBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 2).toString() + BellyBomb, (err, result) => {
      if (result == null) { }
      else { day3_BellyBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 3).toString() + BellyBomb, (err, result) => {
      if (result == null) { }
      else { day4_BellyBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 4).toString() + BellyBomb, (err, result) => {
      if (result == null) { }
      else { day5_BellyBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 5).toString() + BellyBomb, (err, result) => {
      if (result == null) { }
      else { day6_BellyBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 6).toString() + BellyBomb, (err, result) => {
      if (result == null) { }
      else { day7_BellyBomb = Number(result); }
    })
    //체스트오프너
    await AsyncStorage.getItem(diff.toString() + ChestOpener, (err, result) => {
      if (result == null) { }
      else { day1_ChestOpener = Number(result); }
    })
    await AsyncStorage.getItem((diff - 1).toString() + ChestOpener, (err, result) => {
      if (result == null) { }
      else { day2_ChestOpener = Number(result); }
    })
    await AsyncStorage.getItem((diff - 2).toString() + ChestOpener, (err, result) => {
      if (result == null) { }
      else { day3_ChestOpener = Number(result); }
    })
    await AsyncStorage.getItem((diff - 3).toString() + ChestOpener, (err, result) => {
      if (result == null) { }
      else { day4_ChestOpener = Number(result); }
    })
    await AsyncStorage.getItem((diff - 4).toString() + ChestOpener, (err, result) => {
      if (result == null) { }
      else { day5_ChestOpener = Number(result); }
    })
    await AsyncStorage.getItem((diff - 5).toString() + ChestOpener, (err, result) => {
      if (result == null) { }
      else { day6_ChestOpener = Number(result); }
    })
    await AsyncStorage.getItem((diff - 6).toString() + ChestOpener, (err, result) => {
      if (result == null) { }
      else { day7_ChestOpener = Number(result); }
    })
    //러시안트위스트
    await AsyncStorage.getItem(diff.toString() + RussianTwist, (err, result) => {
      if (result == null) { }
      else { day1_RussianTwist = Number(result); }
    })
    await AsyncStorage.getItem((diff - 1).toString() + RussianTwist, (err, result) => {
      if (result == null) { }
      else { day2_RussianTwist = Number(result); }
    })
    await AsyncStorage.getItem((diff - 2).toString() + RussianTwist, (err, result) => {
      if (result == null) { }
      else { day3_RussianTwist = Number(result); }
    })
    await AsyncStorage.getItem((diff - 3).toString() + RussianTwist, (err, result) => {
      if (result == null) { }
      else { day4_RussianTwist = Number(result); }
    })
    await AsyncStorage.getItem((diff - 4).toString() + RussianTwist, (err, result) => {
      if (result == null) { }
      else { day5_RussianTwist = Number(result); }
    })
    await AsyncStorage.getItem((diff - 5).toString() + RussianTwist, (err, result) => {
      if (result == null) { }
      else { day6_RussianTwist = Number(result); }
    })
    await AsyncStorage.getItem((diff - 6).toString() + RussianTwist, (err, result) => {
      if (result == null) { }
      else { day7_RussianTwist = Number(result); }
    })
    //사이드밤
    await AsyncStorage.getItem(diff.toString() + SideBomb, (err, result) => {
      if (result == null) { }
      else { day1_SideBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 1).toString() + SideBomb, (err, result) => {
      if (result == null) { }
      else { day2_SideBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 2).toString() + SideBomb, (err, result) => {
      if (result == null) { }
      else { day3_SideBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 3).toString() + SideBomb, (err, result) => {
      if (result == null) { }
      else { day4_SideBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 4).toString() + SideBomb, (err, result) => {
      if (result == null) { }
      else { day5_SideBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 5).toString() + SideBomb, (err, result) => {
      if (result == null) { }
      else { day6_SideBomb = Number(result); }
    })
    await AsyncStorage.getItem((diff - 6).toString() + SideBomb, (err, result) => {
      if (result == null) { }
      else { day7_SideBomb = Number(result); }
    })
    //스쿼트
    await AsyncStorage.getItem(diff.toString() + Squart, (err, result) => {
      if (result == null) { }
      else { day1_Squart = Number(result); }
    })
    await AsyncStorage.getItem((diff - 1).toString() + Squart, (err, result) => {
      if (result == null) { }
      else { day2_Squart = Number(result); }
    })
    await AsyncStorage.getItem((diff - 2).toString() + Squart, (err, result) => {
      if (result == null) { }
      else { day3_Squart = Number(result); }
    })
    await AsyncStorage.getItem((diff - 3).toString() + Squart, (err, result) => {
      if (result == null) { }
      else { day4_Squart = Number(result); }
    })
    await AsyncStorage.getItem((diff - 4).toString() + Squart, (err, result) => {
      if (result == null) { }
      else { day5_Squart = Number(result); }
    })
    await AsyncStorage.getItem((diff - 5).toString() + Squart, (err, result) => {
      if (result == null) { }
      else { day6_Squart = Number(result); }
    })
    await AsyncStorage.getItem((diff - 6).toString() + Squart, (err, result) => {
      if (result == null) { }
      else { day7_Squart = Number(result); }
    })
    //스탠딩사이드
    await AsyncStorage.getItem(diff.toString() + Standingside, (err, result) => {
      if (result == null) { }
      else { day1_Standingside = Number(result); }
    })
    await AsyncStorage.getItem((diff - 1).toString() + Standingside, (err, result) => {
      if (result == null) { }
      else { day2_Standingside = Number(result); }
    })
    await AsyncStorage.getItem((diff - 2).toString() + Standingside, (err, result) => {
      if (result == null) { }
      else { day3_Standingside = Number(result); }
    })
    await AsyncStorage.getItem((diff - 3).toString() + Standingside, (err, result) => {
      if (result == null) { }
      else { day4_Standingside = Number(result); }
    })
    await AsyncStorage.getItem((diff - 4).toString() + Standingside, (err, result) => {
      if (result == null) { }
      else { day5_Standingside = Number(result); }
    })
    await AsyncStorage.getItem((diff - 5).toString() + Standingside, (err, result) => {
      if (result == null) { }
      else { day6_Standingside = Number(result); }
    })
    await AsyncStorage.getItem((diff - 6).toString() + Standingside, (err, result) => {
      if (result == null) { }
      else { day7_Standingside = Number(result); }
    })
    //나무자세
    await AsyncStorage.getItem(diff.toString() + Tree, (err, result) => {
      if (result == null) { }
      else { day1_Tree = Number(result); }
    })
    await AsyncStorage.getItem((diff - 1).toString() + Tree, (err, result) => {
      if (result == null) { }
      else { day2_Tree = Number(result); }
    })
    await AsyncStorage.getItem((diff - 2).toString() + Tree, (err, result) => {
      if (result == null) { }
      else { day3_Tree = Number(result); }
    })
    await AsyncStorage.getItem((diff - 3).toString() + Tree, (err, result) => {
      if (result == null) { }
      else { day4_Tree = Number(result); }
    })
    await AsyncStorage.getItem((diff - 4).toString() + Tree, (err, result) => {
      if (result == null) { }
      else { day5_Tree = Number(result); }
    })
    await AsyncStorage.getItem((diff - 5).toString() + Tree, (err, result) => {
      if (result == null) { }
      else { day6_Tree = Number(result); }
    })
    await AsyncStorage.getItem((diff - 6).toString() + Tree, (err, result) => {
      if (result == null) { }
      else { day7_Tree = Number(result); }
    })


    var day1 = '                  '
    if (day1_Tree != 0) { day1 += '나무자세 ' + (day1_Tree / 60).toFixed(1) + '분  ' }
    if (day1_Backback != 0) { day1 += '백익스텐션 ' + (day1_Backback / 60).toFixed(1) + '분  ' }
    if (day1_Squart != 0) { day1 += '스쿼트 ' + day1_Squart + '회  ' }
    if ((day1_Tree + day1_Backback + day1_Squart) == 0) { } else { day1 += '\n                  ' }
    if (day1_Standingside != 0) { day1 += '스탠딩사이드 ' + day1_Standingside + '회  ' }
    if (day1_SideBomb != 0) { day1 += '사이드밤 ' + day1_SideBomb + '회  ' }
    if (day1_BellyBomb != 0) { day1 += '밸리밤 ' + day1_BellyBomb + '회  ' }
    if ((day1_Standingside + day1_SideBomb + day1_BellyBomb) == 0) { } else { day1 += '\n                  ' }
    if (day1_ChestOpener != 0) { day1 += '체스트오프너 ' + day1_ChestOpener + '회  ' }
    if (day1_RussianTwist != 0) { day1 += '러시안트위스트 ' + day1_RussianTwist + '회  ' }
    if ((day1_ChestOpener + day1_RussianTwist) == 0) { } else { day1 += '\n                  ' }
    this.setState({ day1: day1 })

    var day2 = '                  '
    if (day2_Tree != 0) { day2 += '나무자세 ' + (day2_Tree / 60).toFixed(1) + '분  ' }
    if (day2_Backback != 0) { day2 += '백익스텐션 ' + (day2_Backback / 60).toFixed(1) + '분  ' }
    if (day2_Squart != 0) { day2 += '스쿼트 ' + day2_Squart + '회  ' }
    if ((day2_Tree + day2_Backback + day2_Squart) == 0) { } else { day2 += '\n                  ' }
    if (day2_Standingside != 0) { day2 += '스탠딩사이드 ' + day2_Standingside + '회  ' }
    if (day2_SideBomb != 0) { day2 += '사이드밤 ' + day2_SideBomb + '회  ' }
    if (day2_BellyBomb != 0) { day2 += '밸리밤 ' + day2_BellyBomb + '회  ' }
    if ((day2_Standingside + day2_SideBomb + day2_BellyBomb) == 0) { } else { day2 += '\n                  ' }
    if (day2_ChestOpener != 0) { day2 += '체스트오프너 ' + day2_ChestOpener + '회  ' }
    if (day2_RussianTwist != 0) { day2 += '러시안트위스트 ' + day2_RussianTwist + '회  ' }
    if ((day2_ChestOpener + day2_RussianTwist) == 0) { } else { day2 += '\n                  ' }
    this.setState({ day2: day2 })

    var day3 = '                  '
    if (day3_Tree != 0) { day3 += '나무자세 ' + (day3_Tree / 60).toFixed(1) + '분  ' }
    if (day3_Backback != 0) { day3 += '백익스텐션 ' + (day3_Backback / 60).toFixed(1) + '분  ' }
    if (day3_Squart != 0) { day3 += '스쿼트 ' + day3_Squart + '회  ' }
    if ((day3_Tree + day3_Backback + day3_Squart) == 0) { } else { day3 += '\n                  ' }
    if (day3_Standingside != 0) { day3 += '스탠딩사이드 ' + day3_Standingside + '회  ' }
    if (day3_SideBomb != 0) { day3 += '사이드밤 ' + day3_SideBomb + '회  ' }
    if (day3_BellyBomb != 0) { day3 += '밸리밤 ' + day3_BellyBomb + '회  ' }
    if ((day3_Standingside + day3_SideBomb + day3_BellyBomb) == 0) { } else { day3 += '\n                  ' }
    if (day3_ChestOpener != 0) { day3 += '체스트오프너 ' + day3_ChestOpener + '회  ' }
    if (day3_RussianTwist != 0) { day3 += '러시안트위스트 ' + day3_RussianTwist + '회  ' }
    if ((day3_ChestOpener + day3_RussianTwist) == 0) { } else { day3 += '\n                  ' }
    this.setState({ day3: day3 })

    var day4 = '                  '
    if (day4_Tree != 0) { day4 += '나무자세 ' + (day4_Tree / 60).toFixed(1) + '분  ' }
    if (day4_Backback != 0) { day4 += '백익스텐션 ' + (day4_Backback / 60).toFixed(1) + '분  ' }
    if (day4_Squart != 0) { day4 += '스쿼트 ' + day4_Squart + '회  ' }
    if ((day4_Tree + day4_Backback + day4_Squart) == 0) { } else { day4 += '\n                  ' }
    if (day4_Standingside != 0) { day4 += '스탠딩사이드 ' + day4_Standingside + '회  ' }
    if (day4_SideBomb != 0) { day4 += '사이드밤 ' + day4_SideBomb + '회  ' }
    if (day4_BellyBomb != 0) { day4 += '밸리밤 ' + day4_BellyBomb + '회  ' }
    if ((day4_Standingside + day4_SideBomb + day4_BellyBomb) == 0) { } else { day4 += '\n                  ' }
    if (day4_ChestOpener != 0) { day4 += '체스트오프너 ' + day4_ChestOpener + '회  ' }
    if (day4_RussianTwist != 0) { day4 += '러시안트위스트 ' + day4_RussianTwist + '회  ' }
    if ((day4_ChestOpener + day4_RussianTwist) == 0) { } else { day4 += '\n                  ' }
    this.setState({ day4: day4 })

    var day5 = '                  '
    if (day5_Tree != 0) { day5 += '나무자세 ' + (day5_Tree / 60).toFixed(1) + '분  ' }
    if (day5_Backback != 0) { day5 += '백익스텐션 ' + (day5_Backback / 60).toFixed(1) + '분  ' }
    if (day5_Squart != 0) { day5 += '스쿼트 ' + day5_Squart + '회  ' }
    if ((day5_Tree + day5_Backback + day5_Squart) == 0) { } else { day5 += '\n                  ' }
    if (day5_Standingside != 0) { day5 += '스탠딩사이드 ' + day5_Standingside + '회  ' }
    if (day5_SideBomb != 0) { day5 += '사이드밤 ' + day5_SideBomb + '회  ' }
    if (day5_BellyBomb != 0) { day5 += '밸리밤 ' + day5_BellyBomb + '회  ' }
    if ((day5_Standingside + day5_SideBomb + day5_BellyBomb) == 0) { } else { day5 += '\n                  ' }
    if (day5_ChestOpener != 0) { day5 += '체스트오프너 ' + day5_ChestOpener + '회  ' }
    if (day5_RussianTwist != 0) { day5 += '러시안트위스트 ' + day5_RussianTwist + '회  ' }
    if ((day5_ChestOpener + day5_RussianTwist) == 0) { } else { day5 += '\n                  ' }
    this.setState({ day5: day5 })

    var day6 = '                  '
    if (day6_Tree != 0) { day6 += '나무자세 ' + (day6_Tree / 60).toFixed(1) + '분  ' }
    if (day6_Backback != 0) { day6 += '백익스텐션 ' + (day6_Backback / 60).toFixed(1) + '분  ' }
    if (day6_Squart != 0) { day6 += '스쿼트 ' + day6_Squart + '회  ' }
    if ((day6_Tree + day6_Backback + day6_Squart) == 0) { } else { day6 += '\n                  ' }
    if (day6_Standingside != 0) { day6 += '스탠딩사이드 ' + day6_Standingside + '회  ' }
    if (day6_SideBomb != 0) { day6 += '사이드밤 ' + day6_SideBomb + '회  ' }
    if (day6_BellyBomb != 0) { day6 += '밸리밤 ' + day6_BellyBomb + '회  ' }
    if ((day6_Standingside + day6_SideBomb + day6_BellyBomb) == 0) { } else { day6 += '\n                  ' }
    if (day6_ChestOpener != 0) { day6 += '체스트오프너 ' + day6_ChestOpener + '회  ' }
    if (day6_RussianTwist != 0) { day6 += '러시안트위스트 ' + day6_RussianTwist + '회  ' }
    if ((day6_ChestOpener + day6_RussianTwist) == 0) { } else { day6 += '\n                  ' }
    this.setState({ day6: day6 })

    var day7 = '                  '
    if (day7_Tree != 0) { day7 += '나무자세 ' + (day7_Tree / 60).toFixed(1) + '분  ' }
    if (day7_Backback != 0) { day7 += '백익스텐션 ' + (day7_Backback / 60).toFixed(1) + '분  ' }
    if (day7_Squart != 0) { day7 += '스쿼트 ' + day7_Squart + '회  ' }
    if ((day7_Tree + day7_Backback + day7_Squart) == 0) { } else { day7 += '\n                  ' }
    if (day7_Standingside != 0) { day7 += '스탠딩사이드 ' + day7_Standingside + '회  ' }
    if (day7_SideBomb != 0) { day7 += '사이드밤 ' + day7_SideBomb + '회  ' }
    if (day7_BellyBomb != 0) { day7 += '밸리밤 ' + day7_BellyBomb + '회  ' }
    if ((day7_Standingside + day7_SideBomb + day7_BellyBomb) == 0) { } else { day7 += '\n                  ' }
    if (day7_ChestOpener != 0) { day7 += '체스트오프너 ' + day7_ChestOpener + '회  ' }
    if (day7_RussianTwist != 0) { day7 += '러시안트위스트 ' + day7_RussianTwist + '회  ' }
    if ((day7_ChestOpener + day7_RussianTwist) == 0) { } else { day7 += '\n                  ' }
    this.setState({ day7: day7 })

    if (Number(day1_Backback) + Number(day1_BellyBomb) + Number(day1_ChestOpener) + Number(day1_RussianTwist)
      + Number(day1_SideBomb) + Number(day1_Squart) + Number(day1_Standingside) + Number(day1_Tree) == 0) {
      day1 = '                  운동 기록 없음\n\n'
      this.setState({ day1: day1 })
    }
    if (Number(day2_Backback) + Number(day2_BellyBomb) + Number(day2_ChestOpener) + Number(day2_RussianTwist)
      + Number(day2_SideBomb) + Number(day2_Squart) + Number(day2_Standingside) + Number(day2_Tree) == 0) {
      day2 = '                  운동 기록 없음\n\n'
      this.setState({ day2: day2 })
    }
    if (Number(day3_Backback) + Number(day3_BellyBomb) + Number(day3_ChestOpener) + Number(day3_RussianTwist)
      + Number(day3_SideBomb) + Number(day3_Squart) + Number(day3_Standingside) + Number(day3_Tree) == 0) {
      day3 = '                  운동 기록 없음\n\n'
      this.setState({ day3: day3 })
    }
    if (Number(day4_Backback) + Number(day4_BellyBomb) + Number(day4_ChestOpener) + Number(day4_RussianTwist)
      + Number(day4_SideBomb) + Number(day4_Squart) + Number(day4_Standingside) + Number(day4_Tree) == 0) {
      day4 = '                  운동 기록 없음\n\n'
      this.setState({ day4: day4 })
    }
    if (Number(day5_Backback) + Number(day5_BellyBomb) + Number(day5_ChestOpener) + Number(day5_RussianTwist)
      + Number(day5_SideBomb) + Number(day5_Squart) + Number(day5_Standingside) + Number(day5_Tree) == 0) {
      day5 = '                  운동 기록 없음\n\n'
      this.setState({ day5: day5 })
    }
    if (Number(day6_Backback) + Number(day6_BellyBomb) + Number(day6_ChestOpener) + Number(day6_RussianTwist)
      + Number(day6_SideBomb) + Number(day6_Squart) + Number(day6_Standingside) + Number(day6_Tree) == 0) {
      day6 = '                  운동 기록 없음\n\n'
      this.setState({ day6: day6 })
    }
    if (Number(day7_Backback) + Number(day7_BellyBomb) + Number(day7_ChestOpener) + Number(day7_RussianTwist)
      + Number(day7_SideBomb) + Number(day7_Squart) + Number(day7_Standingside) + Number(day7_Tree) == 0) {
      day7 = '                  운동 기록 없음\n\n'
      this.setState({ day7: day7 })
    }

    await this.setState({ isLoading: false })
  }

  render() {

    this.headerStyle();




    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading
          ? <View style={[styles.loadingIndicator]}>
            <Text>잠시만 기다려주세요. 운동 기록 페이지 로딩 중입니다.</Text>
            <ActivityIndicator size='large' color='#43d5e9' />
          </View>
          : <ScrollView style={this.state.dark == 'false' ? styles.mainContainer : styles.mainContainer_dark}>

            <View style={{ justifyContent: 'center', paddingLeft: 13, flex: 0.1 }}>
            </View>

            <View style={this.state.day1 == '                  운동 기록 없음\n\n' 
            ? styles.TouchableStyle2 : styles.TouchableStyle1}>
              <Text style={{ fontSize: width * 0.06, marginTop: '5%' }}>  오늘</Text>
              <Text style={{ fontSize: 15 }}>{this.state.day1}</Text>
            </View>

            <View style={this.state.day2 == '                  운동 기록 없음\n\n' 
            ? styles.TouchableStyle2 : styles.TouchableStyle1}>
              <Text style={{ fontSize: width * 0.06, marginTop: '5%' }}>  1일전</Text>
              <Text style={{ fontSize: 15 }}>{this.state.day2}</Text>
            </View>

            <View style={this.state.day3 == '                  운동 기록 없음\n\n' 
            ? styles.TouchableStyle2 : styles.TouchableStyle1}>
              <Text style={{ fontSize: width * 0.06, marginTop: '5%' }}>  2일전</Text>
              <Text style={{ fontSize: 15 }}>{this.state.day3}</Text>
            </View>

            <View style={this.state.day4 == '                  운동 기록 없음\n\n' 
            ? styles.TouchableStyle2 : styles.TouchableStyle1}>
              <Text style={{ fontSize: width * 0.06, marginTop: '5%' }}>  3일전</Text>
              <Text style={{ fontSize: 15 }}>{this.state.day4}</Text>
            </View>

            <View style={this.state.day5 == '                  운동 기록 없음\n\n' 
            ? styles.TouchableStyle2 : styles.TouchableStyle1}>
              <Text style={{ fontSize: width * 0.06, marginTop: '5%' }}>  4일전</Text>
              <Text style={{ fontSize: 15 }}>{this.state.day5}</Text>
            </View>

            <View style={this.state.day6 == '                  운동 기록 없음\n\n' 
            ? styles.TouchableStyle2 : styles.TouchableStyle1}>
              <Text style={{ fontSize: width * 0.06, marginTop: '5%' }}>  5일전</Text>
              <Text style={{ fontSize: 15 }}>{this.state.day6}</Text>
            </View>

            <View style={this.state.day7 == '                  운동 기록 없음\n\n' 
            ? styles.TouchableStyle2 : styles.TouchableStyle1}>
              <Text style={{ fontSize: width * 0.06, marginTop: '5%' }}>  6일전</Text>
              <Text style={{ fontSize: 15 }}>{this.state.day7}</Text>
            </View>
          </ScrollView>
        }</View>
    );
  }

}
const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200
  },
  mainContainer: {
    height: '100%',
    backgroundColor: '#ddf7f7',
  },
  mainContainer_dark: {
    height: '100%',
    backgroundColor: '#434248',
  },
  subContainer: {
    backgroundColor: '#CEdAd2',
    justifyContent: 'center',
    marginBottom: 13,
    flex: 1
  },
  TouchableStyle1: {
    backgroundColor: '#43d564',
    marginBottom: 8,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 13,
  },
  TouchableStyle2: {
    //backgroundColor: '#ff5050',
    //backgroundColor: '#c8c8c8',
    backgroundColor: '#b9c8ce',
    marginBottom: 8,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 13,
  },
});
