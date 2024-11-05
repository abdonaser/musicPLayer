import { colors } from "@/constants/tokens";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize: number;
};
type PlayerControlsProps = {
  style?: ViewStyle;
};

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton iconSize={30} />

        <PlayPauseButton iconSize={30} />

        <SkipToNextButton iconSize={30} />
      </View>
    </View>
  );
};

export const PlayPauseButton = ({
  iconSize = 48,
  style,
}: PlayerButtonProps) => {
  const { playing } = useIsPlaying();
  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          playing ? TrackPlayer.pause() : TrackPlayer.play();
        }}>
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}>
      <FontAwesome6 name="forward" size={iconSize} color={colors.text} />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}>
      <FontAwesome6 name={"backward"} size={iconSize} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
