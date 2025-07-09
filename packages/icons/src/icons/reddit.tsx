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
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m.695 3.994a.3.3 0 0 1 .123.003l2.45.489a1 1 0 1 1 .97 1.5 1 1 0 0 1-1.101-.887l-2.14-.45-.649 3.12a7.1 7.1 0 0 1 3.85 1.23c.258-.246.6-.394.957-.406A1.463 1.463 0 0 1 18.67 12a1.46 1.46 0 0 1-.808 1.33q.015.22 0 .44c0 2.242-2.61 4.062-5.829 4.062-3.22 0-5.83-1.822-5.83-4.062a3 3 0 0 1 0-.44 1.458 1.458 0 0 1-.457-2.327 1.46 1.46 0 0 1 2.064-.065 7.16 7.16 0 0 1 3.9-1.23l.738-3.47v-.005a.31.31 0 0 1 .248-.239M9.67 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2m4.631 0a1.001 1.001 0 1 0 .001 2.002 1.001 1.001 0 0 0 0-2.002m-4.556 3.309a.27.27 0 0 0-.209.442c.711.534 1.582.808 2.472.77.89.038 1.76-.236 2.47-.77v.04a.28.28 0 0 0 .006-.395.28.28 0 0 0-.396-.006 3.3 3.3 0 0 1-2.09.61 3.27 3.27 0 0 1-2.08-.63.27.27 0 0 0-.173-.061"
      />
    </Svg>
  );
};

export const Reddit = memo<IconProps>(themed(Icon, { defaultStrokeWidth: 0 }));
