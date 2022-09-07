clear
echo Будет установлен openssh-server. Для продолжения ввод...
read
apt update
apt install openssh-server
sudo systemctl enable sshd
echo Установка завершена