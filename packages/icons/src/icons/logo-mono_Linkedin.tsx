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
        d="M3.535 5.68C3 6.73 3 8.105 3 10.855v2.29c0 2.75 0 4.125.535 5.175a4.9 4.9 0 0 0 2.145 2.145C6.73 21 8.105 21 10.855 21h2.29c2.75 0 4.125 0 5.175-.535a4.9 4.9 0 0 0 2.145-2.145C21 17.27 21 15.895 21 13.146v-2.292c0-2.749 0-4.123-.535-5.174a4.9 4.9 0 0 0-2.145-2.145C17.27 3 15.895 3 13.146 3h-2.292c-2.749 0-4.123 0-5.174.535A4.9 4.9 0 0 0 3.535 5.68m12.133 12.633h2.667v-4.711c0-2.314-.498-4.092-3.2-4.092a2.8 2.8 0 0 0-2.527 1.388h-.036V9.724h-2.56v8.59h2.667v-4.25c0-1.12.212-2.206 1.601-2.206 1.37 0 1.388 1.283 1.388 2.279zM5.455 7.003a1.548 1.548 0 1 0 3.095-.001 1.548 1.548 0 0 0-3.095 0m.211 11.31h2.67V9.725h-2.67z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export const LogoMonoLinkedin = memo<IconProps>(
  themed(Icon, { defaultStrokeWidth: 0 }),
);
