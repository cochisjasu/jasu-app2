#Monolitic Server for jasu-front
###HOST
http://138.68.234.110:32641/
###Development
Run development container with: (for any other mode just edit the NODE_ENV variable) <br />
``docker run --name jasu-front -e NODE_ENV=development -p 4000:4000 --rm -it jasu-front``
### Last version deployed: 1.0.26
###Deployment
1. build the image:<br />
    ``docker build -t jasu-front .``
2. run the image in demon mode:<br />
    ``docker run -d --name jasu-front -p 3000:3000 --rm -it jasu-front``
3. get the container id:<br />
    ``docker container ls``
4. commit the container: (change the version as it grows)<br />
    ``docker container commit jasu-front jasu-front:v1.0.26``
5. tag the container: <br />
    ``docker image tag jasu-front:v1.0.26 registry.digitalocean.com/bluepixel/jasu-front:v1.0.26``
6. push the container to the registry: <br />
    ``docker image push registry.digitalocean.com/bluepixel/jasu-front:v1.0.26``
7. create the deploy:<br /> (get the image sha from digitalocean registry)
    ``kubectl create deployment jasu-front --image=<YOUR_IMAGE_SHA> --dry-run=client -o yaml > deploy.yaml``
8. deploy:
    ``kubectl apply -f deploy.yaml``
9. expose a service to externally access to the application:<br /> (the port should be the containerPort)
    ``kubectl expose deployment/jasu-front --type="NodePort" --port 3000``
10. be happy and access to your deployed application: <br />
    ``curl <NODE_IP>:<NodePort>``
    
###Auxiliary documentation
1. https://www.digitalocean.com/community/tech_talks/how-to-deploy-your-application-or-microservice-as-a-kubernetes-deployment
2. https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-kubernetes
3. https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/
4. (for docker-compose apps) https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/

docker run -d --network bluepixel --name sandbox -p 3000:3000 --rm -it jasu-front