// Импорт: берем функцию useState из библиотеки 'react'
import { useState } from "react";

// Объявление компонента как функции, props - объект с переданными свойствами
export default function TodoAdd(props) {
    // Хук useState:
    // Возвращает массив: [текущее_значение, функция_для_изменения]
    const [title, setTitle] = useState(''); // . . .. .. .. .. .. .. . .. . . . . . . . . . 1 
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');

    // Обработчик события change для файлового input
    const handleImageChange = (evt) => { // evt - объект события // . . .. .. .. .. .. .. . 6 
        // evt.target - элемент, который вызвал событие (здесь <input type="file">)
        // .files - список выбранных файлов (FileList)
        const cFiles = evt.target.files;

        if (cFiles.length > 0) { // Если есть выбранные файлы
            // FileReader - встроенный в браузер класс для чтения файлов
            const fileReader = new FileReader();

            // Назначаем обработчик на событие 'onload' (когда файл прочитан)
            fileReader.onload = () => {
                // fileReader.result содержит данные файла как base64-строку
                setImage(fileReader.result); // Сохраняем в состояние
            };

            // Читаем первый файл как Data URL (base64)
            fileReader.readAsDataURL(cFiles[0]);
        } else {
            setImage(''); // Если файл не выбран
        }
    };

    // Обработчик отправки формы
    const handleFormSubmit = (evt) => { // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 
        // evt - объект события submit
        evt.preventDefault(); // Отменяем стандартную отправку формы

        // Создаем объект нового дела
        const newDeed = {
            title, // Берем текущее значение из состояния title
            desc,  // Из состояния desc
            image, // Из состояния image
            done: false // Поле по умолчанию
        };

        // Создаем объект Date - встроенный класс для работы с датой/временем
        const date = new Date();
        // toLocaleString() - возвращает дату как строку на языке пользователя
        newDeed.createAd = date.toLocaleString();
        // getTime() - timestamp (миллисекунды с 1 января 1970)
        newDeed.key = date.getTime();

        // Вызываем функцию add из props (переданную родительским компонентом)
        props.add(newDeed);

        // evt.target - форма, .reset() - сбрасывает значения полей формы
        evt.target.reset();
    };

    // Обработчик сброса формы
    const handleFormReset = () => { // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 
        // Сбрасываем состояния, используя функции из useState
        setTitle(''); // Пустая строка
        setDesc('');
        setImage('');
    };


    // Возвращаем JSX разметку компонента
    return (
        <section>
            <h1>Создание нового дела</h1>
            {/* Форма с обработчиками submit и reset */}
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
                {/* Поле для заголовка */}
                <div className="field"> {/* . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9*/}
                    <label className="label">заголовок</label>
                    <div className="control">
                        {/* Input, привязанный к состоянию title */}
                        <input
                            className="input"
                            value={title} // . . . . . . ........................ 2 
                            onChange={e => setTitle(e.target.value)} //................. 3 
                        />
                    </div>
                </div>

                {/* Поле для описания */}
                <div className="field">
                    <label className="label">Примечание</label>
                    <div className="control">
                        {/* Textarea, привязанный к состоянию desc */}
                        <textarea
                            className="textarea"
                            value={desc} // ..............................................4
                            defaultValue="Место для вашей рекламы"
                            onChange={e => setDesc(e.target.value)} // ...................5 
                        />
                    </div>
                </div>

                {/* Поле для загрузки изображения */}
                <div className="field">  {/*/ ........................... 10*/}
                    <div className="file">
                        <label className="file-label">
                            {/* Input для выбора файла */}
                            <input
                                className="file-input"
                                type="file"
                                accept="image/*" // Принимаем только изображения
                                onChange={handleImageChange}
                            />
                            <span className="file-cta">
                                <span className="file-label">
                                    Графическая иллюстрация...
                                </span>
                            </span>
                        </label>
                    </div>
                </div>

                {/* Кнопки формы */}
                <div className="field is-grouped is-grouped-right"> {/*/ ..................... 11*/}
                    <div className="control">
                        {/* Кнопка сброса (вызывает handleFormReset) */}
                        <input
                            type="reset"
                            className="button is-warning is-light"
                            value="Сброс"
                        />
                    </div>
                    <div className="control">
                        {/* Кнопка отправки формы (вызывает handleFormSubmit) */}
                        <input
                            type="submit"
                            className="button is-primary"
                            value="Создать дело"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
}