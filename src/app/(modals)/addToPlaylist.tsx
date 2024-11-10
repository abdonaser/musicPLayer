import SearchInput from "@/components/SearchInput";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { usePlaylists, useTracks } from "@/store/library";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/tokens";
import { useQueue } from "@/store/queue";
import { Playlist } from "@/helpers/types";
import { PlaylistsList } from "@/components/PlaylistsList";
const AddToPlaylistModal = () => {
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  // const filteredFavoritesTracks = useMemo(() => {
  //   if (!search) return favoritesTracks;
  //   return favoritesTracks.filter(trackTitleFilter(search));
  // }, [search, favoritesTracks]);

  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const { trackUrl } = useLocalSearchParams<{ trackUrl: Track["url"] }>();
  const tracks = useTracks();
  const { playlists, addToPlaylist } = usePlaylists();
  const { activeQueueId } = useQueue();

  const track = tracks.find((currentTrack) => trackUrl === currentTrack.url);
  // track was not found
  if (!track) {
    return null;
  }
  const availablePlaylists = playlists.filter(
    (playlist) =>
      !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url)
  );

  const handlePlaylistPress = async (playlist: Playlist) => {
    addToPlaylist(track, playlist.name);
    // should close the modal
    router.dismiss();
    // if the current queue is the playlist we're adding to, add the track at the end of the queue
    if (activeQueueId?.startsWith(playlist.name)) {
      await TrackPlayer.add(track);
    }
  };
  return (
    <SafeAreaView style={[styles.modalContainer]}>
      {Platform.OS === "android" && (
        <SearchInput
          value={search}
          placeholder="Find in songs"
          onChangeText={handleOnChangeText}
        />
      )}
      <PlaylistsList
        scrollEnabled={false}
        playlists={availablePlaylists}
        onPlaylistPress={handlePlaylistPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
  },
});
export default AddToPlaylistModal;
