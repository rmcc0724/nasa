import axios from 'axios';

export default class Likes {
    constructor() {
        this.likes = [];
        this.format=[];
        this.getLikes();
    }
    async getLikes() {
            try {
              const result = await axios(`http://localhost:5000`);
              const data = result.data;
              this.likes = data;
              this.persistData();
              console.log(this.likes);
            }
            catch (error) {
              console.log("Error Happened " + error);
            }

            
    }
 
    //Here we need to add the like to the database
    addLike(id, name, hazardous) {
        const like = { id, name, hazardous };
        this.likes.push(like);

        // Perist data in localStorage
        //Here we need to write the likes to the database
        // this.persistData();

        console.log(this.likes)
        return like;
    }

    ///Here we need to remove the like from the database
    deleteLike(id) {
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
