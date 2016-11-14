## Installing on ubuntu

```
sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
mkdir ~/src
cd ~/src
wget https://www.python.org/ftp/python/3.5.2/Python-3.5.2.tgz
tar xzf Python-3.5.2.tgz
sudo ./configure
cd Python-3.5.2/
sudo ./configure
sudo make altinstall
sudo add-apt-repository "deb https://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"
sudo apt-get update
sudo apt-get install postgresql-9.4
sudo passwd postgres
su postgres
psql
createdb webprof
```

## How to start a project

```
bash
cd webprof

```