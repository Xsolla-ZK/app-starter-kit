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
        d="M8.676 4.007c-.086.207-.199.401-.281.611-.767 1.963.233 4.205 2.268 4.95 2.055.752 4.267-.36 5.005-2.332.456-1.22.131-2.148-.387-3.23.292-.014.592 0 .885 0h1.79c-.005.83.04 1.611.536 2.331.623.906 1.436 1.316 2.508 1.523v1.68c.001 1.066-.055 1.284-.395 2.338-.599 1.86-1.561 3.544-2.818 5.053-.138.165-.287.321-.418.491-.011.282 0 .569 0 .851V20H6.631v-2.578c-.35-.41-.702-.81-1.037-1.234-1.07-1.477-1.82-2.918-2.332-4.675C3.01 10.642 3 10.458 3 9.57V7.86c1.447-.06 2.855-1.472 3.013-2.861.037-.329.024-.663.024-.992z"
      />
    </Svg>
  );
};

export const Breastplate = memo<IconProps>(
  themed(Icon, { defaultStrokeWidth: 0 }),
);
