import React from 'react';
import {ActivityIndicator, StyleSheet, View, Platform, Text, Dimensions } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack'
//카메라
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { ExpoWebGLRenderingContext } from 'expo-gl';
//딥러닝
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import Svg, { Circle, Rect, G, Line} from 'react-native-svg';
import * as tmPose from '@teachablemachine/pose';
import { LayerVariable } from '@tensorflow/tfjs';
import ProgressCircle from 'react-native-progress-circle'


interface ScreenProps {
  returnToMain: () => void;
  navigation:any
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

const AUTORENDER = true;

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

// tslint:disable-next-line: variable-name
const TensorCamera = cameraWithTensors(Camera);

// standingside_status & count
var standingside_status = "null";
var standingside_count = 0;


export default class standingside extends React.Component<ScreenProps,ScreenState> {
  rafID?: number;

  constructor(props: ScreenProps) {
    super(props);
    this.state = {
      isLoading: true,
      cameraType: Camera.Constants.Type.front,
    };
    this.standingside_init = this.standingside_init.bind(this); // tree_init 로 바꾸기 
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

  //스탠딩사이드 모델 load
  async standingside_loadtmModel() {
    const modelJson = 'http://192.168.200.196:8000/standingside_model'; //model.json 에서 wieghts 부분 수정하기
    const metaJson = 'http://192.168.200.196:8000/standingside_metadata'; 
    var model = await tmPose.load(modelJson, metaJson);
    return model;
  }


  //standingside main 함수
  async standingside_init(
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void, gl: ExpoWebGLRenderingContext) {

    const loop = async () => {

      if (standingside_count == 8) {
        console.log("종료합니다.");
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
      if (prediction[0].probability >= 0.60){
        standingside_status = "stand"
      }
      else if (prediction[1].probability >= 0.99 ){
        if (standingside_status == "stand" || standingside_status == "low_knee" || standingside_status == "low_arm") {
          standingside_count++; console.log("성공"); console.log(standingside_count); }
        standingside_status = "correct"
      }
      else if (prediction[2].probability >= 0.50 ){
        if (standingside_status == "stand" || standingside_status == "low_arm" || standingside_status == "correct") {
          console.log("무릎을 더 올리세요!");}
        standingside_status = "low_knee"
      }
      else if (prediction[3].probability == 1.00 ){
        if (standingside_status == "low_knee" || standingside_status == "correct") {
          console.log("손을 머리에 올려주세요!");}
        standingside_status = "low_arm"
      }
    
      this.setState({pose});
      tf.dispose([imageTensor]);
      // console.log(prediction[0].probability);
      
      if(!AUTORENDER) {
        gl.endFrameEXP();
      }
      this.rafID = requestAnimationFrame(loop);

    };

    console.log('스탠딩사이드크런치에 대한 설명 & 팔을 뒷머리에 올려주세요 & 시작합니다! -> 음성 API 로 준비');
    standingside_count = 0;
    loop();
    
  }
  


  componentWillUnmount() {
    if(this.rafID) {
      cancelAnimationFrame(this.rafID);
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
   
    const [tm] = await Promise.all([this.standingside_loadtmModel()]); // tree_loadtmModel 로 바꾸기 

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
        onReady={this.standingside_init} 
        autorender={AUTORENDER}
      />

    
    const counterView = 
      <View style={{marginTop:20, marginLeft:20,zIndex:100, backgroundColor:'null'}}>
        <ProgressCircle
            percent={(standingside_count/8)*100}
            radius={70}
            borderWidth={20}
            color="#3399FF"
            shadowColor="#d1d1d1"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 40 }}>{standingside_count}<Text style={{ fontSize: 15 }}>회</Text></Text>
        </ProgressCircle>
      </View>

    return (
      <View style={{flex:1}}>
        {isLoading 
        ? <View style={[styles.loadingIndicator]}>
            <ActivityIndicator size='large' color='#FF0266' /></View> 
        : [camView, counterView]}
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

