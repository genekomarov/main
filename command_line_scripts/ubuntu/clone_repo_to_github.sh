clear
echo -n 'Инициализируем и клонируем репозиторий в github. Для продолжения ввод...'
read
echo -n 'Скопируйте файл в папку будущего репозитория...'
read
echo 'Инициализация будет выполнена в папке:'
pwd
echo -n 'Для продолжения ввод...'
read
git -init
echo Установка завершена