import React from 'react';
import { Dimensions, NativeModules, StyleSheet, View, Platform, ScrollView } from 'react-native';
import THEOplayerView from './THEOplayerView'

export default class TheoPlayerViewScreen extends React.Component {
    render() {
        /*
          Problem on android fullscreen change with theoplayer scaling when ScrollView component is set
        */
        let BaseComponent = View;

        /*
          If there are scaling issues during the change of the fullscreen remove 'aspectRatio' & set player height
        */
        let playerStyle = {
            ...styles.player,
        };

        let testSource = {
                            sources: [{
                                  type: 'application/x-mpegurl',
                                  src: 'https://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',
                              }],
                            poster: 'https://cdn.theoplayer.com/video/big_buck_bunny/poster.jpg',
                        }

        if (Platform.OS === 'android') {
            playerStyle.width = Math.floor(Dimensions.get('window').width);
            testSource = {
                sources: [{
                  type: 'application/dash+xml',
                  src: 'https://d1n93qtmcsa1om.cloudfront.net/2decc9b3-c784-4812-940f-285116291bbe/dash/2f793392-5ada-4abd-ab00-ab5217054dae.mpd',
                  drm: {
                      widevine: {
                          licenseAcquisitionURL: "https://widevine-dash.ezdrm.com/widevine-php/widevine-foreignkey.php?pX=A3D13A"
                      },
                  }
                }],
                poster: 'https://cdn.theoplayer.com/video/big_buck_bunny/poster.jpg',
            }

              
        } else {
            BaseComponent = ScrollView;
            testSource = {
                  sources: [{
                    src: "https://fps.ezdrm.com/demo/video/ezdrm.m3u8",
                    type: "application/x-mpegurl",
                    drm: {
                        integration: 'ezdrm',
                        fairplay: {
                          licenseAcquisitionURL: "https://fps.ezdrm.com/api/licenses/09cc0377-6dd4-40cb-b09d-b582236e70fe",
                            certificateURL: "https://fps.ezdrm.com/demo/video/eleisure.cer"
                        }
                    }

                }],
            }
           
        }

        return (
          <BaseComponent>
              <View style={styles.container}>
                  <THEOplayerView
                      style={playerStyle}
                      autoplay={true}
                      fullscreenOrientationCoupling={true}
                      source={testSource}
                  />
              </View>
          </BaseComponent>
        );
    }

    componentWillUnmount() {
        NativeModules.THEOplayerViewManager.destroy();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    player: {
        backgroundColor: "black",
        aspectRatio: 1.7,
    },
});
