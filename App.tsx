import * as React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton, HeaderBackground, HeaderTitle } from '@react-navigation/stack';

//main
import HomeScreen from './src/screens/Home';
import ExerciseScreen from './src/screens/Exercise/ExerciseScreen';
import ExplainScreen from './src/screens/ExplainScreen';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import MyPageScreen from './src/screens/MyPageScreen';

//Exercise
import Exercise_list from './src/screens/Exercise/ExerciseScreen_list';
import Exercise_guide from './src/screens/Exercise/ExerciseScreen_guide';

import squart from './src/components/ExerciseList/Exercise_Squart';
import tree from './src/components/ExerciseList/Exercise_Tree';
import standingside from './src/components/ExerciseList/Exercise_Standingside';
import backback from './src/components/ExerciseList/Exercise_Backback';
import BellyBomb from './src/components/ExerciseList/Exercise_BellyBomb';
import SideBomb from './src/components/ExerciseList/Exercise_SideBomb';
import RussianTwist from './src/components/ExerciseList/Exercise_RussianTwist';
import ChestOpener from './src/components/ExerciseList/Exercise_ChestOpener';
//Explain
import Explain_Backback from './src/components/ExplainList/Explain_Backback'
import Explain_Squart from './src/components/ExplainList/Explain_Squart'
import Explain_StandingSide from './src/components/ExplainList/Explain_StandingSide'
import Explain_Tree from './src/components/ExplainList/Explain_Tree'
import Explain_BellyBomb from './src/components/ExplainList/Explain_BellyBomb'
import Explain_SideBomb from './src/components/ExplainList/Explain_SideBomb'
import Explain_ChestOpener from './src/components/ExplainList/Explain_ChestOpener'
import Explain_RussianTwist from './src/components/ExplainList/Explain_RussianTwist'
//Settings
import Service_info from './src/screens/Settings/Service_info';
import Privacy_info from './src/screens/Settings/Privacy_info';

interface Props {
  navigation: any
}

const Stack = createStackNavigator();

class App extends React.Component {

  
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          headerStyle:{
            backgroundColor: '#6B98F2',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#E5E5E5',
          headerTitleStyle:{
            //fontWeight: 'bold',
            color:'white',
            fontSize:25
          },
          
          headerBackAccessibilityLabel:'뒤로가기' //접근성 
        }}
        >       
        {/*----------------Main navigation----------------*/} 
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: "INSIGHT",
              //headerShown: false
            }}  
          />
          <Stack.Screen 
            name="Exercise" 
            component={ExerciseScreen}
            options={{
              title:"운동 시작",
            }}  
            initialParams={{  //초기 param값 설정
              userIdx: '초기 기본값',
              userName: '이름',
              userLastName: '성',
            }}
          />      
          <Stack.Screen 
            name="Explain" 
            component={ExplainScreen}
            options={{
              title: "운동 동작 설명",
            }}  
          />       
          <Stack.Screen 
            name="MyPage" 
            component={MyPageScreen}
            options={{
              title: "마이 페이지",
            }}  
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              title: "설정",
            }}  
          />


        {/*----------------Exercise navigation----------------*/}
        <Stack.Screen 
            name="exercise_guide" 
            component={Exercise_guide}
            options={{
              title: "카메라 조정",
            }}  
          />
        <Stack.Screen 
            name="exercise_list" 
            component={Exercise_list}
            options={{
              title: "운동 목록",
            }}  
          />
          <Stack.Screen 
            name="squart" 
            component={squart}
            options={{
              title: "스쿼트",
            }}  
          />
          <Stack.Screen 
            name="tree" 
            component={tree}
            options={{
              title: "나무 자세",
            }}  
          />
          <Stack.Screen 
            name="standingside" 
            component={standingside}
            options={{
              title: "스탠딩 사이드",
            }}  
          />
          <Stack.Screen 
            name="backback"
            component={backback}
            options={{
              title: "백 익스텐션",
            }}  
          />
          <Stack.Screen 
            name="BellyBomb" 
            component={BellyBomb}
            options={{
              title: "벨리 밤",
            }}  
          />
          <Stack.Screen 
            name="SideBomb" 
            component={SideBomb}
            options={{
              title: "사이드 밤",
            }}  
          />
          <Stack.Screen 
            name="RussianTwist" 
            component={RussianTwist}
            options={{
              title: "러시안 트위스트",
            }}  
          />
          <Stack.Screen 
            name="ChestOpener" 
            component={ChestOpener}
            options={{
              title: "체스트 오프너",
            }}  
          />                       
                 
        {/*----------------Explain navigation----------------*/}
        <Stack.Screen 
            name="Explain_Backback" 
            component={Explain_Backback}
            options={{
              title: "백 익스텐션",
            }}  
          />
          <Stack.Screen 
            name="Explain_Squart" 
            component={Explain_Squart}
            options={{
              title: "스쿼트",
            }}  
          />
          <Stack.Screen 
            name="Explain_Tree" 
            component={Explain_Tree}
            options={{
              title: "나무 자세",
            }}  
          />
          <Stack.Screen 
            name="Explain_StandingSide" 
            component={Explain_StandingSide}
            options={{
              title: "스탠딩 사이드",
            }}  
          />
          <Stack.Screen 
            name="Explain_ChestOpener"
            component={Explain_ChestOpener}
            options={{
              title: "체스트 오프너",
            }}  
          />
        <Stack.Screen 
            name="Explain_RussianTwist" 
            component={Explain_RussianTwist}
            options={{
              title: "러시안 트위스트",
            }}  
          />
          <Stack.Screen 
            name="Explain_BellyBomb" 
            component={Explain_BellyBomb}
            options={{
              title: "벨리 밤",
            }}  
          />
          <Stack.Screen 
            name="Explain_SideBomb" 
            component={Explain_SideBomb}
            options={{
              title: "사이드 밤",
            }}  
          />
         
        {/*----------------Settings navigation----------------*/}
        <Stack.Screen 
            name="Service_info" 
            component={Service_info}
            options={{
              title: "서비스 안내",
            }}  
          />
        <Stack.Screen 
            name="Privacy_info" 
            component={Privacy_info}
            options={{
              title: "개인정보 처리 방침",
            }}  
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

});

export default App;