## Что было исправлено:
1. Был добавлен вызов удаления обработчиков (вместо this.stop() добавлен вызов this.destroy())
2. Удалены лишние инициализации переменных (в файле Core/Index.ts - endGameMessageObject, в файле useEngine.ts - useNavigate)

## Результат:
#### В начале работы после сборки мусора:
###### JS Heap - 10 108 556
###### Documents - 1
###### Nodes - 289
###### Listeners - 151
![image](https://github.com/crazymaza/CodeBusters/assets/129430140/88fb2795-4305-4f63-ad52-accb2f5a4db8)
Скачки на графике обусловлены постоянной перерисовкой игрового поля. В конце записи запущен сборщик мусора, можно видеть, что значения выше описанных результатов не изменились
#### В конце работы после сборки мусора:
###### JS Heap - 10 157 468
###### Documents - 1
###### Nodes - 289
###### Listeners - 151
![image](https://github.com/crazymaza/CodeBusters/assets/129430140/e3005cae-a076-49d2-ae86-0d3408f4d3ce)
