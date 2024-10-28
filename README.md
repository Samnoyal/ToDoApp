# Flask To-Do Application
#### This is a full-featured To-Do Application built using Flask for the backend and HTML, CSS, and JavaScript for the frontend. The app includes features such as marking tasks as Favorite, Pending, or Completed, and supports a Dark/Light mode toggle for a modern UI experience.

## Features
   1. Add, edit, and delete tasks.
   2. Mark tasks as Favorite, Pending, or Completed.
   3. Filter tasks by their status.
   4. Dark/Light mode toggle with a modern switch.
   5. User-friendly and responsive UI.

## Technologies Used
   1. Backend: Flask (Python)
   2. Frontend: HTML, CSS, JavaScript
   3. Deployment: Render (or other cloud services)

## Local Setup and Run Instructions
### Prerequisites
#### Before setting up the project, make sure you have the following installed on your system:
   *Python 3.8+*
   *pip (Python package installer)*
   *Git (version control)*
   
### Instructions to Set Up the Application Locally

1. Clone the repository: Open a terminal or command prompt and run the following command to clone the repository:

   ```bash
   git clone https://github.com/Samnoyal/ToDoApp.git
   cd ToDoApp
   ```

2. Set up a virtual environment (optional but recommended):
   
   ```bash
   python -m venv venv
   ```
   ```bash
   source venv/bin/activate   # For Linux/MacOS
   ```
   ```bash
   venv\Scripts\activate      # For Windows
   ```

3.Install the dependencies: Install all the required Python libraries using pip:
      
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application: After installing the dependencies, start the Flask development server:

   ```bash
   python app.py
   ```
      
5. Access the application: Once the app is running, open your web browser and go to:

   ```bash
   http://127.0.0.1:5000/
   ```

#### Now, you can start using the To-Do application locally.

## Project Structure
   ```bash
   .
   ├── app.py                # Main Flask application file
   ├── static/               # CSS, JS, and other static files
   │   ├── css/
   │   └── js/
   ├── templates/            # HTML templates
   │   └── index.html
   ├── requirements.txt      # Dependencies for the project
   ```

## Deployment Instructions (Public Server)
### Deploying on Render
#### Render is a cloud platform that makes it easy to deploy web applications. Follow these steps to deploy your Flask To-Do app on Render:

1. Sign up or log in to Render:
   
   *Go to [Render.com](https://dashboard.render.com/) and sign in using your GitHub or GitLab account.

2. Create a New Web Service:
   
   *Click the New button in the top-right corner of the dashboard and select Web Service.
   *Connect your GitHub or GitLab repository to Render.*
   *Choose the repository where your Flask To-Do app is stored.

3. Configure the Service:
   
   *Name: Give your web service a name (e.g., ToDoApp).
   *Build Command: Leave the default (pip install -r requirements.txt).
   *Start Command: Enter gunicorn app:app (this will run your Flask app using Gunicorn).
   *Choose the Python 3.x environment.
   *Set the Instance Type (you can select the free tier for small applications).

4. Deploy:

   *Click Create Web Service to start the deployment.
   *Render will pull the latest code from your repository, install the dependencies, and deploy the application.

5. View the Live Application:

   *After successful deployment, Render will provide a public URL where your application is live **ToDo Application : [https://flask-todo-app.onrender.com](https://todoapp-r4s4.onrender.com].**
   *You can share this URL to give others access to your app.

## Notes on Deployment
   *Auto-Deploy: You can enable auto-deploy so that each time you push changes to the repository, Render will automatically redeploy the app.
   *Environment Variables: If you need to set any environment variables (e.g., database URIs), you can do this in the Settings tab of your Render service.

## License
   ### This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
   ### For any questions or suggestions, please feel free to reach out to [samnoyal33@gmail.com].

## Additional Resources
   ### [Flask Documentation](https://flask.palletsprojects.com/en/stable/)
   ### [Render Deployment Guide](https://docs.render.com/)
