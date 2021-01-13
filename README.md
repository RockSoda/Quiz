# Quiz
 This Quiz project is done by using Node.js and MongoDB.  
 Download and navigate to this project, type `npm run devStart` to start the server.
 
 ## Login Page(index.html)
 ![Login1](QuizPics/Login1.png)
 
 When the Login button is pressed with a faulty ID.   
 ![LoginAlertID](QuizPics/LoginAlertID.png)
 
 When the New User button is pressed with a blank user name.   
 ![LoginAlertName](QuizPics/LoginAlertUserName.png)
 
 New User is Created.   
 ![Login2](QuizPics/Login2.png)
 
 After the OK button is clicked(when new user created) or Login successfully. 
 The Actions page shows up. 
 
 ## Action Page(action.html). 
 ![Action](QuizPics/Actions.png)
 
 ## Quiz Browser(browseQuizzes.html). 
 ![Browser1](QuizPics/QuizBrowser1.png)
 
 When a Start button is pressed. 
 ![Quiz1](QuizPics/Quiz1.png)
 
 After the Submit button is pressed, the score shows up.   
 ![score](QuizPics/ScoreAlert.png)
 
 Then the Back button will be available. 
 ![Quiz2](QuizPics/Quiz2.png)
 
 ## My Quizzes(myQuiz.html). 
 ![MyQuiz1](QuizPics/MyQuiz1.png)
 
 When user tries to add a quiz without name.   
 ![MyQuizAlertName](QuizPics/MyQuizAlertQuizName.png)
 
 When user tries to add a quiz without number of questions.   
 ![MyQuizAlertNumber](QuizPics/MyQuizAlertQuizNumber.png)
 
 Example Quiz.   
 ![MyQuiz2](QuizPics/MyQuiz2.png)
 
 When the Go to Add button is clicked  
 ![MyQuizAdd1](QuizPics/MyQuizAdd1.png)
 
 When empty questions or answers were given.   
 ![MyQuizAddAlert](QuizPics/MyQuizAddAlert.png)
 
 Example Question Set. 
 ![MyQuizAdd2](QuizPics/MyQuizAdd2.png)
 
 After the quiz is posted. 
 ![MyQuiz3](QuizPics/MyQuiz3.png)
 
 Back to Quiz Browser to check. 
 ![Browser2](QuizPics/QuizBrowser2.png)
 
 ## Statistics(statistics.html)
 ![Statistics](QuizPics/Statistics.png)

 ## Flowchart
 ![flowchar](QuizPics/frontend-flowchart.png)
 
 ## Database Structure
 ```
 user: {
   name: String
   quiz:[{
      name: String
      questions:[{
         question: String
         answer: String
      }]
   }]
   attempted:[{
      quizName: String
      completion: Boolean
      score: Number
   }]
}
 ```
 
  ## APIs
  ```
  //url_to_server is the path to server, if running locally use localhost
  
  GET http://url_to_server:3000/users 
  //Return all users
  
  GET http://url_to_server:3000/users?query=quiz 
  //Return all quizzes
  
  GET http://url_to_server:3000/users?query=quiz_id 
  //Return a quiz by _id
  
  GET http://url_to_server:3000/users/user_id 
  //Return a user by _id
  
  GET http://url_to_server:3000/users/user_id?query=quiz 
  //Return all quizzes under the user_id
  
  GET http://url_to_server:3000/users/user_id?query=attempted 
  //Return all attempts under the user_id
  
  POST http://url_to_server:3000/users 
  //Create a user regarding the data structure(Content-Type: application/json)
  
  PATCH http://url_to_server:3000/users/user_id 
  //Update a user by _id regarding the data structure(Content-Type: application/json)
  
  PATCH http://url_to_server:3000/users/user_id?query=quiz 
  //Append a quiz under user_id regarding the data structure(Content-Type: application/json)
  
  PATCH http://url_to_server:3000/users/user_id?query=attempted 
  //Append an attempt under user_id regarding the data structure(Content-Type: application/json)
  
  PATCH http://url_to_server:3000/users/user_id?query=quiz_id
  //Update a quiz by quiz_id under user_id regarding the data structure(Content-Type: application/json)
  
  DELETE http://url_to_server:3000/users/user_id 
  //Delete a user by _id
  
  DELETE http://url_to_server:3000/users/user_id?query=quiz_id 
  //Delete a quiz under user_id by quiz_id
  ```
 
