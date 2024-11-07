import {
  unknownArtistImageUri,
  unknownTrackImageUri,
} from "@/constants/images";
import { fontSize } from "@/constants/tokens";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTracksListId } from "@/helpers/miscellaneous";
import { Artist } from "@/helpers/types";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { QueueControls } from "./QueueControls";
import TracksList from "./TracksList";
import SearchInput from "./SearchInput";

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
  const { search, handleOnChangeText } = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const filteredArtistTracks = useMemo(() => {
    return artist.tracks.filter(trackTitleFilter(search));
  }, [search, artist.tracks]);

  return (
    <TracksList
      id={generateTracksListId(artist.name, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.artistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <Image
              source={{ uri: unknownArtistImageUri }}
              style={styles.artistImage}
            />
          </View>
          <Text numberOfLines={1} style={styles.artistNameText}>
            {artist.name}
          </Text>

          {search.length === 0 && (
            <QueueControls
              tracks={filteredArtistTracks}
              style={{ paddingTop: 24 }}
            />
          )}
        </View>
      }
      tracks={filteredArtistTracks}
    />
  );
};

const styles = StyleSheet.create({
  artistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 200,
  },
  artistImage: {
    width: "60%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 128,
  },
  artistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontWeight: "800",
  },
});
