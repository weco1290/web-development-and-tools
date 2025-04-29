import { randomUUID as uuid } from "crypto";
export function makePostList() {
  const id1 = uuid();
  const id2 = uuid();
  const id3 = uuid();
  const id4 = uuid();
  const postList = {};
  const posts = [
    {
      id: id1,
      title: "Summer Berry Spinach Salad",
      content:
        "This refreshing summer salad combines baby spinach with seasonal berries, creamy goat cheese, and candied pecans. The homemade balsamic vinaigrette ties all the flavors together with a perfect balance of sweetness and tang. Ready in just 15 minutes, it's an elegant starter or light lunch option.",
      imageUrl:
        "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creationTime: new Date().toISOString(),
      upvotes: 87,
      comments: [
        "Made this last night and it was incredible!",
        "The sauce is to die for - I doubled it to serve with pasta.",
        "This has become a weekly staple in our house.",
      ],
    },
    {
      id: id2,
      title: "Ultimate Club Sandwich",
      content:
        "This triple-decker club sandwich is stacked with layers of roasted turkey, crispy bacon, fresh tomatoes, lettuce, and avocado. Our special herb mayo adds extra flavor to every bite. Served on toasted sourdough bread, it's perfect for lunch or a satisfying dinner with a side of chips or salad.",
      imageUrl:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FuZHdpY2h8ZW58MHx8MHx8fDI%3D",
      creationTime: new Date(Date.now() - 86400000).toISOString(),
      upvotes: 104,
      comments: [
        "The streusel topping takes this to another level!",
        "I used frozen blueberries and it worked perfectly.",
      ],
    },
    {
      id: id3,
      title: "Hawaiian Ahi Poke Bowl",
      content:
        "This authentic Hawaiian poke bowl features sushi-grade ahi tuna marinated in soy sauce, sesame oil, and green onions. Served over warm rice with avocado, cucumber, mango, and pickled ginger, then topped with a sprinkle of furikake and crispy wonton strips. A refreshing, protein-packed meal that's perfect for hot days.",
      imageUrl:
        "https://images.unsplash.com/photo-1604259597308-5321e8e4789c?q=80&w=3202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creationTime: new Date(Date.now() - 172800000).toISOString(),
      upvotes: 65,
      comments: [
        "The sauce is perfectly balanced!",
        "I made a vegetarian version with tofu - still amazing.",
        "Never thought I could make restaurant-quality bibimbap at home!",
      ],
    },
    {
      id: id4,
      title: "Classic Spaghetti Carbonara",
      content:
        "This authentic Italian carbonara uses just five ingredients: spaghetti, eggs, Pecorino Romano, pancetta, and black pepper. The creamy sauce is created by tossing hot pasta with eggs and cheese - no cream needed! The technique is simple but requires precision for that perfect silky texture. Ready in 20 minutes, it's a weeknight dinner everyone will love.",
      imageUrl:
        "https://images.unsplash.com/photo-1673442635965-34f1b36d8944?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creationTime: new Date(Date.now() - 259200000).toISOString(),
      upvotes: 93,
      comments: [
        "I've made this three times in two weeks!",
        "The dressing is so simple but flavorful.",
      ],
    },
  ];

  postList.getPosts = function getPosts() {
    return posts;
  };

  postList.addPost = function addPost(post) {
    const { title, author, imageUrl, content } = post;
    const newPost = {
      id: uuid(),
      title,
      author,
      imageUrl,
      content,
      creationTime: Date.now(),
      upvotes: 0,
      comments: [],
    };
    posts.push(newPost);
    return newPost;
  };

  postList.updateUpvotes = function updateUpvotes(id) {
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.upvotes += 1;
    }
    return post.id;
  };

  postList.addComments = function addComments(id, comment) {
    const post = posts.find((p) => p.id === id);
    post.comments.push(comment);
  };

  postList.updatePost = function updatePost(id, updatedPost) {
    const index = posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts[index] = {
        ...posts[index],
        ...updatedPost,
      };
      return posts[index];
    }
    return null;
  };

  postList.deletePost = function deletePost(id) {
    const index = posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts.splice(index, 1); // remove 1 item at index
      return true;
    }
    return false;
  };

  return postList;
}
