import { ArtistTracksList } from "@/components/ArtistTracksList";
import { screenPadding } from "@/constants/tokens";
import { useArtists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useRoute } from "@react-navigation/native";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

const ArtistDetailScreen = () => {
  const { name: artistName } = useLocalSearchParams<{ name: string }>();
  const artists = useArtists();
  const artist = artists.find((artist) => artist.name === artistName);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation && route) {
      navigation.setOptions({
        title: artist ? artist.name : "Artist Details",
      });
    }
  }, [navigation, route, artist]);

  if (!artist) {
    console.warn(`Artist ${artistName} Not Found`);
    return <Redirect href={"/(tabs)/artists"} />;
  }
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}>
        <ArtistTracksList artist={artist} />
      </ScrollView>
    </View>
  );
};
export default ArtistDetailScreen;
