'use client';

import { Button, ScreenStack, useNotificationController } from '@app/ui';
import { ButtonText } from '../../components/button/button.styled';

export default function HomeScreen() {
  const { show } = useNotificationController(); // 2. Получаем функцию show
  console.log('useNotificationController()', useNotificationController());
  const handlePress = () => {
    show('Тест со HomeScreen', {
      description: 'Уведомление успешно вызвано!',
      viewportName: 'toast', // Указываем, в какой зоне его показать
    });
  };

  return (
    <ScreenStack gap="$space.200" padding="$space.200">
      {/* 3. Добавляем кнопку для вызова уведомления */}
      <Button onPress={handlePress}>
        <ButtonText>Проверить уведомление</ButtonText>
      </Button>

      {/* <TextArea minRows={1} maxRows={3} />
      <TextArea minRows={2} maxRows={5} />

      <InlineInput size="$600" minRows={1} maxRows={2}>
        <Input.StartSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.StartSlot>
        <Input.EndSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.EndSlot>
      </InlineInput>

      <InlineInput size="$600" rows={4}>
        <Input.StartSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.StartSlot>
        <Input.EndSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.EndSlot>
      </InlineInput>
      <PasswordField /> */}
    </ScreenStack>
  );
}
