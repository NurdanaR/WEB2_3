const API = "/api/blogs";

async function loadBlogs() {
  const res = await fetch(API);
  const blogs = await res.json();

  const list = document.getElementById("blogs");
  list.innerHTML = "";

  blogs.forEach(blog => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${blog.title}</strong> - ${blog.author}
      <button onclick="deleteBlog('${blog._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function createBlog() {
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const author = document.getElementById("author").value;

  if (!title || !body) {
    alert("Title and Body are required!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, author })
  });

  document.getElementById("title").value = "";
  document.getElementById("body").value = "";
  document.getElementById("author").value = "";

  loadBlogs();
}

async function deleteBlog(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadBlogs();
}

loadBlogs();
