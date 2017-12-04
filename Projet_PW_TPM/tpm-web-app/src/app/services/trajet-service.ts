import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { trajet} from '../models/trajet'

@Injectable()
export class TrajetService {
    constructor(private http: HttpClient) { }

    getUserTrajets(login) {

     return this.http.get('/trajet/'+login).map(result =>  result );
    }

    getByName(nameTrajet: string) {

      this.http.get('/trajet/'+nameTrajet).subscribe(data => {
      return  data;
      });
    }

    create(trajet: trajet, idUser) {

        console.log(trajet);
        return this.http.post('trajet/'+idUser , trajet).subscribe();;
    }


/*

    update(Project: Project) {
        return this.http.put('/project/' + Project._id, Project);
    }

    delete(_id: string) {
        return this.http.delete('/project/' + _id);
    }

    getUsProject(nameProject) {

     return this.http.get('/us/'+ nameProject).map(result =>  result);
    }

    getDevsProject(nameProject){


       return this.http.get('/dev/'+nameProject);
    }

addDevsProject( nameProject : String, nameDev ){
  console.log("COUCOUUUUU "+ nameDev.name);
  return this.http.post('/dev/' + nameProject, nameDev).map(result =>  result);

}

testProject(nameProject, nameDev){
  console.log("COUCOUUUUU "+nameDev);
  return this.http.get('/dev/add/' + nameProject, nameDev);

}*/

}
