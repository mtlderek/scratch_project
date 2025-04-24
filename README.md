# README

## Project Setup

N.B.: anytime the terminal is referenced, it is assumed that the working directory is at the project root.

### Node

This project uses Node and Typescript, if for some reason you do not have those you can install Node from:
https://nodejs.org/en, select the latest LTS release. I would recommend against using anything newer than that, as you may encounter bugs with non-LTS versions

Typescript is part of the node modules so you don't need to manually install it, but if that is something you desire to do you may with `npm install typescript` you can add the `-g` to install it globally however I'd advise against it, because you don't want to end up with conflicting versions of local and global typescript. That might cause headaches later.

From the project root folder in a terminal you can run `npm install` to retrieve and install all the necessary node modules that this project uses. 

### Compiling Typescript code in to JavaScript
use the command `tsc` (or `npm run build`) in the terminal this will recreate the code into JavaScript in the ./dist directory.
This step isn't necessary if you are running this API through Docker, as the build command is contained within the Dockerfile

### Running the code locally without Docker
Some people find it fast to develop this way, if this is your preference use the command `npm run start`

Note when running locally without docker the base URL will be http://localhost:3000, you can change the port in app.js, however, it would be best done later as a task to have an env file with port preferences instead, I just ran out of time.
### Docker
You will need docker in order to run this in a container.  Though it can be run locally without it as explained above.

The first step would be to download docker from their official website:
https://www.docker.com/

Docker Desktop is the product you want, though it has the CLI functionality we need as well. Choose the download file that is appropriate for your hardware and OS.

Use the default settings during the installation unless otherwise specified by your IT team.

After installation, you can verify that you have CLI access to docker by simply entering the command: `docker` in the terminal.  It would ideally show you a list of available commands.
If however you get a `command not found` error then it is likely that you need to run `export PATH="$PATH:/Applications/Docker.app/Contents/Resources/bin/"` in the terminal. Retry the `docker` command it should work now.

#### Creating the Docker Image
Open a terminal in your IDE and run the command `docker build --tag testapp .` you may swap out 'testapp' for whatever name you wish to give this image, note that you will need to reference that name in the next step.

#### Creating the Container
From the terminal and after you've successful run the docker build command run:
`docker run --name testcontainer -d -p 80:3000 testapp`

- the `-d` simply makes it detached (meaning it won't show up as a foreground running task in your terminal)
- the `-p` is just for port mapping if you wish to change the target port (3000) to something else because you have other active services/projects occupying that port then feel free to do so.

Now when trying to hit the endpoints of our app the base URL will just be `http://localhost/`





