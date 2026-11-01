import { useState, type ComponentProps } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "@/lib/theme";

type Props = Omit<ComponentProps<typeof Pressable>, "style"> & {
  style?: StyleProp<ViewStyle>;
  focusStyle?: StyleProp<ViewStyle>;
};

/** Pressable that shows a clear highlight when a TV remote (D-pad) moves focus onto it. */
export default function Focusable({ style, focusStyle, onFocus, onBlur, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <Pressable
      focusable
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={[styles.base, style, focused && [styles.focused, focusStyle]]}
      {...rest}
    />
  );
}

// A transparent border is always reserved so focusing never shifts the layout.
const styles = {
  base: { borderWidth: 2, borderColor: "transparent", borderRadius: 12 },
  focused: { transform: [{ scale: 1.05 }], borderColor: colors.text },
} as const;
