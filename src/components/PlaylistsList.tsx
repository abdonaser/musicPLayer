import { Playlist } from "@/helpers/types";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import {
  FlatList,
  FlatListProps,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchInput from "./SearchInput";
import { defaultStyles, utilsStyles } from "@/styles";
import { useMemo } from "react";
import { playlistNameFilter } from "@/helpers/filter";
import { unknownArtistImageUri } from "@/constants/images";
import { PlaylistListItem } from "./PlaylistListItem";
import { beginAsyncEvent } from "react-native/Libraries/Performance/Systrace";
type playlistsListProps = {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
} & Partial<FlatListProps<Playlist>>;
const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }}
  />
);
export const PlaylistsList = ({
  playlists,
  onPlaylistPress: handlePlaylistPress,
  ...flatListProps
}: playlistsListProps) => {
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const filteredPlaylist = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  return (
    <View style={defaultStyles.container}>
      <FlatList
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
        ItemSeparatorComponent={ItemDivider}
        ListFooterComponent={ItemDivider}
        ListEmptyComponent={
          <View>
            <Text style={utilsStyles.emptyContentText}>No artist found</Text>
            <Image
              source={{
                uri: unknownArtistImageUri,
              }}
              style={utilsStyles.emptyContentImage}
              resizeMode="cover"
            />
          </View>
        }
        data={filteredPlaylist}
        renderItem={({ item: playlist }) => (
          <PlaylistListItem
            playlist={playlist}
            onPress={() => handlePlaylistPress(playlist)}
          />
        )}
        {...flatListProps}
      />
    </View>
  );
};
