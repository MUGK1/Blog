function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    fetch(`/api/post/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Post deleted successfully.");
          window.location.href = "/archive";
        } else {
          alert("Failed to delete the post.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while deleting the post.");
      });
  }
}
