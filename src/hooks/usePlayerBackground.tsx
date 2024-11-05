import { colors } from "@/constants/tokens";
import { useEffect, useState } from "react";
import { getColors } from "react-native-image-colors";
import {
  IOSImageColors,
  AndroidImageColors,
} from "react-native-image-colors/build/types";

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<AndroidImageColors | null>(
    null
  );

  useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then((colors) => setImageColors(colors as AndroidImageColors));
  }, [imageUrl]);

  return { imageColors };
};

// import { colors } from "@/constants/tokens";
// import { useEffect, useState } from "react";
// import { getColors, ImageColorsResult } from "react-native-image-colors";

// export const usePlayerBackground = (imageUrl: string) => {
//   const [imageColors, setImageColors] = useState<ImageColorsResult | null>(
//     null
//   );

//   useEffect(() => {
//     getColors(imageUrl, {
//       fallback: colors.background,
//       cache: true,
//       key: imageUrl,
//     }).then((colors) => setImageColors(colors));
//   }, [imageUrl]);

//   return { imageColors };
// };
