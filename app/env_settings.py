import os

# *****************************
# Environment specific settings
# *****************************

# The settings below can (and should) be over-ruled by OS environment variable settings




# Flask settings  # Generated with: import os; os.urandom(24)
SECRET_KEY = '\xb9\x8d\xb5\xc2\xc4Q\xe7\x8ej\xe0\x05\xf3\xa3kp\x99l\xe7\xf2i\x00\xb1-\xcd'
# PLEASE USE A DIFFERENT KEY FOR PRODUCTION ENVIRONMENTS!

# SQLAlchemy settings
SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

# Flask-Mail settings
MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'mailer12312443')
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', '55f12o34yhfd')
MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', '"Webprof" <mailer12312443@gmail.com>')
MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
MAIL_PORT = int(os.getenv('MAIL_PORT', '465'))
MAIL_USE_SSL = int(os.getenv('MAIL_USE_SSL', True))


ADMINS = [
 '"Admin One" <adsnsrg@gmail.com>',
 ]
