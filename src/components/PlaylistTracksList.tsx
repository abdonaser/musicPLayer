import { fontSize } from "@/constants/tokens";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTracksListId } from "@/helpers/miscellaneous";
import { Playlist } from "@/helpers/types";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { QueueControls } from "./QueueControls";
import TracksList from "./TracksList";
import SearchInput from "./SearchInput";

export const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in playlist",
    },
  });

  const filteredPlaylistTracks = useMemo(() => {
    return playlist.tracks.filter(trackTitleFilter(search));
  }, [playlist.tracks, search]);

  return (
    <>
      {Platform.OS === "android" && (
        <SearchInput
          value={search}
          placeholder="Find in playlist"
          onChangeText={handleOnChangeText}
        />
      )}
      <TracksList
        id={generateTracksListId(playlist.name, search)}
        scrollEnabled={false}
        hideQueueControls={true}
        ListHeaderComponentStyle={styles.playlistHeaderContainer}
        ListHeaderComponent={
          <View>
            {search.length === 0 && (
              <>
                <View style={styles.artworkImageContainer}>
                  <Image
                    source={{
                      uri: playlist.artworkPreview,
                    }}
                    style={styles.artworkImage}
                    resizeMode="cover"
                  />
                </View>
              </>
            )}
            <Text numberOfLines={1} style={styles.playlistNameText}>
              {playlist.name}
            </Text>
            {search.length === 0 && (
              <QueueControls
                style={{ paddingTop: 5 }}
                tracks={playlist.tracks}
              />
            )}
          </View>
        }
        tracks={filteredPlaylistTracks}
      />
    </>
  );
};

const styles = StyleSheet.create({
  playlistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 150,
  },
  artworkImage: {
    width: "85%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  playlistNameText: {
    ...defaultStyles.text,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontWeight: "800",
  },
});
