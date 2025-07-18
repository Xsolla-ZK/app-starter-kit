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
        d="m14.059 10.543 7.039 10.258h-5.563l-4.566-6.66-5.746 6.66H3.105l6.926-8.024L3.465 3.2h5.558l4.106 5.985 5.168-5.985h2.117l-6.344 7.352zm3.996 8.656L8.184 4.801H6.496l9.879 14.398z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export const XTwitter = memo<IconProps>(
  themed(Icon, { defaultStrokeWidth: 0 }),
);
