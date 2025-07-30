// import { render } from '@testing-library/react-native';
// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import { InlineInput } from './inline-input';

// // --- Mocks ---

// // Мокаем хук, чтобы контролировать его возвращаемые значения в тестах
// const mockSetText = vi.fn();
// vi.mock('../hooks/useAutoResizeFont', () => ({
//   useAutoResizeFont: vi.fn().mockImplementation(() => ({
//     onLayout: vi.fn(),
//     handleTextLayout: vi.fn(),
//     fontSize: 16,
//     text: '',
//     setText: mockSetText, // Используем мок-функцию для отслеживания вызовов
//     lineHeight: 20,
//   })),
// }));

// // --- Test Setup ---

// // Создаем обертку, которая предоставляет конфигурацию Tamagui
// // const TestWrapper = ({ children }: { children: React.ReactNode }) => (
// //   <TamaguiProvider config={config}>{children}</TamaguiProvider>
// // );

// // Очищаем моки перед каждым тестом для изоляции тестов
// beforeEach(() => {
//   vi.clearAllMocks();
// });

// // --- Test Suite ---

// describe('InlineInput', () => {
//   // it('should render correctly with default props', () => {
//   //   const { getByTestId } = render(<InlineInput testID="inline-input" />);
//   //   const input = getByTestId('inline-input');
//   //   expect(input).toBeTruthy();
//   // });

//   it('should pass down placeholder and other native props', () => {
//     const placeholderText = 'Введите текст...';
//     const { getByPlaceholderText } = render(<InlineInput placeholder={placeholderText} />);
//     expect(getByPlaceholderText(placeholderText)).toBeTruthy();
//   });

//   // it('should handle user input and call onChangeText', () => {
//   //   const { getByTestId } = render(<InlineInput testID="inline-input" />);
//   //   const input = getByTestId('inline-input');
//   //   const newText = 'Hello World';

//   //   // Симулируем ввод текста пользователем
//   //   fireEvent.changeText(input, newText);

//   //   // Проверяем, что наша мок-функция setText из хука была вызвана с правильным текстом
//   //   expect(mockSetText).toHaveBeenCalledWith(newText);
//   // });

//   // it('should set both minRows and maxRows when `rows` prop is provided', () => {
//   //   const { getByTestId } = render(<InlineInput testID="inline-input" rows={3} />);
//   //   const input = getByTestId('inline-input');

//   //   // Компонент Input внутри получает эти пропсы
//   //   expect(input.props.minRows).toBe(3);
//   //   expect(input.props.maxRows).toBe(3);
//   // });

//   // it('should swap minRows and maxRows and show a warning if minRows > maxRows', () => {
//   //   const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

//   //   const { getByTestId } = render(<InlineInput testID="inline-input" minRows={5} maxRows={2} />);
//   //   const input = getByTestId('inline-input');

//   //   // Проверяем, что было показано предупреждение
//   //   expect(consoleSpy).toHaveBeenCalledWith(
//   //     '[InlineInput] `minRows` > `maxRows` — значения будут переупорядочены',
//   //   );

//   //   // Проверяем, что значения были поменяны местами
//   //   expect(input.props.minRows).toBe(2);
//   //   expect(input.props.maxRows).toBe(5);

//   //   consoleSpy.mockRestore(); // Восстанавливаем оригинальную функцию console.warn
//   // });

//   // it('should not show a warning if minRows <= maxRows', () => {
//   //   const consoleSpy = vi.spyOn(console, 'warn');
//   //   render(<InlineInput minRows={2} maxRows={5} />);
//   //   expect(consoleSpy).not.toHaveBeenCalled();
//   // });

//   // it('should render with static properties StartSlot and EndSlot', () => {
//   //   const { getByText } = render(
//   //     <InlineInput.Props>
//   //       <InlineInput.StartSlot>
//   //         <p>Start</p>
//   //       </InlineInput.StartSlot>
//   //       <InlineInput />
//   //       <InlineInput.EndSlot>
//   //         <p>End</p>
//   //       </InlineInput.EndSlot>
//   //     </InlineInput.Props>,
//   //   );

//   //   expect(getByText('Start')).toBeTruthy();
//   //   expect(getByText('End')).toBeTruthy();
//   // });
// });
