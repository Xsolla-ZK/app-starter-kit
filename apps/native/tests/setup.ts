// Импортируем дополнительные матчеры для React Native,
// например, .toBeOnTheScreen()
import '@testing-library/react-native/extend-expect';
import { jest } from '@jest/globals';

// --- Мокирование нативных модулей ---

// Этот блок кода "обманывает" тесты, предоставляя им
// фейковые версии нативных API, чтобы они не падали с ошибкой.
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  // Например, мокируем нативную анимацию, т.к. в тестах её нет
  RN.LayoutAnimation = {
    spring: () => {},
    configureNext: () => {},
    create: () => {},
  };

  return RN;
});

// Если вы используете Expo, Tamagui или другие библиотеки с нативным кодом,
// вам может понадобиться добавить их моки сюда.
// Например: jest.mock('expo-font');
