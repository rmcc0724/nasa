// const axios = require('axios');
// async function getResults() {
//     try {
//         const result = await axios('https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-03-18&api_key=xtcQn1fI4aTFJGdXDuVKxHMrUOEQIQbN6lYtSf4K');
//         const items = result.data.near_earth_objects;
//         console.log(items);
//             Object.keys(items).map((item) => {
//               let html = `<h2>Date: ${item}</h2><br/>`;

//               items[item].forEach(e => {
//                 html += `<ul><li>Astroid name: ${e.name}</li>
//         <li>Diameter: ${e.estimated_diameter.miles.estimated_diameter_max} miles</li>
//         <li>Potentially Hazardous: ${e.is_potentially_hazardous_asteroid}</li>
//         <li>Missed Earth by ${e.close_approach_data[0].miss_distance.miles} miles</li>
//         </ul><br/>`;
//     }
//             }
//     catch (error) {
//         console.log("Error Happened " + error);
//     }
// }
// getResults();
console.log("This thing on?");


<!--
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
                <!-- Modal content-->
     <!-- Modal content-->
     <div class="modal-content">
            <div class="modal-header" style="padding:35px 50px;">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4><span class="glyphicon glyphicon-lock"></span> Login</h4>
            </div>
            <div class="modal-body" style="padding:40px 50px;">
              <form role="form">
                <div class="form-group">
                  <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
                  <input type="text" class="form-control" id="usrname" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                  <input type="text" class="form-control" id="psw" placeholder="Enter password">
                </div>
                <div class="checkbox">
                  <label><input type="checkbox" value="" checked>Remember me</label>
                </div>
                  <button type="submit" class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span> Login</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
              <p>Not a member? <a href="#">Sign Up</a></p>
              <p>Forgot <a href="#">Password?</a></p>
            </div>
          </div>


        </div>
      </div>
<!-- End Modal -->
    --> 