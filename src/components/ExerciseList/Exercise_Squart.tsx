import React from 'react';
import {ActivityIndicator, StyleSheet, View, Platform, Text,Dimensions } from 'react-native';
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
import ProgressCircle from 'react-native-progress-circle'



interface ScreenProps {
  navigation: any;
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

// squart_status & count
var squart_status = "null";
var squart_count = 0;


export default class squart extends React.Component<ScreenProps,ScreenState> {
  rafID?: number;

  constructor(props: ScreenProps) {
    super(props);
    this.state = {
      isLoading: true,
      cameraType: Camera.Constants.Type.front,
    };
    this.squart_init = this.squart_init.bind(this); // tree_init 로 바꾸기 
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

  //스쿼트 모델 load
  async squart_loadtmModel() {
    const modelJson = 'http://192.168.200.196:8000/squart_model'; //model.json 에서 wieghts 부분 수정한 후에 
    const metaJson = 'http://192.168.200.196:8000/squart_metadata'; 
    var model = await tmPose.load(modelJson, metaJson);
    return model;
  }



  //squart main 함수
  async squart_init(
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void, gl: ExpoWebGLRenderingContext) {

    const loop = async () => {
      
      if (squart_count == 5) {
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
      if (prediction[1].probability >= 0.90){
        squart_status = "stand"
      }
      else if (prediction[2].probability >= 0.95 ){
        if (squart_status == "stand" || squart_status == "bent" ) {squart_count++; console.log("성공"); console.log(squart_count); }
        squart_status = "squart"
      }
      else if (prediction[0].probability >= 0.99 ){
        if (squart_status == "stand") {console.log("무릎을 더 내리세요!");}
        squart_status = "bent"
      }

      this.setState({pose});
      tf.dispose([imageTensor]);
      // console.log(prediction[0].probability);
      
      if(!AUTORENDER) {
        gl.endFrameEXP();
      }
      this.rafID = requestAnimationFrame(loop);

    };

    console.log('스쿼트에 대한 설명 -> 음성 API 로 준비');
    console.log('왼쪽으로 90도 돌아주세요 -> 음성 API 로 준비');
    squart_count = 0;
    loop();
  }

  


  componentWillUnmount() {
    if(this.rafID) {
      cancelAnimationFrame(this.rafID);
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const [tm] = await Promise.all([this.squart_loadtmModel()]); // tree_loadtmModel 로 바꾸기 


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
          viewBox={`0 0 ${textureDims.width} ${textureDims.height}`}>
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
        // tree_init 로 바꾸기
        onReady={this.squart_init} 
        autorender={AUTORENDER}
        ratio={"16:9"}
        />

        
    const counterView =    
    <View style={{marginTop:20, marginLeft:20,zIndex:100, backgroundColor:'null'}}>  
        <ProgressCircle
          percent={(squart_count/5)*100}
          radius={70}
          borderWidth={20}
          color="#3399FF"
          shadowColor="#d1d1d1"
          bgColor="#fff"
        >
            <Text style={{ fontSize: 40 }}>{squart_count}<Text style={{ fontSize: 15 }}>회</Text></Text>
        </ProgressCircle>
    </View>

    const poseView =
      <View style={styles.modelResults}>
         {this.renderPose()}
      </View>
    

    return (
      <View style={{flex:1}}>
        {isLoading 
        ? <View style={[styles.loadingIndicator]}><ActivityIndicator size='large' color='#FF0266' /></View> 
        : [camView, poseView, counterView]}
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
