import React from 'react';
import {ActivityIndicator, Animated, StyleSheet, View, Platform, Text, Dimensions } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack'
//카메라
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { ExpoWebGLRenderingContext } from 'expo-gl';
//딥러닝
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import Svg, { Circle, Line} from 'react-native-svg';
import * as tmPose from '@teachablemachine/pose';
import { LayerVariable } from '@tensorflow/tfjs';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
 
interface ScreenProps {
  navigation: any
}

interface ScreenState {
  hasCameraPermission?: boolean;
  // tslint:disable-next-line: no-any
  cameraType: any;
  isLoading: boolean;
  pose?: posenet.Pose;
  tm?: tmPose.CustomPoseNet;
}

const inputTensorWidth = 152;
const inputTensorHeight = 200;

let textureDims: { width: number; height: number; };
if (Platform.OS === 'ios') {
    textureDims = {
      height: 1920,
      width: 1080,
    };
  } else {
    textureDims = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }

const Timer = () => (
  <CountdownCircleTimer
    isPlaying
    duration={20}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
  >
    {({ remainingTime }) => (
      <Animated.Text style={{ color: 'black' }}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
)


const AUTORENDER = true;

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

// tslint:disable-next-line: variable-name
const TensorCamera = cameraWithTensors(Camera);

// tree_miss_count
var tree_status = "null";
var tree_miss_count = 0;
var seconds_30 = 0;


export default class tree extends React.Component<ScreenProps,ScreenState> {
  rafID?: number;

  constructor(props: ScreenProps) {
    super(props);
    this.state = {
      isLoading: true,
      cameraType: Camera.Constants.Type.front,
    };
    this.tree_init = this.tree_init.bind(this); // tree_init 로 바꾸기 
  }

  headerStyle = () => {
    this.props.navigation.setOptions({
        headerLeft: () => (
          <HeaderBackButton 
          onPress={() =>this.props.navigation.navigate("exercise_list")}
          tintColor='#ffffff'
        />
        )
    })
  }

  // 나무자세 모델 load
  async tree_loadtmModel() {
    const modelJson = 'http://192.168.200.196:8000/tree_model'; //model.json 에서 wieghts 부분 수정하기
    const metaJson = 'http://192.168.200.196:8000/tree_metadata'; 
    var model = await tmPose.load(modelJson, metaJson);
    return model;
  }


  
  //tree main 함수
  async tree_init(
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void, gl: ExpoWebGLRenderingContext) {

    const loop = async () => {

      if(seconds_30 == 0){
        if(new Date().getTime() >= tree_miss_count + 20000){
          console.log(" 20초동안의 나무자세가 끝났습니다."); 
          console.log('반대쪽 다리를 들어주세요 & 시작합니다! -> 음성 API 로 준비');
          seconds_30 =1;
        }
      }
      else if(new Date().getTime() >= tree_miss_count + 40000){
        console.log(" 40초동안의 나무자세가 끝났습니다."); 
        console.log('종료합니다.');
        return(this.props.navigation.navigate('exercise_list'))
      }

      if(!AUTORENDER) {
        updatePreview();
      }
      //posenet
      const imageTensor = images.next().value;
      const flipHorizontal = Platform.OS === 'ios' ? false : true;
      const { pose, posenetOutput } = await this.state.tm.estimatePose(imageTensor, flipHorizontal);
      
      //teachable 동작분류
      const prediction = await this.state.tm.predict(posenetOutput);

      //피드백 알고리즘
      if(prediction[0].probability >= 0.90){
        tree_status = "stand"
      }
      else if(prediction[1].probability >= 0.80){
        if(tree_status == "wrong_arm" || tree_status == "wrong_leg" || tree_status == "stand"){
        tree_status = "correct"
        console.log("잘하고 있어요~")
        }
      }
      else if(prediction[2].probability >= 0.90){
        if(tree_status == "correct" || tree_status == "wrong_leg" || tree_status == "stand"){
        console.log("팔모아 가슴에 올려주세요");
        tree_status = "wrong_arm"
      }
      }
      else if(prediction[3].probability >= 0.60){
        if(tree_status == "correct" || tree_status == "wrong_arm" || tree_status == "stand"){
        console.log("다리를 더 올려주세요");
        tree_status = "wrong_leg"
      }
      }


      this.setState({pose});
      tf.dispose([imageTensor]);
      // console.log(prediction[0].probability);
      
      if(!AUTORENDER) {
        gl.endFrameEXP();
      }
      this.rafID = requestAnimationFrame(loop);

    };

    console.log('나무자세에 대한 설명 & 한쪽 다리를 들어주세요 & 시작합니다! -> 음성 API 로 준비');
    seconds_30 = 0;
    tree_miss_count = new Date().getTime();
    loop();
    
  }





  componentWillUnmount() {
    if(this.rafID) {
      cancelAnimationFrame(this.rafID);
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
   
    const [tm] = await Promise.all([this.tree_loadtmModel()]); // tree_loadtmModel 로 바꾸기 

    this.setState({
      hasCameraPermission: status === 'granted',
      isLoading: false,
      tm: tm,
    });
  }


  renderPose() {
    const MIN_KEYPOINT_SCORE = 0.1;
    const {pose} = this.state;
    if (pose != null) {
      const keypoints = pose.keypoints
        .filter(k => k.score > MIN_KEYPOINT_SCORE)
        .map((k,i) => {
          return <Circle
            key={`skeletonkp_${i}`}
            cx={k.position.x}
            cy={k.position.y}
            r='2'
            strokeWidth='0'
            fill='blue'
          />;
        });

      const adjacentKeypoints =
        posenet.getAdjacentKeyPoints(pose.keypoints, MIN_KEYPOINT_SCORE);

      const skeleton = adjacentKeypoints.map(([from, to], i) => {
        return <Line
          key={`skeletonls_${i}`}
          x1={from.position.x}
          y1={from.position.y}
          x2={to.position.x}
          y2={to.position.y}
          stroke='green'
          strokeWidth='3'
        />;
      });

      return (
        <Svg height='100%' width='100%'
          viewBox={`0 0 ${inputTensorWidth} ${inputTensorHeight}`}>
            {skeleton}
            {keypoints}
        </Svg>
        
        );
    } else {
      return null;
    }
  }

  
  render() {
    this.headerStyle();

    const {isLoading} = this.state;

    
      const camView = 
        <TensorCamera
          // Standard Camera props
          style={styles.camera}
          type={this.state.cameraType}
          zoom={0}
          // tensor related props
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={inputTensorHeight}
          resizeWidth={inputTensorWidth}
          resizeDepth={3}
          ratio={"16:9"}
          // tree_init 로 바꾸기
          onReady={this.tree_init} 
          autorender={AUTORENDER}
        />


    const timerView =
    <View style={{marginTop:20, marginLeft:20,zIndex:100, backgroundColor:'null'}}>
      <CountdownCircleTimer
        isPlaying
        duration={40}
        size={140}
        strokeWidth={20}
        //strokeLinecap={'square'}
        colors={[
          ['#3399FF', 0.4],
          ['#dafc2d', 0.4],
          ['#ff4e33', 0.2],
        ]}
        trailColor={'#d1d1d1'}
      >
        {({ remainingTime }) => (
          <Animated.Text style={{ color: 'black', fontSize:40 }}>
            {remainingTime}
            <Text style={{ fontSize: 15 }}>초</Text>
          </Animated.Text>
        )}
      </CountdownCircleTimer>
    </View>
    
    return (
      <View style={{height:'100%'}}>
        {isLoading 
        ? <View style={[styles.loadingIndicator]}>
            <ActivityIndicator size='large' color='#FF0266' /></View> 
        : [camView, timerView]}

      </View>
    );
  }

}

const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    top: 300,
    left:'50%',
    right:'50%',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 200,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  cameraContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  camera : {
    position:'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  modelResults: {
    position:'absolute',
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  }
});
