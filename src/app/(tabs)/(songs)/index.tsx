import TracksList from "@/components/TracksList";
import { colors, screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles";
import { ScrollView, View, StyleSheet, Platform, Text } from "react-native";
import SearchInput from "@/components/SearchInput";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import library from "@/assets/data/library.json";
import { useTracks } from "@/store/library";
import { generateTracksListId } from "@/helpers/miscellaneous";

const SongsScreen = () => {
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const tracks = useTracks();

  const filteredTracks = useMemo(() => {
    if (!search) return tracks;
    return library.filter(trackTitleFilter(search));
  }, [search, tracks]);

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
        showsVerticalScrollIndicator
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}>
        <TracksList
          id={generateTracksListId("songs", search)}
          tracks={filteredTracks}
        />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
