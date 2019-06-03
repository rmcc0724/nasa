import axios from 'axios';

export default class Likes {
    constructor() {
        this.likes = [];
        this.getLikes();
    }
    async getLikes() {
            try {
              const result = await axios(`http://localhost:5000`);
              const data = result.data;
              this.likes = data;
            }
            catch (error) {
              console.log("Error Happened " + error);
            }
            this.persistData();
            
    }
 
    //Here we need to add the like to the database
    async addLike(id, name, hazardous) {

        //Add the like to the local storage
        const like = { id, name, hazardous };

        //Post it to the data base
        try {
            axios({
                method: 'post',
                url: 'http://localhost:5000',
                data: like
              });
              this.likes.push(like);
              this.getLikes();
              console.log("Item Added");           
        } catch (error) {
                //
        }
        // Perist data in localStorage
        this.persistData();
        console.log(this.likes);
        return like;
    }

    ///Here we need to remove the like from the database
    async deleteLike(id) {
        
        const index = this.likes.findIndex(el => el.id === id);
        let mongoID = this.likes.filter(e=> e.id===id);
        let dataID = mongoID[0]._id;
        console.log(dataID);

        try {
            axios({
                method: 'delete',
                url: `http://localhost:5000/${dataID}`
              });
              console.log("Item Deleted");

        } catch (error) {            
        }
        this.likes.splice(index, 1);
        this.persistData();
        console.log(this.likes);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    returnLikes() {
       // console.log(this.likes);
        return this.likes;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        //console.log(localStorage);
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }
}
