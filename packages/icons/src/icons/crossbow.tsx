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
        d="m18 7.538-2.616 3.846L8.9 17.047 20.19 18l-3.73-6.77 2-3.23 3.538 11.23-.461.462-14.275-1.215L3.231 22 2 20.77l3.522-4.034L4.308 2.461 4.769 2l11.23 3.538-3.23 2L6 3.808l.953 11.29 5.663-6.483L16.46 6zM18.461 7.077l2.923.153.154-2-2.77-2.769-2 .154.155 2.923z"
      />
    </Svg>
  );
};

export const Crossbow = memo<IconProps>(
  themed(Icon, { defaultStrokeWidth: 0 }),
);
