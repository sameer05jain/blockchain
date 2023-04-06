# blockchain


Code Structure 
---------------
/public

    /css
    
    /images
    
    /views : template files
    
    
Contribution Guide
-------------------
git checkout -b <branch name> 
    
git add . 
    
git commit -m "commit message"
    
git push -u upstream <branch name>
    

We will merge individual branchs after revewing
  
  
Notes
------
Branch v2 contains the cleanup i am doing at the moment
    
To check the changes :
  git pull
    
  git checkout v2
    
  run the project 
    
  
Use nodemon for hot reload (running the server without restarting after each change)
  
 npm install nodemon -g

 nodemon server.js
