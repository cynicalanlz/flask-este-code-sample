# Test task 

Flask app with:

- new user authorization and registration;
- profile view and editing page 

Stack: Python 3, Flask, SQLAlchemy, Alembic, Bootstrap.
Other reqs: PEP 8.

## Installing on ubuntu

```
sudo apt-get install build-essential checkinstall
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
***Enter pass here***
sudo apt-get install python-psycopg2
sudo apt-get install libpq-dev
sudo -u postgres psql -c 'SHOW hba_file;'
echo "host    all         all         127.0.0.1/32          trust"  >> /etc/postgresql/9.4/main/pg_hba.conf
echo "local   all         all                               trust" >> /etc/postgresql/9.4/main/pg_hba.conf
createuser -a -d -W -U postgres usr
createdb webprof
su postgres
psql
\l
\c webprof
\dt
\d users
\q
exit

```

## If using Sublime Text
### Install jsx formatters

https://github.com/babel/babel-sublime


## How to start a project

```
git clone
pip install autoenv==1.0.0
bash
cd webprof
python manage.py

```