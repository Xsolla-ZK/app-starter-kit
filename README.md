# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app
- `@app/ui`: a stub React component library shared by both `web` and `docs` applications
- `@app/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

На основе предоставленных файлов, вот единое описание компонента `InlineInput` в формате Markdown.

-----

# Описание Компонента `InlineInput`

`InlineInput` — это кастомизированный компонент для ввода текста. Его основное предназначение — выглядеть как "встроенный" элемент интерфейса.

-----

## Ключевые Характеристики

- **Автоматическое изменение размера шрифта**: Ключевая особенность компонента — способность динамически изменять размер шрифта для вмещения вводимого текста. Эта логика реализована в хуке `useAutoResizeFont`.
- **Многострочный ввод**: Компонент по умолчанию является многострочным (`multiline`). Его высота может динамически изменяться в зависимости от содержимого.
- **Управление высотой**: Высоту поля можно контролировать с помощью следующих свойств:
  - `rows`: Устанавливает фиксированное количество строк, задавая одинаковые значения для `minRows` и `maxRows`.
  - `minRows` и `maxRows`: Задают минимальное и максимальное количество строк, позволяя полю ввода расти по мере добавления текста до определенного предела. Если `minRows` больше `maxRows`, их значения меняются местами.
- **Компонуемый интерфейс (Compound Components)**: `InlineInput` использует статичные свойства для добавления дочерних элементов в слоты, что делает его более гибким.
  - `InlineInput.Props`: Компонент-обертка (`InputContext.Provider`), который необходимо использовать при добавлении слотов.
  - `InlineInput.StartSlot`: Слот (`InputStartSlot`) для добавления иконок или других элементов в начало поля ввода.
  - `InlineInput.EndSlot`: Слот (`InputEndSlot`) для добавления элементов в конец поля ввода.
- **Стилизация через варианты**: Внешний вид настраивается через свойство `size`. Это свойство применяет предопределенные стили из конфигурации компонентов. Типы для размеров (`InlineInputSizes`) определены в `inline-input.types.ts`.

-----

## Структура и Свойства (Props)

Компонент `InlineInput` является оберткой над базовым компонентом `Input` и наследует его свойства, а также все стандартные свойства `TextInput`. Основные кастомные свойства определены как варианты в файле стилей и обрабатываются в файле компонента.

| Свойство  | Тип                      | По умолчанию | Описание                                                                                                   |
| :-------- | :----------------------- | :----------- | :--------------------------------------------------------------------------------------------------------- |
| `size`    | `InlineInputSizes` | `'$500'` | Определяет набор предопределенных стилей (размер шрифта, высота и т.д.) из конфигурации.       |
| `rows`    | `number`                 | `undefined`  | Устанавливает фиксированное количество отображаемых строк.                                         |
| `minRows` | `number`                 | `undefined`  | Минимальное количество строк для отображения.                                                    |
| `maxRows` | `number`                 | `undefined`  | Максимальное количество строк, до которого поле может расширяться.                               |
| `disabled`| `boolean`                | `undefined`  | Переводит компонент в неактивное состояние. Определен как вариант стилизации.                      |

-----

## Принцип Работы

На платформах, отличных от Web, `InlineInput` использует скрытый компонент `<Text>` для предварительного вычисления размеров текста. Это позволяет точно определить необходимую высоту и размер шрифта перед отрисовкой основного поля ввода `Input`. Ссылка на нативный элемент передается с помощью `forwardRef` и `useComposedRefs` для взаимодействия с DOM-элементом или нативным компонентом.

## Пример Использования

```jsx
'use client';

import { RichIcon, ScreenStack } from '@app/ui';
import { Eye } from '@xsolla-zk/icons';
import { InlineInput } from '../../components/inline-input';
import { Input } from '../../components/input';
import { PasswordField } from '../../components/password-field';

export default function HomeScreen() {
  return (
    <ScreenStack gap="$space.200">
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
    </ScreenStack>
  );
}
```

# Описание Компонента `TextArea`

`TextArea` — это кастомизированный компонент, предназначенный для многострочного ввода текста. Он построен как обёртка над базовым компонентом `Input` и использует его возможности.

-----

## Ключевые Характеристики

- **Многострочный Ввод**: Компонент по умолчанию является многострочным (`multiline`), что делает его идеальным для полей ввода комментариев, описаний и других объемных текстов.
- **Динамическая Высота**: Высота поля ввода может динамически изменяться в зависимости от количества вводимого текста. Это поведение контролируется с помощью следующих свойств:
  - `rows`: Устанавливает фиксированное количество строк, задавая одинаковые значения для `minRows` и `maxRows`.
  - `minRows` и `maxRows`: Задают минимальное и максимальное количество строк, позволяя полю ввода расти до определенного предела. Если `minRows` больше `maxRows`, их значения меняются местами для корректной работы.
- **Стабильный Размер Шрифта**: В отличие от `InlineInput`, данный компонент **не изменяет** размер шрифта (`fontScaling: false`). Он использует хук `useAutoResizeFont` только для получения `lineHeight` с целью корректного вычисления высоты компонента на основе количества строк.
- **Компонуемый интерфейс (Compound Components)**: `TextArea` использует статичные свойства для добавления дочерних элементов в слоты, что делает его более гибким.
  - `TextArea.Props`: Компонент-обертка (`InputContext.Provider`), который необходимо использовать при добавлении слотов.
  - `TextArea.StartSlot`: Слот (`InputStartSlot`) для добавления иконок или других элементов в начало поля ввода.
  - `TextArea.EndSlot`: Слот (`InputEndSlot`) для добавления элементов в конец поля ввода.

-----

## Свойства (Props)

Компонент `TextArea` является `forwardRef` компонентом, который принимает все свойства базового компонента `Input` (`InputProps`), а также следующие специфичные свойства для управления его поведением.

| Свойство | Тип | По умолчанию | Описание |
| :--- | :--- | :--- | :--- |
| `size` | `string` | `'$500'` | Определяет набор предопределенных стилей (размер шрифта, высота и т.д.). |
| `rows` | `number` | `undefined` | Устанавливает фиксированное количество отображаемых строк. |
| `minRows` | `number` | `undefined` | Минимальное количество строк для отображения. |
| `maxRows` | `number` | `undefined` | Максимальное количество строк, до которого поле может расширяться. |

-----

## Принцип Работы

`TextArea` передает большинство своих свойств напрямую в компонент `Input`. Для платформ, отличных от Web, он предварительно вычисляет минимальную высоту (`calculatedMinHeight`) на основе `minRows` и `lineHeight`, чтобы гарантировать корректное отображение с самого начала. Передача `ref` к внутреннему элементу осуществляется с помощью `forwardRef` и `useComposedRefs`.

## Пример Использования

```jsx
'use client';

import { RichIcon, ScreenStack } from '@app/ui';
import { Eye } from '@xsolla-zk/icons';
import { InlineInput } from '../../components/inline-input';
import { Input } from '../../components/input';
import { PasswordField } from '../../components/password-field';

export default function HomeScreen() {
  return (
    <ScreenStack gap="$space.200">
      <TextArea minRows={2} maxRows={5} />
      <TextArea rows={2}/>
    </ScreenStack>
  );
}
```
