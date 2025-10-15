import { SvgThemed } from '@xsolla-zk/ui-primitives';
import { memo } from 'react';
import { Path } from 'react-native-svg';

import type { IconProps } from '@xsolla-zk/ui-primitives';

const Icon = (props: IconProps) => {
  const { color = 'black', size = 24, ...otherProps } = props;
  return (
    <SvgThemed fill="none" viewBox="0 0 24 24" size={size} color={color} {...otherProps}>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="m14.059 10.543 7.039 10.258h-5.563l-4.566-6.66-5.746 6.66H3.105l6.926-8.024L3.465 3.2h5.558l4.106 5.985 5.168-5.985h2.117l-6.344 7.352zm3.996 8.656L8.184 4.801H6.496l9.879 14.398z"
        clipRule="evenodd"
      />
    </SvgThemed>
  );
};

export const XTwitter = memo(Icon);
