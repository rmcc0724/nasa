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
              this.likes_id = data._id
              this.persistData();
              console.log(this.likes);
            }
            catch (error) {
              console.log("Error Happened " + error);
            }

            
    }
 
    //Here we need to add the like to the database
    async addLike(id, name, hazardous) {
        const like = { id, name, hazardous };
        console.log(like);
        try {
            axios({
                method: 'post',
                url: 'http://localhost:5000',
                data: like
              });
              console.log("Item Added");
              this.getLikes();
              this.persistData();
        } catch (error) {
                //
        }
        // this.likes.push(like);
        // Perist data in localStorage
        //Here we need to write the likes to the database
        
        console.log(this.likes)
        return like;
    }

    ///Here we need to remove the like from the database
    deleteLike(id) {
        try {
            axios({
                method: 'delete',
                url: `http://localhost:5000/${id}`
              });
              console.log("Item Deleted");
              this.getLikes();
              this.persistData();
        } catch (error) {
                //
        }




        
        const index = this.likes.findIndex(el => el.id === id);
        // this.likes.splice(index, 1);
        console.log(this.likes)
        // Perist data in localStorage
        this.persistData();
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
