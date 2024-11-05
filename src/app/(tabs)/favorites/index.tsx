import { defaultStyles } from "@/styles";
import { Platform, Text, View } from "react-native";
import library from "@/assets/data/library.json";
import { ScrollView } from "react-native-gesture-handler";
import { screenPadding } from "@/constants/tokens";
import TracksList from "@/components/TracksList";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import SearchInput from "@/components/SearchInput";
import { useFavorites, useTracks } from "@/store/library";
const FavoritesScreen = () => {
	
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });
  const favoritesTracks = useMemo(() => {
    return library.filter((track) => track.rating === 1);
  }, []);

  const filteredTracks = useMemo(() => {
    if (!search) return favoritesTracks;
    return favoritesTracks.filter(trackTitleFilter(search));
  }, [search]);
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
        <TracksList scrollEnabled={false} tracks={filteredTracks} />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
