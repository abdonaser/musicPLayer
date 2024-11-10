import { useFavorites } from "@/store/library";
import { useQueue } from "@/store/queue";
import { MenuView } from "@react-native-menu/menu";
import { useRouter } from "expo-router";
import { PropsWithChildren, useState } from "react";
import TrackPlayer, { Track } from "react-native-track-player";
import { match } from "ts-pattern";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tokens";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>;

export const TrackShortcutsMenu = ({
  track,
  children,
}: TrackShortcutsMenuProps) => {
  const router = useRouter();
  const isFavorite = track.rating === 1;
  const { toggleTrackFavorite } = useFavorites();
  const { activeQueueId } = useQueue();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handlePressAction = (id: string) => {
    setVisible(false);
    match(id)
      .with("add-to-favorites", async () => {
        toggleTrackFavorite(track);
        // if the tracks is in the favorite queue, add it
        if (activeQueueId?.startsWith("favorites")) {
          await TrackPlayer.add(track);
        }
      })
      .with("remove-from-favorites", async () => {
        toggleTrackFavorite(track);
        // if the tracks is in the favorite queue,we need to remove it
        if (activeQueueId?.startsWith("favorites")) {
          const queue = await TrackPlayer.getQueue();
          const trackToRemove = queue.findIndex(
            (queueTrack) => queueTrack.url === track.url
          );
          await TrackPlayer.remove(trackToRemove);
        }
      })
      .with("add-to-playlist", () => {
        // it opens the addToPlaylist modal
        // @ts-expect-error it should work
        router.push({
          pathname: "(modals)/addToPlaylist",
          params: { trackUrl: track.url },
        });
      })
      .otherwise(() => console.warn(`Unknown menu action ${id}`));
    // match(id)
    // 	.with('add-to-favorites', async () => {
    // 		toggleTrackFavorite(track)
    // 		// if the tracks is in the favorite queue, add it
    // 		if (activeQueueId?.startsWith('favorites')) {
    // 			await TrackPlayer.add(track)
    // 		}
    // 	})
    // 	.with('remove-from-favorites', async () => {
    // 		toggleTrackFavorite(track)
    // 		// if the track is in the favorites queue, we need to remove it
    // 		if (activeQueueId?.startsWith('favorites')) {
    // 			const queue = await TrackPlayer.getQueue()
    // 			const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url)
    // 			await TrackPlayer.remove(trackToRemove)
    // 		}
    // 	})
    // 	.with('add-to-playlist', () => {
    // 		// it opens the addToPlaylist modal
    // 		// @ts-expect-error it should work
    // 		router.push({ pathname: '(modals)/addToPlaylist', params: { trackUrl: track.url } })
    // 	})
    // 	.otherwise(() => console.warn(`Unknown menu action ${id}`))
  };

  return (
    <View
      style={{
        width: "28%",
        alignItems: "center",
        padding: 0,
        margin: 0,
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            onPress={openMenu}
            style={{
              padding: 0,
              minWidth: 45,
            }}>
            {children}
          </Button>
        }
        contentStyle={{
          borderRadius: 12,
          paddingVertical: 8,
          marginRight: 0,
          marginTop: 80,
          minWidth: 280,
        }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: colors.text,
            }}>
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handlePressAction(
                isFavorite ? "remove-from-favorites" : "add-to-favorites"
              );
            }}
            style={{ padding: 8 }}>
            <FontAwesome
              name={isFavorite ? "star" : "star-o"}
              size={22}
              color={colors.icon}
            />
          </TouchableOpacity>
        </View>
        <Divider />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: colors.text,
            }}>
            Add to PLaylist
          </Text>
          <TouchableOpacity
            onPress={() => {
              handlePressAction("add-to-playlist");
            }}
            style={{ padding: 8 }}>
            <Ionicons name="add" size={22} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </Menu>
    </View>
    // <MenuView
    //   onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
    //   actions={[
    //     {
    //       id: isFavorite ? "remove-from-favorites" : "add-to-favorites",
    //       title: isFavorite ? "Remove from favorites" : "Add to favorites",
    //       image: isFavorite ? "star.fill" : "star",
    //     },
    //     {
    //       id: "add-to-playlist",
    //       title: "Add to playlist",
    //       image: "plus",
    //     },
    //   ]}>
    //   {children}
    // </MenuView>
  );
};
