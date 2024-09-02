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