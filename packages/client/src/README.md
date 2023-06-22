**UI**

- «[Дизайн в Figma](https://www.figma.com/file/Vp0QTMwB8xdkthbdaNFuNO/RoadGame?type=design&node-id=0%3A1&mode=design&t=pck31nm6zWJCrlJf-1)»,

**Роуты**

`/` - Главная страница.

`/sign-in` - Страница авторизации.

`/sign-up` - Страница регистрации.

`/play` - Страница игры.

`/leader-board` - Страница результатов.

`/profile` - Страница профиля.

`/forum` - Страница форума.

`/forum/:topicId` - Страница топика форума с id `topicId`.

Также в роутер добавлены страницы 404 и error для обработки ошибок и неизвестных страниц.


**Структура директории `./src` клиентской части**

```
/src
├──/api — Сервисы api
|   ├──/Base
|   └──index.ts
├──/assets  — Файлы статики
|   ├──/fonts
|   ├──/icons
|   ├──/images
|   └──/sprites
├──/components — Повторно используемые базовые компоненты
|   ├──/Button
|   └──index.ts
├──/layouts — Лайауты для для страниц
|   ├──/Main
|   └──index.ts
├──/pages — Страницы приложения
|   ├──/Home
|   └──index.ts
├──/router — Роутер приложения и его конфиг
|   ├──/Home
|   └──index.ts
├──/store — Модули хранилища для redux
|   └──index.ts
├──/theme — Общие файлы стилей, тем и глобальных настроек
|   └──index.scss
|   └──index.ts
├──/utils — Общие утилиты, использующие сторонние библиотеки или WebApi
|   └──index.ts
├──/helpers — Общие вспомогательные чистые функции
|   └──index.ts
├── App.tsx — Главный компонент приложения
├── App.test.tsx — Файл для тестов главного компонета приложения
├── client.d.ts — Файл декларирования ts для клиентской части
└── main.tsx — Точка подключния ReactDOM
```
