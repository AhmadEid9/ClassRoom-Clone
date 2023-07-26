const postTitle = document.getElementById("postTitle");
const userName = document.getElementById("userName");
const postDescription = document.getElementById("postDescription");
let class_id = localStorage.getItem("class_id");
let post_id = localStorage.getItem("post_id");

console.log(class_id);
console.log(post_id);
function fetchPostDetails() {
  axios
    .get(
      `http://localhost/ClassRoom-Clone/apis/getPost.php?class_id=${class_id}&post_id=${post_id}`
    )
    .then((response) => {
      const post = response.data;
      console.log(post);
      postTitle.textContent = post.post_title;
      postDescription.textContent = post.post_description;
      userName.textContent = post.teacher_name;
    })
    .catch((error) => {
      console.log(error);
    });
}

window.onload = fetchPostDetails();
