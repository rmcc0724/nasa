export default class Likes {
    constructor() {
        this.likes = [];
    }

    //Here we need to add the like from the database
    addLike(id, name, hazardous) {
        const like = { id, name, hazardous };
        this.likes.push(like);

        // Perist data in localStorage
        //Here we need to write the likes to the database
        this.persistData();
        console.log(this.likes)
        return like;
    }

    ///Here we need to remove the like from the database
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
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

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    //Here we need to get the likes from the database when the app loads
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }
}
