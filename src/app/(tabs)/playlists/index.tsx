import { PlaylistsList } from "@/components/PlaylistsList";
import SearchInput from "@/components/SearchInput";
import { screenPadding } from "@/constants/tokens";
import { playlistNameFilter } from "@/helpers/filter";
import { Playlist } from "@/helpers/types";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { usePlaylists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const PlaylistsScreen = () => {
  const router = useRouter();
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const { playlists } = usePlaylists();

  const filteredPlaylists = useMemo(() => {
    if (!search) return playlists;
    return playlists.filter(playlistNameFilter(search));
  }, [search, playlists]);

  const handlePlaylistPress = (playlist: Playlist) => {
    router.push(`/(tabs)/playlists/${playlist.name}`);
  };
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && (
        <SearchInput
          value={search}
          placeholder="Find in songs"
          onChangeText={handleOnChangeText}
        />
      )}

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}>
        <PlaylistsList
          scrollEnabled={false}
          playlists={filteredPlaylists}
          onPlaylistPress={handlePlaylistPress}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({});
export default PlaylistsScreen;
