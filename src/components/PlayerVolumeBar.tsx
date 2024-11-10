import { colors } from "@/constants/tokens";
import { useTrackPlayerVolume } from "@/hooks/useTrackPlayerVolume";
import { utilsStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

export const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = useTrackPlayerVolume();

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  progress.value = volume ?? 0;
  const [volumeFlag, setVolumeFlag] = useState<number>(volume ?? 0);
  useEffect(() => {
    setVolumeFlag(volume ?? 0);
  }, [volume]);

  return (
    <View style={style}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name={
            volumeFlag === 0
              ? "volume-mute"
              : volumeFlag < 0.5
                ? "volume-low"
                : volumeFlag < 1
                  ? "volume-medium"
                  : "volume-high"
          }
          size={20}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />

        <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}>
          <Slider
            progress={progress}
            minimumValue={min}
            maximumValue={max}
            containerStyle={utilsStyles.slider}
            onValueChange={(value) => {
              setVolumeFlag(value <= min.value ? 0 : value);
              progress.value = value <= min.value ? 0 : value;
              updateVolume(value);
            }}
            renderBubble={() => null}
            theme={{
              maximumTrackTintColor: colors.maximumTrackTintColor,
              minimumTrackTintColor: colors.minimumTrackTintColor,
            }}
            thumbWidth={0}
          />
        </View>

        <Ionicons
          name="volume-high"
          size={20}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />
      </View>
    </View>
  );
};
