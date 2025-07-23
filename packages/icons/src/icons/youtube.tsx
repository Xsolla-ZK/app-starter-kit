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
        d="M20.97 6.07c.91.993 1.03 2.57 1.03 6.43s-.12 5.437-1.03 6.43C20.058 19.921 19.11 20 12 20s-8.058-.078-8.97-1.07C2.12 17.936 2 16.36 2 12.5s.12-5.437 1.03-6.43C3.942 5.079 4.89 5 12 5s8.058.079 8.97 1.07m-10.657 9.702 5.06-3.105-5.06-3.056z"
      />
    </Svg>
  );
};

export const Youtube = memo<IconProps>(themed(Icon, { defaultStrokeWidth: 0 }));
