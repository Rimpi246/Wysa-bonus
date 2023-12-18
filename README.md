# Wysa-Bonus

### Installation

1. Open git bash or cmd
2. Clone the repo:

```
git clone https://github.com/Rimpi246/Wysa-bonus.git
```

3. Obtain the **.env** file and place it inside the root directory

```
SECRET=Enter_your_secret
MONGODB_URL=Enter_your_MongoDB_url
PORT=Enter_your_port
```

4. Install all the packages

```
npm install
```

5. Run the app

```
node app.js
```

Web app will be accessible at `localhost:<port>`

### Routes

- POST `/seed` -> Seeds the questions in the database
- POST `/signup` -> Creation of new user
- POST `/login` -> User login
- GET `/api/question/:q_id` -> Retrieves all of the questions which are asked to the user on onboarding
- POST `/api/users/:user_id/submit-answer/:q_id` -> Stores the answers user chooses while onboarding
