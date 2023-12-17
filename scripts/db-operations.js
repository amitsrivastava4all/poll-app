import { db } from "./firebase-config.js"
import { collection, addDoc, getDocs, query , doc, getDoc,getCountFromServer,where} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"; 
/*
import { collection, addDoc } from "firebase/firestore"; 

// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "cities"), {
  name: "Tokyo",
  country: "Japan"
});
console.log("Document written with ID: ", docRef.id);
*/
export const dbOperations = {
    async addQuestion(questionObject){
        // Async Prg
          try{
           const doc = await  addDoc(collection(db,'questions'), questionObject); // Assign to Async Thread
           return doc; // wrap doc in promise
          }
          catch(err){
            console.log('Error During add a Question ', err);
            throw err;
          }
    },
    async getColumnCount(qid,ans){
      console.log('getColumnCount::: Question id ', qid , 'Ans ', ans);
      ans = ans.trim();
      const coll = collection(db, "answers");
      const q = query(coll, where("qid", "==",  qid),where('answer','==', ans));
      const snapshot = await getCountFromServer(q);
      const count = snapshot.data().count;
      return count;
    },
    async addAnswer(answerObject){
      // Async Prg
        try{
         const doc = await  addDoc(collection(db,'answers'), answerObject); // Assign to Async Thread
         return doc;
        }
        catch(err){
          console.log('Error During add a Answer ', err);
          throw err;
        }
  },

    async getQuestionById(questionId, callBackFn){
      const docRef = doc(db, "questions", questionId);
      const singleDoc = await getDoc(docRef);
      if (singleDoc.exists()) {
        console.log("Document data:", singleDoc.data());
        callBackFn(singleDoc.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    },

    async getAllQuestions(callBackFn){
      const q = query(collection(db,'questions'));
      const querySnapShots = await getDocs(q); // get all questions
      querySnapShots.forEach(doc=>{ // question traverse one by one
        console.log('Id is ', doc.id);
       // console.log('Doc is ', doc.data());
        callBackFn({...doc.data(), id:doc.id}); // calling the callback function
      })
    }
}