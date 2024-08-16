import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
  Timestamp
} from "@angular/fire/firestore";
import {data} from "autoprefixer";
import {Observable, timestamp} from "rxjs";
// import {Task} from "zone.js/lib/zone-impl";

export type  Task = {
  _id: string,
  description: string,
  completed: boolean,
  user: string,
  timestamp:Timestamp
}

@Injectable({
  providedIn: 'root'
})
export  class TaskService {

  private taskCollectionRef: any;

  constructor(private fireStore: Firestore) {
    this.taskCollectionRef = collection(fireStore, "task");

  }

  getTasks(user: string) {
    const queryGetTasks = query(this.taskCollectionRef, where("user", "==", user));
    // collectionData(queryGetTasks).subscribe((docs:[])=>console.log(docs))

    return collectionData(queryGetTasks,{idField:"_id"}) as Observable<Task[]>;
  }


  removeTask(task:Task){
    deleteDoc(doc(this.taskCollectionRef,task._id));
  }

  updateTastStatus(task:Task){
   const  docRef=doc(this.taskCollectionRef,task._id) ;
   updateDoc(docRef,{
     completed: !task.completed,

   })
  }

  async createNewTask(description:string,user:string){
    const newTask={
      description,
      user,
      completed:false,
      timestamp:Timestamp.now()
    };
    await addDoc(this.taskCollectionRef,newTask);
  }
}
