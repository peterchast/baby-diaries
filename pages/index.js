/*
  pages/index.js
*/

import PostList from '../components/PostList';
import TrelloApi from '../lib/TrelloApi';

function Diary({ posts }) {
  return (
    <div>
      <h1>Baby Diary</h1>
      <main>
        <PostList posts={posts} />
      </main>
    </div>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const trelloApi = new TrelloApi(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);
  const posts = await trelloApi.fetchCards(process.env.TRELLO_BOARD_ID);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts
    }
  }
}

export default Diary