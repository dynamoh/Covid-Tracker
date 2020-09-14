# Covid-Tracker

To get Started with this project first clone this repo.

## Steps to Install the Project
1. Create a Virtual enviorment using the command `virtualenv ENV_Name`
2. Install the dependencies from requirements.txt file using `pip install -r requirements.txt`
3. Run migrations using the command `python manage.py makemigrations`
4. migrate the database using python manage.py migrate.
5. some enviorment variables (SECRET_KEY, EMAIL_TLS etc ...) are stored in the `.env` file that are confidential.
6. Use your email and App password in place of `EMAIL_HOST_USER_VALUE` and `EMAIL_HOST_PASSWORD_VALUE`.
7. Now are ready to run the application.
8. start the server by using `python manage.py runserver`
9. To access the admin panel create a superuser using the command `python manage.py createsuper`
10. Enter you credentials.
11. You can login to the admin panel from this url `http://127.0.0.1:8000/admin/`

