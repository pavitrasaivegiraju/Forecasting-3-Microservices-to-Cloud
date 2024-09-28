Problem Statement:
The goal of this tutorial is to use GitHub to track created and closed issues of a given repository(angular, material-design, angular-cli,D3)
for the past year along with timeseries forecasting using Tensorflow/LSTM Keras and we will then see how to deploy it to gcloud platform.

Solution:
Step 1: We are creating three microservices:
        1. React 
        2. Flask
        3. LSTM/Keras

Step 2: What will React do?
        1. React will retrieve GitHub created and closed issues for a given repository and will display the bar-charts of same using high-charts        
        2. It will also display the images of the forecasted data for the given GitHub repository and images are being retrieved from GCP storage
        3. React will make a fetch api call to flask microservice.

Step 3: Prerequisites to work with this application:
        1:You must have following installed on your computer:
           a.Docker(https://www.docker.com/get-started) 
           b.Google Cloud SDK(https://cloud.google.com/sdk/docs/install) 
           c.NodeJs (https://nodejs.org/en/download/) (You must install NodeJS if you want to run React application on your machine)
             1. Rules to follow while installing NodeJs
		    a. Go to the link (https://nodejs.org/en/download/)
		    b. Click the Windows Installer button to download the latest default version and choose the location where you want to store Node.js. 
                   (The Node.js installer includes the NPM package manager.)
		    c. Open the newly downloaded Node.js setup. and there you will be able to see
			  "Welcome to the Node.js setup wizard" , "Next", and "cancel". Hit on "Next"
		    d. After clicking next, you will be able to see "End-User Licence Agreement", one
			checkbox with "I accept the terms in the Licence Agreement", click on that checkbox
		    e. After clicking on next, you will be able to see "Destination Folder", there you dont have to make any changes, you just have to click "next"
                f. After clicking next, you should see "Custom Setup" and there you have to click "next"
		    g. After clicking next, you will able to see "Tools for Native Modules" and one checkbox where it is written"Automatically install the necessary tools.
                   Note that this will also install chocolatey. The script will pop-up in a new window after installation completes", you have to click that checkbox and then click "next
		    h. After clicking next. you will be able to see "Ready to install Node.js" there you have to click on "Install"
			 and it will start installing
		    i. After installation, it will show "completed the NOde.js Setup Wizard" there you have to click on "finish"
		    j. After clicking on finish, you will navigate to "user access control" where you have to select "yes"
		    k. After clicking on yes, it will navigate you to "Intall additional tools for Node.js", there it will ask for"press any key to continue" there you have to hit "enter"
                l. you have successfully installed Node.js, NPM and python(Chocolatey will automatically install the latest version of python)
 		    m. After you download and install Node, start your terminal/command prompt and run "node -v" and 
                 "npm -v" to see which versions you have.
                n. Your version of NPM should be at least 5.2.0 or newer because create-react-app requires that we 
                    have NPX installed. If you have an older version of NPM, run the command to update it:"npm install -g npm"
                      
Step 4: Deploying React to gcloud platform
        1: You must have Docker(https://www.docker.com/get-started) and Google Cloud SDK(https://cloud.google.com/sdk/docs/install) 
           installed on your computer. Then, Create a gcloud project and enable the following:
           a.billing account
           b.Conatiner Registry API
           c. Cloudbuild API

        2: Copy the Flask project url from gcloud and paste it in src/setupProxy.js file line 14 where it is written "your_flask_gcloud_url"  

        3: Type `docker` on cmd terminal and press enter to get all required information

        4: Type `docker build .` on cmd to build a docker image

        5: Type `docker images` on cmd to see our first docker image. After hitting enter, newest created image will be always on the top of the list

        6: Now type `docker tag <your newest image id> gcr.io/<your project-id>/<project-name>` and hit enter 
            Type `docker images` to see your image id updated with tag name

        7: Type `gcloud init` on cmd and it will prompt Create or select a configuration choose existing configurations and hit enter and
          it will prompt Choose a current Google Cloud project, choose your current gcloud project number and hit enter.


        8: Type `gcloud auth configure-docker` on cmd hit enter and then type "docker images"

        9: Type `docker push <your newest created tag>` on cmd and hit enter

        10:Go to container registry you will see your newly pushed docker image, click on that docker image, after clicking, you will be able to see
          docker image id and on the right side you will see "⋮", left click on "⋮" there you will be able to see option "deploy it to cloud run" click on that and 
          it will navigate you to cloud run where in container image url hit select and select your latest id and change the Min Instance to 1 instead of 0 and the option 
          to allow unauthorized access when creating new service and then go to container tab and edit container port to '3000', increase the memory limit to 1GiB 
          and click on create.
            
        11: This will create the service on port 3000 and will generate the url, hit the url.   

        

Step 5: To run locally, go to cmd terminal and type following: 
        1. npm install
        2. change the url of flask of file setupProxy.js to "http://localhost:3000"
        3. npm start 

        NOTE: IF YOU WANT TO MAKE YOUR OWN NEW REACT APP THEN GO TO CMD/TERMINAL AND TYPE "npx create-react-app your_folder_name" THAT WILL AUTOMATICALLY INSTALL "node modules",
        "package.json".

2. Flask
Step 1: What will Flask do?

       1. Flask will take the repository_name from the body of the api(i.e. from React) and will fetch the created, closed issues, commits, pull requests and branches
          for the given repository for past 2 years
       3. It will use group_by to group the created and closed issues per month and per week respectively and will return back the data to client.
       4. It will then use the data obtained from the GitHub and pass it as a input request in the POST body to LSTM microservice
          to predict and to forecast the data.
       5. The response obtained from LSTM microservice is also return back to client as image urls for google storage.

> > Step 2: Deploying Flask to gcloud platform

       1: You must have Docker(https://www.docker.com/get-started) and Google Cloud SDK(https://cloud.google.com/sdk/docs/install)
           installed on your computer. Then, Create a gcloud project and enable the following:
           a.billing account
           b.Conatiner Registry API
           c. Cloudbuild API

       2. Update the LSTM URL to the 'gcloud_url' in line ...

       3: Use 'Docker' and 'gcloud' to create an image, update the tag and build on the google cloud using 'docker' commands (docker build, docker tag and docker push) and 'gcloud' commands (gcloud init, gcloud auth configure-docker).

       4:  Kindly add the following to the environment variable during the 'gcloud cloud run'
           a. GITHUB_TOKEN              "Your GitHub generated token"

       5: Click on create, this will create the service on port 5000 and will generate the url, hit the url.

       6: Copy flask gcloud generated url to be used later.

3. Forecasting (LSTM/Keras)
Step1: What will LSTM do?
      1. LSTM will accept the GitHub data from flask microservice and will forecast the data for past 2 year based on past 30 days
      2. It will also plot three different graph (i.e.  "model_loss", "lstm_generated_data", "all_issues_data")using matplot lib 
      3. This graph will be stored as image in gcloud storage.
      4. The image URL are then returned back to flask microservice.

Step2: What is Google Cloud Storage?
       Google Cloud Storage is a RESTful online file storage web service for storing and accessing data on Google Cloud
       Platform infrastructure.    


Step3: Deploying LSTM to gcloud platform
       1: You must have Docker(https://www.docker.com/get-started) and Google Cloud SDK(https://cloud.google.com/sdk/docs/install) 
           installed on your computer.  
       2. Steps to follow while creating LSTM gcloud project:
            1. Go to GCP Platform, create a LSTM gcloud project.enable the following:
               a.billing account
               b.Conatiner Registry API
               c.Cloudbuild API
            2. After creating the LSTM gcloud project follow the below steps:
               a. go to gcloud storage of LSTM gcloud project then click on create bucket.
               b. then add name to your bucket (bucket name should be unique) click on continue.
               c. then choose where to store your data.
               d. there choose location type to "region" and location to "us-central1(Iowa)", then click on continue.
               e. then Choose a default storage class for your data
               f. choose option "standard" and click continue and then click on create then you will automatically navigated to "bucket details"
               g. there you will see "objects" and in "objects" you will see "buckets" click on "buckets", you will be able to see your assigned bucket name with checkbox
               h. click on checkbox, then on the right side you will be able to see "permission" and "labels",in "permission" scroll down you will be able to see
                  "ADD PRINCIPAL" 
               i. click on "ADD PRINCIPAL" you will be able to see "new principals" and "select a role", in "new principals" type "allUsers" and in 
                  "select a role" go to "cloud storage" click on "cloud storage" and select "storage object viewer" and hit on save after this
               j.  copy the BUCKET_NAME (your unique assigned bucket name) and paste it in sticky notes for futher use.
            3. After this, go to "https://cloud.google.com/docs/authentication/getting-started#create-service-account-console"  and 
               there you will see creating service account, go to creating service account, click on console, and hit on creating service account
            4. Then select your LSTM created project, in service account details add service name "your unique service name"(service name should be unique) and click on "create and 
               continue", then in Grant this service account access to project click on "select the role",choose "basic" and choose "owner"and hit on done.
            5. After that you will see your created service, click on the created service, go to keys, click on add key, and click create new key.
            6. Created key will get downloaded in .json format, copy that downloaded file in the given LSTM code
            7. Then, on cmd terminal type "set GOOGLE_APPLICATION_CREDENTIALS=KEY_PATH" (Replace KEY_PATH with the path of the JSON file that contains your service account key.)

       3: Type `docker` on cmd terminal and press enter to get all required information

       4: Type `docker build .` on cmd to build a docker image

       5: Type `docker images` on cmd to see our first docker image. After hitting enter, newest created image will be always on the top of the list

       6: Now type `docker tag <your newest image id> gcr.io/<your project-id>/<project-name>` and hit enter 
            Type `docker images` to see your image id updated with tag name

       7: Type `gcloud init` on cmd and it will prompt Create or select a configuration choose existing configurations and hit enter and
          it will prompt Choose a current Google Cloud project, choose your current gcloud project number and hit enter.
          

       8: Type `gcloud auth configure-docker` on cmd hit enter and then type "docker images"

       9: Type `docker push <your newest created tag>` on cmd and hit enter

       10: Go to container registry you will see your newly pushed docker image, click on that docker image, after clicking, you will be able to see
          docker image id and on the right side you will see "⋮", left click on "⋮" there you will be able to see option "deploy it to cloud run" click on that and 
          it will navigate you to cloud run where in container image url hit select and select your latest id and change the Min Instance to 1 instead of 0 and the option 
          to allow unauthorized access when creating new service and then go to container tab and edit container port to '8080', increase the memory limit 
          to 1GiB and go to variable and secrets tab and click on add environment variable as follows(there will three environment variable):
                Name                                 value  
            a. GOOGLE_APPLICATION_CREDENTIALS     "<your_json_filename>.json"
            b. BASE_IMAGE_PATH                    "https://storage.googleapis.com/your bucket name/"
            c. BUCKET_NAME                         "your bucket name"
            
      NOTE: For the environment variable, ".json" and "/" is mandatory in there respective environment variable value
            because ".json" have all your gcloud information and secrets keys and "/" is a app route path.

       11: Hit the create, this will create the service on port 80 and will generate the url, hit the url.

       12. Copy the generated LSTM gcloud url and paste it in sticky notes for further use

     
Step4: To run locally:
       1. Go to cmd terminal and type following:
        a. python -m venv env
        b. env\Scripts\activate.bat
        c. pip install -r requirements.txt
        d. python app.py  

