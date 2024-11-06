import { defaultStyles } from "@/styles";
import { Platform, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { screenPadding } from "@/constants/tokens";
import TracksList from "@/components/TracksList";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import SearchInput from "@/components/SearchInput";
import { useFavorites, useTracks } from "@/store/library";
import { generateTracksListId } from "@/helpers/miscellaneous";

const FavoritesScreen = () => {
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const favoritesTracks = useFavorites().favorites;

  const filteredFavoritesTracks = useMemo(() => {
    if (!search) return favoritesTracks;
    return favoritesTracks.filter(trackTitleFilter(search));
  }, [search, favoritesTracks]);

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
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic">
        <TracksList
          id={generateTracksListId("favorites", search)}
          scrollEnabled={false}
          tracks={filteredFavoritesTracks}
        />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
