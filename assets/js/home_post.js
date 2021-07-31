{
  // mrthod to submit the form data for new post using AJAX

  let createpost = () => {
    let newPostform = $("#new-post");
    // console.log(newPostform);
    
    newPostform.submit(function (e) {
      // to prevent the default submit action of form
      e.preventDefault();
      // submit using ajax
      $.ajax({
        type: "POST",
        url: "/users/postcreate",
        data: newPostform.serialize(),
        success: function (data) {
          console.log(data);
          let newpost = createpostdom(data.data.post);
          //  console.log(newpost);
          $("#post-container").prepend(newpost);
          let postshow = $(" .delete-post", newpost)
          // console.log(postshow);
          deletePost(postshow);

          // createcomment(data.data.post.id);

           // call the create comment class
           new PostComments(data.data.post._id);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  // method to create a post in dom
  let createpostdom = (post) => {
    return $(`<div id="post-${post._id}">
        
          ${post.content}
          <small>${post.user.name}</small>
           
              <small><a class="delete-post" href="/users/delete/${post._id}">Delete</a></small>       
            
          
          <form action="/users/commentcreate" id="new-comment" method="POST">
              <textarea name="content" cols="10" rows="1" required></textarea>
              <input type="hidden" name="post" value="${post._id}" />
              <input type="submit" value="comment" />
          </form>
          
          
          <section id="comment-container">
          </section>
          
          
      </div>
      
         `);
  };

  // method to delete a post from DOM
  let deletePost = (deletelink) => {
    // console.log(deletelink);
    $(deletelink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "GET",
        // to get the value of the href in a tag
        url: $(deletelink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          console.log(data);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

   let convertPostsToAjax = () => {
    // refine this code
    $("#post-container").children().children().children('a.delete-post').each(function () {
      let self = $(this);
      let deletebutton = (" .delete-post", self);
      deletePost(deletebutton);

      
            // get the post's id by splitting the id attribute
      let postId = self.prop('id').split("-")[1]
      new PostComments(postId);
    });
  }


  
  createpost();
  convertPostsToAjax();
}

  




  // let createcomment = (postId) => {
  //   let newCommentform = $(`post-${postId}-comments-form`);
  //   newCommentform.submit(function (e) {
  //     console.log(newCommentform);
  //     // to prevent the default submit action of form
  //     e.preventDefault();
  //     // we will submit using ajax
  //     $.ajax({
  //       type: "POST",
  //       url: "/users/commentcreate",
  //       data: newCommentform.serialize(),
  //       success: function (data) {
  //         console.log(data);
  //         let newcomment = createcommentdom(data.data.comment);
  //         $(`#post-comments-${postId}`).append(newcomment);
  //         let commentshow = $(" .delete-comment", newcomment)
  //         deleteComment(commentshow);
  //       },
  //       error: function (error) {
  //         console.log(error.responseText);
  //       },
  //     });
  //   });
  // };

  // let createcommentdom = (comment) => {
  //   return $(`<div class="comment-box" id="comment-${comment._id}">
  //   <div>${comment.content}</div>
  //   <small>${comment.user.name}</small>
  //     <small><a class="delete-comment" href="/users/deletecomment/${comment._id }">Delete comment</a></small>
    
  //   </div>`);
  // };


  // let deleteComment = (deleteclink) => {
  //   $(deleteclink).click(function (e) {
  //     e.preventDefault();
  //     $.ajax({
  //       type: "GET",
  //       // to get the value of the href in a tag
  //       url: $(deleteclink).prop("href"),
  //       success: function (data) {
  //         $(`#comment-${data.data.comment_id}`).remove();
  //         console.log(data);
  //       },
  //       error: function (error) {
  //         console.log(error.responseText);
  //       },
  //     });
  //   });
  // };

   



 