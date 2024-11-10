import { PlaylistTracksList } from "@/components/PlaylistTracksList";
import SearchInput from "@/components/SearchInput";
import { screenPadding } from "@/constants/tokens";
import { trackTitleFilter } from "@/helpers/filter";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { usePlaylists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useRoute } from "@react-navigation/native";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";
import { Platform, ScrollView, View } from "react-native";

const PlaylistScreen = () => {
  const { name: playlistName } = useLocalSearchParams<{ name: string }>();

  const { playlists } = usePlaylists();

  const playlist = playlists.find((playlist) => playlist.name === playlistName);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation && route) {
      navigation.setOptions({
        title: playlists ? playlist?.name : "playlists Details",
      });
    }
  }, [navigation, route, playlists]);

  if (!playlist) {
    console.warn(`Playlist ${playlistName} was not found!`);
    return <Redirect href={"/(tabs)/playlists"} />;
  }
  // const { search, handleOnChangeText } = useNavigationSearch({
  //   searchBarOptions: {
  //     placeholder: "Find in playlist",
  //   },
  // });

  // const filteredPlaylistTracks = useMemo(() => {
  //   if (!search) return playlist;
  //   return playlist.tracks.filter(trackTitleFilter(search));
  // }, [playlist.tracks, search]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
        >
        <PlaylistTracksList playlist={playlist} />
      </ScrollView>
    </View>
  );
};
export default PlaylistScreen;
