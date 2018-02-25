import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
@Injectable()
export class PollsService {
    url = 'https://api.mlab.com/api/1/databases/samlimbu/collections/polls?apiKey=lXutACAwSvbZ_lgydrHKTyJA4duiL-iH';
  constructor(private http: Http) { }
  getDataFromMLab(){
    return this.http.get(this.url)
    .map(function(response){
   
      return response.json();
    })
  }

  getSingleDataFromMLab(_id: string){
    return this.http.get(this.url)
    .map(res=> res.json());

  }

  addDatatoMlab(){
    /*
      var json = JSON.stringify({id: '222', name: 'hello world'});
      var params = 'json=' + json;
      var headers = new Headers();
      

      headers.append('Content-Type','application/x-www-form-urlencoded');
      */
        return this.http.post(this.url, {id: '222', name: 'hello world'})
        .map(res => res.json());
    };
    addSingleDatatoMlab(obj){
        return this.http.post(this.url, obj)
          .map(res => res.json());
    };
    updateSingleDatatoMlab(obj, _id){
      return this.http.put('https://api.mlab.com/api/1/databases/samlimbu/collections/polls/'+_id+'?apiKey=lXutACAwSvbZ_lgydrHKTyJA4duiL-iH',obj)
      .map(res => res.json());
    }

    getPollfromMlab(){
      return this.http.get('https://api.mlab.com/api/1/databases/samlimbu/collections/polls?apiKey=lXutACAwSvbZ_lgydrHKTyJA4duiL-iH')
      .map(function(response){
        return response.json();
      });
    }

    updatePolltoMlab(obj, _id){
      return this.http.put('https://api.mlab.com/api/1/databases/samlimbu/collections/polls/'+_id+'/?apiKey=lXutACAwSvbZ_lgydrHKTyJA4duiL-iH' , obj)
      .map(function(response){
        return response.json()
        
      });
    }
   
    addPolltoMlab(obj){
      return this.http.post('https://api.mlab.com/api/1/databases/samlimbu/collections/polls/?apiKey=lXutACAwSvbZ_lgydrHKTyJA4duiL-iH' , obj)
      .map(
        res => res.json()
      );
    }
}
