$(document).ready(function(){
    // Load JSON data
    $.getJSON('data.json', function(data) {
        // var currentUser = data.currentUser;
    let commentIndex = 0;

        // Render comments
      data.comments.forEach(function(comment) {
        renderCard(comment.user, comment, commentIndex);
        if (comment.replies.length !== 0) {
          $('.container').append('<div class="reply__container"></div>')
          $('.reply__container').append('<div class="vr"></div>')
        }
        comment.replies.forEach(function(reply) {
          renderCard(reply.user, reply, commentIndex, true);
        });
        if (comment.replies.length !== 0) {

          commentIndex++;
        }
      });
    });

    // Function to render card
    function renderCard(user, comment, commentIndex, isReply = false) {
    console.log(commentIndex)
        var html = `
            <div class="card ${isReply ? "card--reply" : ""}">
              <div class="card__top">
                <img class="card__pic" src="${user.image.png}" srcset="${user.image.webp}" alt="${user.username}" />
                <h4 class="card__name">${user.username}</h4>
                <h5 class="card__date">${comment ? comment.createdAt : 'Just now'}</h5>
              </div>
              <p class="card__content">${comment ? comment.content : 'No content'}</p>
              <div class="card__counter">
                <button class="counter__btn"><img src="./images/icon-plus.svg" /></button>
                <span class="counter__like">${comment ? comment.score : 0}</span>
                <button class="counter__btn btn--down"><img src="./images/icon-minus.svg" /></button>
              </div>
              <button class="card__reply">
                <img src="./images/icon-reply.svg" alt="Reply" />
                Reply
              </button>              
            </div>
        `;
        if (isReply) {
            $(`.reply__container:eq(${commentIndex})`).append(html);
        } else {
          $(`.container`).append(html)
        }
       }
  });
