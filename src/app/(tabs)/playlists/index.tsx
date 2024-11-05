import { colors } from "@/constants/tokens";
import { defaultStyles, utilsStyles } from "@/styles";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

const PlaylistsScreen = () => {
  const isSliding = useSharedValue(false);
  const [price, setPrice] = useState(0);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(10);
  const handle = (value: number) => {
    setPrice(progress.value);
  };
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Playlists Screen</Text>
      <View style={styles.boxContainer}>
        <Text style={[defaultStyles.text, { textAlign: "center" }]}>
          {price}
        </Text>
        <Slider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          containerStyle={utilsStyles.slider}
          theme={{
            minimumTrackTintColor: "#fff",
            maximumTrackTintColor: "red",
          }}
          onSlidingStart={() => (isSliding.value = true)}
          onValueChange={async (value) => {
            await handle(value);
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  boxContainer: {
    width: "95%",
    height: 200,
    margin: "auto",
    textAlign: "center",
    borderWidth: 1,
    padding: 5,
    borderColor: "#fff",
  },
});
export default PlaylistsScreen;
