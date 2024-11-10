import { colors } from "@/constants/tokens";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
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
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={async () => {
          setIsActive(true);
          playing ? TrackPlayer.pause() : TrackPlayer.play();
          await setIsActive(false);
        }}>
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={isActive ? "gray" : colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={async () => {
        setIsActive(true);
        await TrackPlayer.skipToNext();
        await setIsActive(false);
      }}>
      <FontAwesome6
        name="forward"
        size={iconSize}
        color={isActive ? "gray" : colors.text}
      />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={async () => {
        setIsActive(true);
        await TrackPlayer.skipToPrevious();
        await setIsActive(false);
      }}>
      <FontAwesome6
        name={"backward"}
        size={iconSize}
        color={isActive ? "gray" : colors.text}
      />
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
