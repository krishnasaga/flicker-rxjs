import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/of";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/from";
import "rxjs/add/observable/fromEvent";

const input = document.getElementById("search");

Observable.fromEvent(input, "keyup")
  .debounceTime(500)
  .mergeMap(event =>
    Observable.ajax({
      url: `https://hellobooks.000webhostapp.com/?keyword=${event.target.value}`,
      responseType: "json"
    }).catch(err => (err.xhr ? Observable.of(err) : Observable.of(".___.")))
  )
  .subscribe(console.log);
