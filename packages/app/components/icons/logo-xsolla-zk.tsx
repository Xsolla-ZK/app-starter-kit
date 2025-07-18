import type { RichIconSizes } from '@app/ui';
import { getSafeTokenValue, type IconProp } from '@app/ui';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';

function Icon({ size }: { size?: RichIconSizes }) {
  const sizeValue = getSafeTokenValue(size) || 24;
  return (
    <Svg viewBox="0 0 24 24" width={sizeValue} height={sizeValue} fill="none">
      <Path
        d="M0.714656 5.92721C1.33046 3.34753 3.34753 1.33046 5.92721 0.714656C9.91895 -0.238219 14.081 -0.238219 18.0728 0.714656C20.6525 1.33046 22.6695 3.34753 23.2853 5.92721C24.2382 9.91895 24.2382 14.081 23.2853 18.0728C22.6695 20.6525 20.6525 22.6695 18.0728 23.2853C14.081 24.2382 9.91895 24.2382 5.92721 23.2853C3.34753 22.6695 1.33046 20.6525 0.714656 18.0728C-0.238219 14.081 -0.238219 9.91895 0.714656 5.92721Z"
        fill="#6939F9"
      />
      <Path d="M12 5.25L18.75 9.705L12 18.75L5.25 9.705L12 5.25Z" fill="white" />
      <Path d="M12 11.95L18.75 9.72864L12 18.7488L5.25 9.72864L12 11.95Z" fill="#D2CEFD" />
      <Path d="M12.0312 5.25L18.751 9.705L12.0312 18.75V5.25Z" fill="#E7E6FE" />
      <Path d="M12.0312 11.95L18.751 9.72864L12.0312 18.7488V11.95Z" fill="#AA9CFC" />
    </Svg>
  );
}

export const LogoXSollaZK = memo(Icon) as IconProp;
