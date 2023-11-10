import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
const {width}=Dimensions.get("window")
import TrackPlayer, {Event, Track, useTrackPlayerEvents} from 'react-native-track-player'
import { songsData } from '../../constants'
import Songinfo from '../Songinfo'
import Slider from '@react-native-community/slider'
import ControlCenter from '../ControlCenter'
import { FlatList } from 'react-native'
import Songslider from '../Songslider'

const MusicPlayer = () => {
    const [track, setTrack]=useState<Track | null>()

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      switch (event.type) {
        case Event.PlaybackTrackChanged:
            const playingTrack = await TrackPlayer.getTrack(event.nextTrack)
            setTrack(playingTrack)
            break;
    }
})

    const renderArtwork=()=>{
        return (
            <View style={styles.listArtWrapper} >
                <View style={styles.albumContainer}>
                    {track?.artwork && (
                        <Image style={styles.albumArtImg} source={{uri: track?.artwork?.toString()}} />
                    )}
                </View>
            </View>
        )
    }
  return (
    <View style={styles.container} >
      <FlatList
      horizontal
      data={songsData}
      renderItem={renderArtwork}
      keyExtractor={song => song.id.toString()}
      />
      <Songinfo track={track} />
      <Songslider />
      <ControlCenter />
    </View>
  )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
      },
      listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      },
      albumContainer: {
        width: 300,
        height: 300,
      },
      albumArtImg: {
        height: '100%',
        borderRadius: 4,
      },
})