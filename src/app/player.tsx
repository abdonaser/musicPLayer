import {
  unknownArtistImageUri,
  unknownTrackImageUri,
} from "@/constants/images";
import { colors, fontSize, screenPadding } from "@/constants/tokens";
import { defaultStyles, utilsStyles } from "@/styles";
import { StyleSheet, View, ActivityIndicator, Image, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import { FontAwesome } from "@expo/vector-icons";
import { MovingText } from "@/components/MovingText";
import { PlayerControls } from "@/components/PlayerControls";
import { PlayerProgressBar } from "@/components/PlayerProgressbar";
import { PlayerVolumeBar } from "@/components/PlayerVolumeBar";
import { PlayerRepeatToggle } from "@/components/PlayerRepeatToggle";
import { useFavorites } from "@/store/library";
import { useTrackPlayerFavorite } from "@/hooks/useTrackPlayerFavorite";
// import { usePlayerBackground } from "@/hooks/usePlayerBackground";
// import { LinearGradient } from "expo-linear-gradient";

const PlayerScreen = () => {
  /*
    the return of activeTrack
    {
        "artist": "Vans in Japan",
        "artwork": "https://i.ytimg.com/vi/Kk0xLSNMPeQ/maxresdefault.jpg",
        "title": "Desert Brawl",
        "url": "https://audio.jukehost.co.uk/ZufGK11EtwQWXge8xYo5EQ02RuJqtr4s"
    }

  */
  const activeTrack = useActiveTrack();
  // const { imageColors } = usePlayerBackground(
  //   activeTrack?.artwork ?? unknownArtistImageUri
  // );

  const { top, bottom } = useSafeAreaInsets();
  // const { toggleTrackFavorite } = useFavorites();
  // const isFavorite = activeTrack?.rating;
  const { isFavorite, toggleFavorite } = useTrackPlayerFavorite();

  if (!activeTrack) {
    return (
      <View style={[defaultStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }

  return (
    // <LinearGradient
    //   style={{ flex: 1 }}
    //   colors={
    //     imageColors
    //       ? [imageColors.dominant, imageColors.average]
    //       : [colors.background]
    //   }>

    <View style={styles.overlayContainer}>
      <DismissPlayerSymbol />

      <View
        style={{
          flex: 1,
          marginTop: top + 70,
          marginBottom: bottom,
        }}>
        <View style={styles.artworkImageContainer}>
          <Image
            source={{ uri: activeTrack.artwork ?? unknownTrackImageUri }}
            resizeMode="cover"
            style={styles.artworkImage}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ marginTop: "auto" }}>
            <View style={{ height: 60 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                {/* Track title */}
                <View style={styles.trackTitleContainer}>
                  {/* <Text style={styles.trackTitleText}>{activeTrack.title}</Text> */}
                  <MovingText
                    text={activeTrack.title ?? ""}
                    animationThreshold={30}
                    style={styles.trackTitleText}
                  />
                </View>

                {/* Favorite button icon */}
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={20}
                  color={isFavorite ? colors.primary : colors.icon}
                  style={{ marginHorizontal: 14 }}
                  onPress={toggleFavorite}
                />
              </View>
              {/* Track artist */}
              {activeTrack.artist && (
                <Text
                  numberOfLines={1}
                  style={[styles.trackArtistText, { marginTop: 6 }]}>
                  {activeTrack.artist}
                </Text>
              )}
            </View>
            <PlayerProgressBar style={{ marginTop: 32 }} />

            <PlayerControls style={{ marginTop: 40 }} />
          </View>
          <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />

          <View style={utilsStyles.centeredRow}>
            <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
          </View>
        </View>
      </View>
    </View>
    // </LinearGradient>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}>
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: "#fff",
          opacity: 0.7,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: 22,
    fontWeight: "700",
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: "90%",
  },
});
export default PlayerScreen;
