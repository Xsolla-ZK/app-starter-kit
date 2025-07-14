'use client';

import { ScreenStack } from '@app/ui';
import { Input } from '../../components/input';

// const PasswordField = forwardRef<HTMLInputElement, InputProps>(function PasswordField(
//   { value, onChangeText, ...props },
//   ref,
// ) {
//   const [localValue, setValue] = useState(() => value ?? '');

//   const [show, setShow] = useState(false);

//   const handleChange: InputProps['onChangeText'] = (value) => {
//     setValue(value);
//     onChangeText?.(value);
//   };

//   const _handleClear = () => {
//     setValue('');

//     onChangeText?.('');
//   };

//   const handleClickShowPassword = () => {
//     setShow((prev) => !prev);
//   };

//   return (
//     <Input
//       type={show ? 'text' : 'password'}
//       value={localValue}
//       onChangeText={handleChange}
//       {...props}
//       ref={ref}
//     >
//       <Input.EndSlot>
//         <RichIcon
//           pressable
//           shape="squircle"
//           size="$200"
//           aria-label="toggle password visibility"
//           onPress={handleClickShowPassword}
//         >
//           {EyeSlash && Eye && <RichIcon.Icon icon={show ? EyeSlash : Eye} />}
//         </RichIcon>
//         {Boolean(localValue) && (
//           <RichIcon pressable shape="squircle" size="$200" onPress={_handleClear}>
//             {Cross && (
//               <RichIcon.Icon
//                 icon={Cross}
//                 backgroundColor="$background.warning-high"
//                 color="$content.static-light-primary"
//               />
//             )}
//           </RichIcon>
//         )}
//       </Input.EndSlot>
//     </Input>
//   );
// });

export default function HomeScreen() {
  return (
    <ScreenStack gap="$space.200">
      <Input rows={5} />
      <Input />
      {/* <Input maxRows={2} placeholder="Base" /> */}
      {/* <PasswordField /> */}
      {/* <Button size="$700">
        <Button.Text>Button</Button.Text>
      </Button> */}
    </ScreenStack>
  );
}
