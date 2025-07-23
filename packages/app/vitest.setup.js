import { TextEncoder, TextDecoder } from 'node:util'

// Полифиллы для тестового окружения
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Настройка для Tamagui
process.env.TAMAGUI_TARGET = 'web'
