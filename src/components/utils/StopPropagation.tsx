import { PropsWithChildren } from "react";
import { View } from "react-native";

export const StopPropagation = ({ children }: PropsWithChildren) => {
  return (
    <View
      onStartShouldSetResponder={() => true}
      onTouchEnd={(e) => e.stopPropagation()}
      style={{
        padding: 0,
        margin:0
      }}>
      {children}
    </View>
  );
};
