clear

# Подготовка параметров
_1='ansible-config init --disabled > ansible.cfg'
_2='ansible-config init --disabled -t all > ansible.cfg'

echo "Будет сгенерирован ansible.cfg"
echo "В каком режиме сгенерировать?"
echo "1 - full"
echo "2 - full with plugins"
echo -n "Введите выбор: "
read mode
echo -n "Выбран режим: $mode. Продолжить?"
read
case "$mode" in
    1 )  eval $_1;;
    2 )  eval $_2;;
    * )  
        echo "Неправильная команда - $mode. Выполнение завершено!"
        exit 0
    ;;
esac
echo "Сделано!"