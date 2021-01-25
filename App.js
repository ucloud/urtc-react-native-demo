/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  NativeEventEmitter,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import UCloudRtc from 'react-native-ucloud-rtc';
import UCloudView from './component/videoView/UCloudView';

const UCloudRtcEventEmitter = new NativeEventEmitter(UCloudRtc);
// 此处使用固定的房间号的随机的用户ID，请自行替换
const userId = '958878';
const appid = 'urtc-f0iajgij';
const roomId = 'ssss02';
const appKey = '62b31630d717aaf14a5c1931c7810bf0';
const token =
  'eyJ1c2VyX2lkIjoiOTU4ODc4IiwiYXBwX2lkIjoidXJ0Yy1mMGlhamdpaiIsInJvb21faWQiOiJzc3NzMDIifQ==.6e39035ba0fdc29f06cc0209b8a0824bd6fbe8091611565077600e8815';
const initWithUserID1 = () => {
  UCloudRtc.initWithAppid(appid, appKey, 1,false,false)
    .then(res => {
      console.log('收到回调', res);
    })
    .catch(err => {
      console.log('捕获异常', err);
    });
};
const joinRoom = () => {
  UCloudRtc.joinRoomWithRoomid(roomId, userId, token)
    .then(res => {
      console.log('收到回调', res);
      addListener();
    })
    .catch(err => {
      console.log('捕获异常', err);
    });
};
const subscribeRemoteStream = () => {
  UCloudRtc.subscribeRemoteStream();
};

const publishLocalStreamWithCameraEnable = () => {
  UCloudRtc.publishLocalStreamWithCameraEnable(false);
}
const leaveRoom = () => {
  UCloudRtc.leaveRoom();
};
const unPublishLocalStream = () => {
  UCloudRtc.unPublishLocalStream();
};
const startservice = () => {
  UCloudRtc.startForeGroundService();
};
const addListener = () => {
  UCloudRtcEventEmitter.addListener('event_memberDidJoinRoom', args => {
    console.log('事件event_memberDidJoinRoom', args);
  });
  UCloudRtcEventEmitter.addListener('event_memberDidLeaveRoom', args => {
    console.log('事件event_memberDidLeaveRoom', args);
  });
  UCloudRtcEventEmitter.addListener('event_remoteVolumeChange', args => {
    console.log('事件event_remoteVolumeChange', args);
  });
    
};
const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <TouchableOpacity
              title="init"
              onPress={initWithUserID1}
              style={styles.button}>
              <Text style={styles.buttonText}> 初始化1 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="joinRoom"
              onPress={joinRoom}
              style={styles.button}>
              <Text style={styles.buttonText}> 加入房间 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="subscribeRemoteStream"
              onPress={subscribeRemoteStream}
              style={styles.button}>
              <Text style={styles.buttonText}> 订阅 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="publishLocalStreamWithCameraEnable"
              onPress={publishLocalStreamWithCameraEnable}
              style={styles.button}>
              <Text style={styles.buttonText}> 推送本地流(音视频) </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="unPublishLocalStream"
              onPress={unPublishLocalStream}
              style={styles.button}>
              <Text style={styles.buttonText}> 取消推送本地流 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="leaveRoom"
              onPress={leaveRoom}
              style={styles.button}>
              <Text style={styles.buttonText}> 离开房间 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="startservice"
              onPress={startservice}
              style={styles.button}>
              <Text style={styles.buttonText}> 开启服务 </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          <UCloudView />
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
    width: 160,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
