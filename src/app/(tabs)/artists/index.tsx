import { defaultStyles, utilsStyles } from "@/styles";
import {
  Text,
  View,
  FlatList,
  Platform,
  ScrollView,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useArtists } from "@/store/library";
import SearchInput from "@/components/SearchInput";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useMemo } from "react";
import { artistNameFilter } from "@/helpers/filter";
import { screenPadding } from "@/constants/tokens";
import { unknownArtistImageUri } from "@/constants/images";
import { Link } from "expo-router";

const ArtistsScreen = () => {
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const artists = useArtists();

  const filteredArtists = useMemo(() => {
    if (!search) return artists;
    return artists.filter(artistNameFilter(search));
  }, [search, artists]);

  const ItemSeparatorComponent = () => {
    return (
      <View
        style={[
          utilsStyles.itemSeparator,
          { marginLeft: 50, marginVertical: 12 },
        ]}
      />
    );
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
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic">
        <FlatList
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
          scrollEnabled={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ItemSeparatorComponent}
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
          data={filteredArtists}
          renderItem={({ item: artist }) => {
            return (
              <TouchableHighlight activeOpacity={0.8}>
                <Link href={`/artists/${artist.name}`}>
                  <View style={styles.artistItemContainer}>
                    <View>
                      <Image
                        source={{
                          uri: unknownArtistImageUri,
                        }}
                        style={styles.artistImage}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={{ width: "100%" }}>
                      <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                      </Text>
                    </View>
                  </View>
                </Link>
              </TouchableHighlight>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    width: 200,
  },
  artistImage: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  artistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    maxWidth: "80%",
  },
});

export default ArtistsScreen;
