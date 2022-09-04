clear
echo Будет установлен ansible. Для продолжения ввод...
read
apt update
apt install software-properties-common
add-apt-repository --yes --update ppa:ansible/ansible
apt install ansible
echo Установка завершена