import { Artist, TrackWithPlaylist } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from "@/assets/data/library.json";
import { useMemo } from "react";
interface libraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
}
//' Main Store
export const useLibraryStore = create<libraryState>()((set) => ({
  tracks: library,
  toggleTrackFavorite: () => {},
  addToPlaylist: () => {},
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

//' Favorites
export const useFavorites = () => {
  const favorites = useMemo(
    () =>
      useLibraryStore.getState().tracks.filter((track) => track.rating === 1),
    [useLibraryStore]
  );

  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite
  );

  return {
    favorites,
    toggleTrackFavorite,
  };
};

//'Artists
export const useArtists = () => {
  const tracks = useLibraryStore((state) => state.tracks);
  const artists = useMemo(() => {
    return tracks.reduce((acc, track) => {
      const existingArtist = acc.find((artist) => artist.name === track.artist);
      if (existingArtist) {
        existingArtist.tracks.push(track);
      } else {
        acc.push({
          name: track.artist ?? "Unknown",
          tracks: [track],
        });
      }
      return acc;
    }, [] as Artist[]);
  }, [tracks]);

  return artists;
};
