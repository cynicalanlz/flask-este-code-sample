#Test task 

Flask app with:

- new user authorization and registration;
- profile view and editing page 

Stack: Python 3, Flask, SQLAlchemy, Alembic, Bootstrap.
Other reqs: PEP 8.

## Installing on ubuntu 14.04

    #Install python 
    sudo apt-get install build-essential checkinstall
    sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
    mkdir ~/src
    cd ~/src
    wget https://www.python.org/ftp/python/3.5.2/Python-3.5.2.tgz
    tar xzf Python-3.5.2.tgz
    cd Python-3.5.2/
    sudo ./configure
    sudo make altinstall
    #Install postgres
    sudo add-apt-repository "deb https://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"
    sudo apt-get update
    sudo apt-get install postgresql-9.4
    sudo passwd postgres
    ***Enter pass here***
    #Install libs for python
    sudo apt-get install python-psycopg2
    sudo apt-get install libpq-dev
    #Setup postgres
    sudo -u postgres psql -c 'SHOW hba_file;'
    echo "host    all         all         127.0.0.1/32          trust"  >> /etc/postgresql/9.4/main/pg_hba.conf
    echo "local   all         all                               trust" >> /etc/postgresql/9.4/main/pg_hba.conf
    createuser -a -d -W -U postgres usr
    createdb webprof

## Cloning the code base
We assume that you have `git` installed.

    # Clone the code repository into ~/dev/my_app
    mkdir -p ~/dev
    cd ~/dev
    git clone https://github.com/cynicalanlz/flask-este-code-sample my_app
    pyvenv-3.5 ~/dev/myapp/env
    # Install required Python packages
    cd ~/dev/my_app
    pip install -r requirements.txt

## Configuring the app

Before we can use this application, we will have to configure the database URL and SMTP account
that will be used to access the database and to send emails.

Settings common to all environments are found in app/startup/common_settings.py

The example environment-specific settings are found in app/env_settings_example.py

Note: DO NOT edit app/config/settings.py because checking this into the core repository
will expose security sensitive information.

Copy the `app/env_settings_example.py` to an `env_settings.py` that resides **outside** the code directory
and point the OS environment variable `ENV_SETTINGS_FILE` to this file.

    # Copy env_settings.py and place it outside of the code directory
    cd /path/to/project
    cp app/env_settings_example.py ../env_settings.py
    
    # Point the OS environment variable `ENV_SETTINGS_FILE` to this file
    export ENV_SETTINGS_FILE=/path/to/env_settings.py

For convenience, you can set ENV_SETTINGS_FILE in your ``~/.bashrc`` or ``~/.bash_profile`` shell configuration file.

Now edit the /path/to/env_settings.py file.


## Database migrations

    # Show all DB migration commands
    python manage.py db
    # Add tables to db
    python manage.py db upgrade

## Initializing the Database
    # Create DB tables and populate the roles and users tables
    python manage.py init_db

## Running the app

Install [autoenv](https://github.com/kennethreitz/autoenv) 

    cd /path/to/project
    # Start the Flask development web server
    ./runserver.sh    # will run "python manage.py runserver"

Point your web browser to http://localhost:5000/

You can make use of the following users:
- email `user@example.com` with password `Password1`.
- email `admin@example.com` with password `Password1`.


## Testing the app

    # Run all the automated tests in the tests/ directory
    ./runtests.sh         # will run "py.test -s tests/"


## Generating a test coverage report

    # Run tests and show a test coverage report
    ./runcoverage.sh      # will run py.test with coverage options



See [the Alembic docs](alembic.readthedocs.org) for more information.


* [Flask-User-starter-app](https://github.com/lingthio/Flask-User-starter-app) was used as a starting point for this code repository.


