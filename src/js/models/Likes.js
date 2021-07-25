import axios from 'axios';

export default class Likes {
    constructor() {
        this.likes = [];
        this.getLikes();
    }
    async getLikes() {
            try {
              const result = await axios(`http://localhost:5000/api/likes`);
              this.likes = result.data;
              console.log("Likes gotten");
              this.persistData();
            }
            catch (error) {
              console.log("Error Happened " + error);
            }
            console.log("Done");
    }
 
    //Here we need to add the like to the database
    async addLike(id, name, hazardous) {
        const like = { id, name, hazardous };
        
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:5000/api/likes',
                data: like
              });
            await this.getLikes();
            // console.log("Item Added");           
        } catch (error) {
                //
        }
        
        // console.log("Here" + this.likes.length);
    }

    async deleteLike(id) {
        

        let mongoID = this.likes.filter(e=> e.id===id);
        let dataID = mongoID[0]._id;

        try {
            await axios({
                method: 'delete',
                url: `http://localhost:5000/api/likes/${dataID}`
              });
              await this.getLikes();
              console.log("Item Deleted");
        } catch (error) {    
            
        }
        // this.persistData();                
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    returnLikes() {
        return this.likes;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
        // console.log("persist " + this.likes.length);
        // console.log("Data Persisted");
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }
}
