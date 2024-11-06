import {
  FlatList,
  FlatListProps,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import React, { useEffect, useRef } from "react";
import library from "@/assets/data/library.json";
import TracksListItem from "./TracksListItem";
import { utilsStyles } from "@/styles";
import TrackPlayer, { Track } from "react-native-track-player";
import { unknownTrackImageUri } from "@/constants/images";
import { useQueue } from "@/store/queue";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  id: string;
  tracks: Track[];
};

const ItemDivider = () => {
  return (
    <View
      style={{
        ...utilsStyles.itemSeparator,
        marginVertical: 10,
        marginLeft: 60,
      }}
    />
  );
};

const TracksList = ({ id, tracks, ...flatlistProps }: TracksListProps) => {
  //' the id is referring to the active screen {Screen_Name}
  const queueOffset = useRef(0);
  const { activeQueueId, setActiveQueueId } = useQueue();

  const handelTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url
    );
    //' 1 -  if the selectedTrack doesn't exist in the screen tracks return null
    if (trackIndex === -1) return;

    const isChangingQueue = id !== activeQueueId; //' will return true if you change the screen

    //' 2 -  if the selectedTrack --Exist-- in the screen tracks return null
    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      //' Resets the player stopping the current track and clearing the queue.
      await TrackPlayer.reset();

      //? setUp the new Queue
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);
      //' after arrived in this step th queue is start with selectedTrack -then> afterTracks -then> beforeTracks

      //' after all of before we will repeat all queue
      await TrackPlayer.play;

      queueOffset.current = trackIndex;
      setActiveQueueId(id);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      await TrackPlayer.skip(nextTrackIndex);
      TrackPlayer.play();
    }
  };
  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
      data={tracks}
      renderItem={({ item: track }) => (
        <TracksListItem track={track} onTrackSelect={handelTrackSelect} />
      )}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>
          <Image
            source={{ uri: unknownTrackImageUri }}
            style={[utilsStyles.emptyContentImage, { opacity: 0.6 }]}
            resizeMode="cover"
          />
        </View>
      }
      ListFooterComponent={ItemDivider}
      {...flatlistProps}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TracksList;
