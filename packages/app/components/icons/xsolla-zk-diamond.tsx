import { getSafeTokenValue, type IconProp, type RichIconSizes } from '@app/ui';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';

function Icon({ size }: { size?: RichIconSizes }) {
  const sizeValue = getSafeTokenValue(size) || 24;
  return (
    <Svg viewBox="0 0 24 24" width={sizeValue} height={sizeValue} fill="none">
      <Path d="M11.9667 2L21.9335 8.57804L11.9667 21.9335L2 8.57804L11.9667 2Z" fill="white" />
      <Path
        d="M11.9667 11.8955L21.9335 8.61621L11.9667 21.9321L2 8.61621L11.9667 11.8955Z"
        fill="#D2CEFD"
      />
      <Path d="M12.0068 2L21.9332 8.57804L12.0068 21.9335V2Z" fill="#E7E6FE" />
      <Path d="M12.0068 11.8955L21.9332 8.61621L12.0068 21.9321V11.8955Z" fill="#AA9CFC" />
    </Svg>
  );
}

export const XSollaZKDiamond = memo(Icon) as IconProp;
