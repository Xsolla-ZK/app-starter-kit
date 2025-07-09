import { themed } from "@tamagui/helpers-icon";
import { memo } from "react";
import { Svg, Path } from "react-native-svg";
import type { IconProps } from "@tamagui/helpers-icon";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Svg> & {
  size: number;
};

const Icon: FC = (props) => {
  const { color = "black", size = 24, ...otherProps } = props as Props;
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...otherProps}
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M14.816 4a16.5 16.5 0 0 1 4.126 1.27c2.264 3.31 3.388 7.042 2.973 11.35a16.6 16.6 0 0 1-5.064 2.538q-.616-.826-1.083-1.746a11 11 0 0 0 1.71-.816 6 6 0 0 1-.42-.315 11.89 11.89 0 0 1-10.117 0q-.203.157-.418.315a11 11 0 0 0 1.706.814 12 12 0 0 1-1.084 1.748 16.6 16.6 0 0 1-5.06-2.54c-.354-3.714.354-7.482 2.965-11.345A16.7 16.7 0 0 1 9.18 4q.291.524.528 1.074a15.4 15.4 0 0 1 4.58 0q.235-.55.528-1.074m-7.94 8.337c0 1.101.815 1.997 1.802 1.997 1.005 0 1.782-.896 1.8-1.997.017-1.1-.792-2.004-1.803-2.004-1.012 0-1.799.903-1.799 2.004m6.647 0c0 1.101.811 1.997 1.8 1.997 1.005 0 1.78-.896 1.797-1.997.018-1.1-.785-2.004-1.798-2.004s-1.8.903-1.8 2.004"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export const Discord = memo<IconProps>(themed(Icon, { defaultStrokeWidth: 0 }));
